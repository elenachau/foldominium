# ---------------------------------------------------------
# Copyright (c) Microsoft Corporation. All rights reserved.
# ---------------------------------------------------------

"""Contains functionality for referencing single or multiple files in datastores or public URLs.

For more information, see the article [Add & register
datasets](https://docs.microsoft.com/azure/machine-learning/how-to-create-register-datasets).
To get started working with a file dataset, see https://aka.ms/filedataset-samplenotebook.
"""

import os
import sys
import tempfile

from azureml._base_sdk_common._docstring_wrapper import experimental
from azureml._common.exceptions import AzureMLException
from azureml._tracing import get_tracer
from azureml.data._dataprep_helper import dataprep_fuse
from azureml.data._loggerfactory import _LoggerFactory, track, trace_warn, trace, trace_error
from azureml.data.abstract_dataset import AbstractDataset
from azureml.data.constants import _PUBLIC_API
from azureml.data.dataset_error_handling import _try_execute
from azureml.exceptions import UserErrorException

_logger = None
_tracer = None  # type/: Optional[AmlTracer]


def _get_logger():
    global _logger
    if _logger is None:
        _logger = _LoggerFactory.get_logger(__name__)
    return _logger


def _get_tracer():
    global _tracer
    if _tracer is None:
        _tracer = get_tracer(__name__)
    return _tracer


class FileDataset(AbstractDataset):
    """Represents a collection of file references in datastores or public URLs to use in Azure Machine Learning.

    A FileDataset defines a series of lazily-evaluated, immutable operations to load data from the
    data source into file streams. Data is not loaded from the source until FileDataset is asked to deliver data.

    A FileDataset is created using the :func:`azureml.data.dataset_factory.FileDatasetFactory.from_files` method
    of the FileDatasetFactory class.

    For more information, see the article `Add & register
    datasets <https://docs.microsoft.com/azure/machine-learning/how-to-create-register-datasets>`_.
    To get started working with a file dataset, see https://aka.ms/filedataset-samplenotebook.

    .. remarks::

        FileDataset can be used as input of an experiment run. It can also be registered to workspace
        with a specified name and be retrieved by that name later.

        FileDataset can be subsetted by invoking different subsetting methods available on this class.
        The result of subsetting is always a new FileDataset.

        The actual data loading happens when FileDataset is asked to deliver the data into another
        storage mechanism (e.g. files downloaded or mounted to local path).
    """

    def __init__(self):
        """Initialize the FileDataset object.

        This constructor is not supposed to be invoked directly. Dataset is intended to be created using
        :class:`azureml.data.dataset_factory.FileDatasetFactory` class.
        """
        super().__init__()

    @track(_get_logger, custom_dimensions={'app_name': 'FileDataset'}, activity_type=_PUBLIC_API)
    def to_path(self):
        """Get a list of file paths for each file stream defined by the dataset.

        .. remarks::
            The file paths are relative paths for local files when the file streams are downloaded or mounted.

            A common prefix will be removed from the file paths based on how data source was
            specified to create the dataset. For example:

            .. code-block:: python

                datastore = Datastore.get(workspace, 'workspaceblobstore')
                dataset = Dataset.File.from_files((datastore, 'animals/dog/year-*/*.jpg'))
                print(dataset.to_path())

                # ['year-2018/1.jpg'
                #  'year-2018/2.jpg'
                #  'year-2019/1.jpg']

                dataset = Dataset.File.from_files('https://dprepdata.blob.core.windows.net/demo/green-small/*.csv')

                print(dataset.to_path())
                # ['/green_tripdata_2013-08.csv']

        :return: Returns an array of file paths.
        :rtype: builtin.list(str)
        """
        return self._dataflow.to_path(activity='to_path', source='FileDataset')

    @track(_get_logger, custom_dimensions={'app_name': 'FileDataset'}, activity_type=_PUBLIC_API)
    def download(self, target_path=None, overwrite=False, ignore_not_found=False):
        """Download file streams defined by the dataset as local files.

        .. remarks::

            If target_path starts with a /, then it will be treated as an absolute path. If it doesn't start
            with a /, then it will be treated as a relative path relative to the current working directory.

        :param target_path: The local directory to download the files to. If None, the data will be downloaded
            into a temporary directory.
        :type target_path: str
        :param overwrite: Indicates whether to overwrite existing files. The default is False. Existing files will
            be overwritten if overwrite is set to True; otherwise an exception will be raised.
        :type overwrite: bool
        :param ignore_not_found: Indicates whether to fail download if some files pointed to by dataset are not found.
            The default is False. Download will fail if any file download fails for any reason if ignore_not_found is
            set to False; otherwise a waring will be logged for not found errors and dowload will succeed as long as
            no other error types are encountered.
        :type ignore_not_found: bool
        :return: Returns an array of file paths for each file downloaded.
        :rtype: builtin.list(str)
        """
        with _get_tracer().start_as_current_span('download', user_facing_name='Dataset.download') as span:
            target_path, is_empty = _ensure_path(target_path, 'download')
            if self.id:
                span.set_user_facing_attribute('dataset_id', self.id)
            span.set_user_facing_attribute('target_path', target_path)

            download_list = None
            if not is_empty and not overwrite:
                # need to fail if destination is not empty and download would have collisions
                download_list = [
                    os.path.abspath(os.path.join(target_path, '.' + p))
                    for p in self._dataflow.to_path(activity='download.to_path', source='FileDataset')
                ]

                for p in download_list:
                    # encode p to avoid UnicodeEncodeError from os.path.exists
                    if os.path.exists(_encode_if_needed(p)):
                        raise UserErrorException('File "{}" already exists. Set overwrite=True to overwrite it, \
                            or choose an empty target path.'.format(p))

            download_records = _try_execute(
                action=self._dataflow.download,
                operation='download',
                dataset_info=None if self.id is None else {'id': self.id, 'name': self.name, 'version': self.version},
                target_path=target_path,
                source='FileDataset')
            try:
                from azureml.dataprep.api.mltable._validation_and_error_handler import _get_and_validate_download_list
                return _get_and_validate_download_list(download_records,
                                                       download_list,
                                                       target_path,
                                                       ignore_not_found)
            except ImportError:  # TODO (nathof) remove try-except & local version after SunsetClex release
                return _get_and_validate_download_list_local(download_records,
                                                             download_list,
                                                             target_path,
                                                             ignore_not_found)

    @track(_get_logger, custom_dimensions={'app_name': 'FileDataset'}, activity_type=_PUBLIC_API)
    def mount(self, mount_point=None, **kwargs):
        """Create a context manager for mounting file streams defined by the dataset as local files.

        .. remarks::

            A context manager will be returned to manage the lifecycle of the mount. To mount, you will need to
            enter the context manager and to unmount, exit from the context manager.

            Mount is only supported on Unix or Unix-like operating systems with the native package libfuse installed.
            If you are running inside a docker container, the docker container must be started with the `--privileged`
            flag or started with `--cap-add SYS_ADMIN --device /dev/fuse`.

           .. code-block:: python

                datastore = Datastore.get(workspace, 'workspaceblobstore')
                dataset = Dataset.File.from_files((datastore, 'animals/dog/year-*/*.jpg'))

                with dataset.mount() as mount_context:
                    # list top level mounted files and folders in the dataset
                    os.listdir(mount_context.mount_point)

                # You can also use the start and stop methods
                mount_context = dataset.mount()
                mount_context.start()  # this will mount the file streams
                mount_context.stop()  # this will unmount the file streams

           If target_path starts with a /, then it will be treated as an absolute path. If it doesn't start
           with a /, then it will be treated as a relative path relative to the current working directory.

        :param mount_point: The local directory to mount the files to. If None, the data will be mounted into a
            temporary directory, which you can find by calling the `MountContext.mount_point` instance method.
        :type mount_point: str
        :return: Returns a context manager for managing the lifecycle of the mount.
        :rtype: MountContext: the context manager. Upon entering the context manager, the dataflow will be
            mounted to the mount_point. Upon exit, it will remove the mount point and clean up the daemon process
            used to mount the dataflow.
        """
        try:
            dataprep_fuse()
        except OSError as e:
            raise UserErrorException('Mount is only supported on Unix or Unix-like operating systems with the '
                                     'native package libfuse installed. For more information, please refer to the '
                                     'remarks section of FileDataset.mount\'s documentation. Execution failed'
                                     'unexpectedly due to {}'.format(e.__class__.__name__))
        except Exception as e:
            raise AzureMLException(
                "Mount failed unexpectedly due to: {}".format(str(e)))

        mount_point, is_empty = _ensure_path(mount_point, 'mount')
        if os.path.ismount(mount_point):
            raise UserErrorException('"{0}" is already mounted. Run `sudo umount "{0}"` to unmount it.'
                                     .format(mount_point))
        if not is_empty:
            raise UserErrorException('Dataset mount point must be empty, mounting dataset to non-empty folder \
                is not supported.')

        mount_options = kwargs.get('mount_options', None)
        skip_validate = kwargs.get('skip_validate', False)
        if skip_validate:
            message = 'Skip validate is set to True, but is no longer supported and will be ignored.'
            print(message)
            trace_warn(_get_logger(), message)
        client_id = kwargs.get('client_id', None)
        identity_endpoint_type = kwargs.get('identity_endpoint_type', None)

        trace(_logger, 'engineless dataflow mount start!')
        try:
            mount_context = self._dataflow.mount(mount_point, mount_options, None, client_id, identity_endpoint_type)
            trace(_logger, 'engineless dataflow mount success!')
            return mount_context
        except BaseException as e:
            message = str(e)
            trace_error(_logger, message)
            if any(errorName in message for errorName in ["InvalidURIScheme",
                                                          "StreamError(NotFound)",
                                                          "DataAccessError(NotFound)",
                                                          "DataAccessError(PermissionDenied)"]):
                raise UserErrorException(message)
            raise AzureMLException(message)

    def as_mount(self, path_on_compute=None):
        """Create a DatasetConsumptionConfig with the mode set to mount.

        In the submitted run, files in the datasets will be mounted to local path on the compute target.
        The mount point can be retrieved from argument values and the input_datasets field of the run context.
        We will automatically generate an input name. If you would like specify a custom input name, please call
        the as_named_input method.

        .. code-block:: python

            # Given a run submitted with dataset input like this:
            dataset_input = dataset.as_mount()
            experiment.submit(ScriptRunConfig(source_directory, arguments=[dataset_input]))


            # Following are sample codes running in context of the submitted run:

            # The mount point can be retrieved from argument values
            import sys
            mount_point = sys.argv[1]

            # The mount point can also be retrieved from input_datasets of the run context.
            from azureml.core import Run
            mount_point = Run.get_context().input_datasets['input_1']

        .. remarks::

            When the dataset is created from path of a single file, the mount point will be path of the single mounted
            file. Otherwise, the mount point will be path of the enclosing folder for all the mounted files.

            If path_on_compute starts with a /, then it will be treated as an absolute path. If it doesn't start
            with a /, then it will be treated as a relative path relative to the working directory. If you have
            specified an absolute path, please make sure that the job has permission to write to that directory.

        :param path_on_compute: The target path on the compute to make the data available at.
        :type path_on_compute: str
        """
        return (self
                .as_named_input(name=None)
                .as_mount(path_on_compute=path_on_compute))

    def as_download(self, path_on_compute=None):
        """Create a DatasetConsumptionConfig with the mode set to download.

        In the submitted run, files in the dataset will be downloaded to local path on the compute target.
        The download location can be retrieved from argument values and the input_datasets field of the run context.
        We will automatically generate an input name. If you would like specify a custom input name, please call
        the as_named_input method.

        .. code-block:: python

            # Given a run submitted with dataset input like this:
            dataset_input = dataset.as_download()
            experiment.submit(ScriptRunConfig(source_directory, arguments=[dataset_input]))


            # Following are sample codes running in context of the submitted run:

            # The download location can be retrieved from argument values
            import sys
            download_location = sys.argv[1]

            # The download location can also be retrieved from input_datasets of the run context.
            from azureml.core import Run
            download_location = Run.get_context().input_datasets['input_1']

        .. remarks::

            When the dataset is created from path of a single file, the download location will be path of the single
            downloaded file. Otherwise, the download location will be path of the enclosing folder for all the
            downloaded files.

            If path_on_compute starts with a /, then it will be treated as an absolute path. If it doesn't start
            with a /, then it will be treated as a relative path relative to the working directory. If you have
            specified an absolute path, please make sure that the job has permission to write to that directory.

        :param path_on_compute: The target path on the compute to make the data available at.
        :type path_on_compute: str
        """
        return (self
                .as_named_input(name=None)
                .as_download(path_on_compute=path_on_compute))

    def as_hdfs(self):
        """Set the mode to hdfs.

        In the submitted synapse run, files in the datasets will be converted to local path on the compute target.
        The hdfs path can be retrieved from argument values and the os environment variables.

        .. code-block:: python

            # Given a run submitted with dataset input like this:
            dataset_input = dataset.as_hdfs()
            experiment.submit(ScriptRunConfig(source_directory, arguments=[dataset_input]))


            # Following are sample codes running in context of the submitted run:

            # The hdfs path can be retrieved from argument values
            import sys
            hdfs_path = sys.argv[1]

            # The hdfs path can also be retrieved from input_datasets of the run context.
            import os
            hdfs_path = os.environ['input_<hash>']

        .. remarks::

            When the dataset is created from path of a single file, the hdfs path will be path of the single
            file. Otherwise, the hdfs path will be path of the enclosing folder for all the mounted files.

        """
        return (self
                .as_named_input(name=None)
                .as_hdfs())

    @track(_get_logger, custom_dimensions={'app_name': 'FileDataset'}, activity_type=_PUBLIC_API)
    def skip(self, count):
        """Skip file streams from the top of the dataset by the specified count.

        :param count: The number of file streams to skip.
        :type count: int
        :return: Returns a new FileDataset object representing a dataset with file streams skipped.
        :rtype: azureml.data.FileDataset
        """
        return FileDataset._create(self._dataflow.skip(count), self._properties, telemetry_info=self._telemetry_info)

    @track(_get_logger, custom_dimensions={'app_name': 'FileDataset'}, activity_type=_PUBLIC_API)
    def take(self, count):
        """Take a sample of file streams from top of the dataset by the specified count.

        :param count: The number of file streams to take.
        :type count: int
        :return: Returns a new FileDataset object representing the sampled dataset.
        :rtype: azureml.data.FileDataset
        """
        return FileDataset._create(self._dataflow.take(count), self._properties, telemetry_info=self._telemetry_info)

    @track(_get_logger, custom_dimensions={'app_name': 'FileDataset'}, activity_type=_PUBLIC_API)
    def take_sample(self, probability, seed=None):
        """Take a random sample of file streams in the dataset approximately by the probability specified.

        :param probability: The probability of a file stream being included in the sample.
        :type probability: float
        :param seed: An optional seed to use for the random generator.
        :type seed: int
        :return: Returns a new FileDataset object representing the sampled dataset.
        :rtype: azureml.data.FileDataset
        """
        return FileDataset._create(
            self._dataflow.take_sample(probability, seed), self._properties, telemetry_info=self._telemetry_info)

    @track(_get_logger, custom_dimensions={'app_name': 'FileDataset'}, activity_type=_PUBLIC_API)
    def random_split(self, percentage, seed=None):
        """Split file streams in the dataset into two parts randomly and approximately by the percentage specified.

        The first dataset returned contains approximately ``percentage`` of the total number of file references
        and the second dataset contains the remaining file references.

        :param percentage: The approximate percentage to split the dataset by. This must be a number between 0.0
            and 1.0.
        :type percentage: float
        :param seed: An optional seed to use for the random generator.
        :type seed: int
        :return: Returns a tuple of new FileDataset objects representing the two datasets after the split.
        :rtype: (azureml.data.FileDataset, azureml.data.FileDataset)
        """
        dataflow1, dataflow2 = self._dataflow.random_split(percentage, seed)
        return (
            FileDataset._create(dataflow1, self._properties, telemetry_info=self._telemetry_info),
            FileDataset._create(dataflow2, self._properties, telemetry_info=self._telemetry_info)
        )

    @experimental
    @track(_get_logger, custom_dimensions={'app_name': 'FileDataset'}, activity_type=_PUBLIC_API)
    def file_metadata(self, col):
        """Get file metadata expression by specifying the metadata column name.

        Supported file metadata columns are Size, LastModifiedTime, CreationTime, Extension and CanSeek

        :param col: Name of column
        :type col: str
        :return: Returns an expression that retrieves the value in the specified column.
        :rtype: azureml.dataprep.api.expression.RecordFieldExpression
        """
        from azureml.dataprep.api.functions import get_stream_properties
        return get_stream_properties(self._dataflow['Path'])[col]

    @experimental
    @track(_get_logger, custom_dimensions={'app_name': 'FileDataset'}, activity_type=_PUBLIC_API)
    def filter(self, expression):
        """
        Filter the data, leaving only the records that match the specified expression.

        .. remarks::

            Expressions are started by indexing the Dataset with the name of a column. They support a variety of
                functions and operators and can be combined using logical operators. The resulting expression will be
                lazily evaluated for each record when a data pull occurs and not where it is defined.

            .. code-block:: python

                (dataset.file_metadata('Size') > 10000) & (dataset.file_metadata('CanSeek') == True)
                dataset.file_metadata('Extension').starts_with('j')

        :param expression: The expression to evaluate.
        :type expression: azureml.dataprep.api.expression.Expression
        :return: The modified dataset (unregistered).
        :rtype: azureml.data.FileDataset
        """
        dataflow = self._dataflow
        dataflow = dataflow.filter(expression)
        return FileDataset._create(dataflow, self._properties, telemetry_info=self._telemetry_info)

    @experimental
    @track(_get_logger, custom_dimensions={'app_name': 'FileDataset'}, activity_type=_PUBLIC_API)
    def as_cache(self, datacache_store):
        """
        Create a DatacacheConsumptionConfig mapped to a datacache_store and a dataset.

        :param datacache_store: The datacachestore to be used to hydrate.
        :type datacache_store: azureml.data.datacache.DatacacheStore
        :return: The configuration object describing how the datacache should be materialized in the run.
        :rtype: azureml.data.datacache_consumption_config.DatacacheConsumptionConfig
        """
        from azureml.data.datacache import _Datacache
        from azureml.data.datacache_consumption_config import DatacacheConsumptionConfig

        dc = _Datacache.create(datacache_store.workspace,
                               datacache_store, self)
        return DatacacheConsumptionConfig(datacache_store=dc.datacache_store,
                                          dataset=dc.dataset,
                                          _datacache_id=dc._id)

    @experimental
    @track(_get_logger, custom_dimensions={'app_name': 'FileDataset'}, activity_type=_PUBLIC_API)
    def hydrate(self, datacache_store, replica_count=None):
        """
        Hydrate the dataset into the requested replicas specified in datacache_store.

        :param datacache_store: The datacachestore to be used to hydrate.
        :type datacache_store: azureml.data.datacache.DatacacheStore
        :param replica_count: Number of replicas to hydrate.
        :type replica_count: Int, optional
        :return: The configuration object describing how the datacache should be materialized in the run.
        :rtype: azureml.data.datacache.DatacacheHydrationTracker
        """
        from azureml.data.datacache import _Datacache
        dc = _Datacache.create(datacache_store.workspace,
                               datacache_store, self)
        return dc.hydrate(replica_count)


def _ensure_path(path, operation_name):
    if not path or path.isspace():
        return (tempfile.mkdtemp(), True)

    if not os.path.exists(path):
        try:
            os.makedirs(path, exist_ok=True)
            return (os.path.abspath(path), True)
        except Exception as e:
            # There is a chance that the directory may be created after we check for existence and
            # before we create it. In this case, we can no-op as though the directory already existed.
            message = f'Failed to ensure {operation_name} path "{path}" due to exception of type {type(e).__name__} \
                        with message {e}, proceeding with {operation_name} attempt.'
            trace_warn(_get_logger(), message)
            print(message)
            pass

    is_empty = True
    for _, dirnames, files in os.walk(path):
        if files or dirnames:
            is_empty = False
            break
    return (os.path.abspath(path), is_empty)


def _encode_if_needed(path):
    sys_encoding = sys.getfilesystemencoding() or sys.getdefaultencoding()
    try:
        path.encode(sys_encoding)
        return path  # no need to encode
    except (UnicodeError, LookupError):
        # Encode the path string when it contains characters which cannot be encoded by sys encoding.
        # Otherwise, usage of the path string (e.g. `os.path.exists(p)`) can encounter UnicodeEncodeError.
        return path.encode('utf8')


def _get_and_validate_download_list_local(download_records, download_list, target_path, ignore_not_found):
    if len(download_records) == 0:
        return []
    # handle CLEX
    from azureml.dataprep.native import StreamInfo as NativeStreamInfo, DataPrepError as NativeDataprepError
    if 'Portable Path' in download_records[0]:
        if download_list:
            # CLEX returns the source list, so no new information here, just return back dowload list we got
            return download_list
        else:
            # we don't have dowload list so need to generate it based on portable path and target path.
            # capture DataPrepError
            error_list = []
            for record in download_records:
                value = record['Portable Path']
                if isinstance(value, NativeDataprepError):
                    resource_identifier = value.originalValue
                    # this is for backward compatibility as error used to have StreamInfo as original value previously
                    if isinstance(value.originalValue, NativeStreamInfo):
                        resource_identifier = value.originalValue.resource_identifier

                    error_list.append((resource_identifier, value.errorCode))

            if error_list:
                message = 'Some files have failed to download:' + '\n'.join(
                    [str((file_name, error_code)) for (file_name, error_code) in error_list])
                for (_, error) in error_list:
                    trace_error(
                        _logger, "System error happens during downloading: {}".format(error))
                raise AzureMLException(message)

            return [os.path.abspath(os.path.join(target_path, '.' + p['Portable Path']))
                    for p in download_records]
    elif 'DestinationFile' in download_records[0]:
        downloaded_files = []
        errors = []
        # this means RsLEX download, so we actually get more info here, like errors and actual download paths.
        for record in download_records:
            # rslex execution result
            value = record['DestinationFile']

            if isinstance(value, NativeStreamInfo):
                downloaded_files.append(value.resource_identifier)
            elif isinstance(value, NativeDataprepError):
                resource_identifier = value.originalValue
                if ignore_not_found and value.errorCode == "Microsoft.DPrep.ErrorValues.SourceFileNotFound":
                    _log_and_print_warning("'{}' hasn't been downloaded as it was not present at the source. \
                        Download is proceeding.".format(resource_identifier))
                else :
                    errors.append((resource_identifier, value.errorCode))
            else:
                raise AzureMLException(f'Unexpected error during file download: {value}')

        if errors:
            from .dataset_error_handling import _download_error_handler
            # this will throw UserErrorException or AzureMLException based on set of errors encountered
            _download_error_handler(errors, _get_logger())
        return downloaded_files


def _log_and_print_warning(message):
    from datetime import datetime
    now = datetime.utcnow().isoformat(timespec='milliseconds')
    trace_warn(_logger, message)
    print(f"[{now}] {message}")
