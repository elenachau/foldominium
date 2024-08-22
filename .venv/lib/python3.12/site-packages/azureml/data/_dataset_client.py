# ---------------------------------------------------------
# Copyright (c) Microsoft Corporation. All rights reserved.
# ---------------------------------------------------------
"""A module that provides methods to communicate with the Dataset service."""

import logging.handlers
import os

from msrest.authentication import BasicTokenAuthentication
from azureml._base_sdk_common.service_discovery import get_service_url
from azureml.core.datastore import Datastore
from azureml._restclient.artifacts_client import ArtifactsClient
from azureml.data.context_managers import _upload_to_datastore
from azureml._restclient.rest_client import RestClient
from azureml._restclient.models.action_result_update_dto import ActionResultUpdateDto
from azureml._base_sdk_common import _ClientSessionId
from azureml.data.dataset_type_definitions import HistogramCompareMethod
from azureml.data._loggerfactory import _LoggerFactory, track, _log_not_supported_api_usage_and_raise


logger = None


def get_logger():
    global logger
    if logger is not None:
        return logger

    logger = _LoggerFactory.get_logger("Dataset")
    return logger


module_logger = logging.getLogger(__name__)


class _DatasetClient:
    """A client that provides methods to communicate with the Dataset service."""

    # the auth token received from _auth.get_authentication_header is prefixed
    # with 'Bearer '. This is used to remove that prefix.
    _bearer_prefix_len = 7
    _default_dataset_id = '00000000-0000-0000-0000-000000000000'

    # the unique id of each python kernel process on client side to
    # correlate events within each process.
    _custom_headers = {"x-ms-client-session-id": _ClientSessionId}

    _in_memory_file_type = 'In-Memory'

    @staticmethod
    def get(workspace, dataset_name=None, dataset_id=None):
        _log_not_supported_api_usage_and_raise(module_logger, '_DatasetClient.get', 'deprecated')

    @staticmethod
    def get_definitions(workspace, dataset_id, dataset=None):
        _log_not_supported_api_usage_and_raise(module_logger, '_DatasetClient.get_definitions', 'deprecated')

    @staticmethod
    def get_definition(workspace, dataset_id, version_id, action_arguments=None, dataset=None):
        _log_not_supported_api_usage_and_raise(module_logger, '_DatasetClient.get_definition', 'deprecated')

    @staticmethod
    def get_dataset_definition(dataset, version_id):
        _log_not_supported_api_usage_and_raise(module_logger, '_DatasetClient.get_dataset_definition', 'deprecated')

    @staticmethod
    def get_dataset_definitions(dataset):
        _log_not_supported_api_usage_and_raise(module_logger, '_DatasetClient.get_dataset_definitions', 'deprecated')

    @staticmethod
    def _get_definition_json(ws, name, version=None, auth=None, host=None):
        _log_not_supported_api_usage_and_raise(module_logger, '_DatasetClient._get_definition_json', 'deprecated')

    @staticmethod
    def register(workspace, dataset_name, definition, description, tags, visible, exist_ok, update_if_exists):
        _log_not_supported_api_usage_and_raise(module_logger, '_DatasetClient.register', 'deprecated')

    @staticmethod
    def _validate_name_contain_special_charactor(name):
        _log_not_supported_api_usage_and_raise(module_logger,
                                               '_DatasetClient._validate_name_contain_special_charactor',
                                               'deprecated')

    @staticmethod
    def _register_from_request(workspace,
                               dataset_request_dto,
                               as_pending=False,
                               exist_ok=True,
                               update_if_exists=False,
                               skip_validation=False):
        _log_not_supported_api_usage_and_raise(module_logger, '_DatasetClient._register_from_request', 'deprecated')

    @staticmethod
    def update(workspace, dataset_id, dataset_name, description, tags, visible):
        _log_not_supported_api_usage_and_raise(module_logger, '_DatasetClient.update', 'deprecated')

    @staticmethod
    def update_definition(dataset, new_definition, definition_update_message):
        _log_not_supported_api_usage_and_raise(module_logger, '_DatasetClient.update_definition', 'deprecated')

    @staticmethod
    def update_registered_dataset_definition(dataset, updated_definition, definition_update_message):
        _log_not_supported_api_usage_and_raise(module_logger, '_DatasetClient.update_registered_dataset_definition',
                                               'deprecated')

    @staticmethod
    def update_path(dataset, path, update_message=None):
        _log_not_supported_api_usage_and_raise(module_logger, '_DatasetClient.update_path', 'deprecated')

    @staticmethod
    def create_snapshot(dataset_definition, snapshot_name, compute_target=None,
                        create_data_snapshot=False, target_datastore=None):
        _log_not_supported_api_usage_and_raise(module_logger, '_DatasetClient.create_snapshot', 'deprecated')

    @staticmethod
    def get_snapshot(workspace, snapshot_name, dataset_id=None, dataset_name=None):
        _log_not_supported_api_usage_and_raise(module_logger, '_DatasetClient.get_snapshot', 'deprecated')

    @staticmethod
    def delete_snapshot(workspace, snapshot_name, dataset_id=None, dataset_name=None):
        _log_not_supported_api_usage_and_raise(module_logger, '_DatasetClient.delete_snapshot', 'deprecated')

    @staticmethod
    def get_all_snapshots(workspace, dataset_id=None, dataset_name=None):
        _log_not_supported_api_usage_and_raise(module_logger, '_DatasetClient.get_all_snapshots', 'deprecated')

    @staticmethod
    def generate_profile(dataset, compute_target, workspace, arguments=None, wait_for_completion=False,
                         show_output=True, status_update_frequency=15, datastore_name=None):
        _log_not_supported_api_usage_and_raise(module_logger, '_DatasetClient.generate_profile', 'deprecated')

    @staticmethod
    def get_profile(workspace, dataset_id, arguments=None, version_id=None, snapshot_name=None, action_id=None):
        _log_not_supported_api_usage_and_raise(module_logger, '_DatasetClient.get_profile', 'deprecated')

    @staticmethod
    def get_profile_with_state(dataset, arguments, generate_if_not_exist=True,
                               workspace=None, compute_target=None, datastore_name=None):
        _log_not_supported_api_usage_and_raise(module_logger, '_DatasetClient.get_profile_with_state', 'deprecated')

    @staticmethod
    def list(workspace, include_invisible=True):
        _log_not_supported_api_usage_and_raise(module_logger, '_DatasetClient.list', 'deprecated')

    @staticmethod
    def deprecate(workspace, dataset_id, etag, deprecate_by_dataset_id):
        _log_not_supported_api_usage_and_raise(module_logger, '_DatasetClient.deprecate', 'deprecated')

    @staticmethod
    def archive(workspace, dataset_id, etag):
        _log_not_supported_api_usage_and_raise(module_logger, '_DatasetClient.archive', 'deprecated')

    @staticmethod
    def reactivate(workspace, dataset_id, etag):
        _log_not_supported_api_usage_and_raise(module_logger, '_DatasetClient.reactivate', 'deprecated')

    @staticmethod
    def _get_source_path(data_flow):
        "Returns a DataPath or str"
        _log_not_supported_api_usage_and_raise(module_logger, '_DatasetClient._get_source_path', 'deprecated')

    @staticmethod
    def _get_source_file_type(data_flow):
        _log_not_supported_api_usage_and_raise(module_logger, '_DatasetClient._get_source_file_type', 'deprecated')

    @staticmethod
    def from_pandas_dataframe(
            dataframe,
            path=None,
            in_memory=False):
        _log_not_supported_api_usage_and_raise(module_logger, '_DatasetClient.from_pandas_dataframe', 'deprecated')

    @staticmethod
    def _create_local_file_from_pandas_dataframe(local_folder_path, dataframe):
        _log_not_supported_api_usage_and_raise(module_logger,
                                               '_DatasetClient._create_local_file_from_pandas_dataframe',
                                               'deprecated')

    @staticmethod
    def from_delimited_files(
            path,
            separator,
            header,
            encoding,
            quoting,
            infer_column_types,
            skip_rows,
            skip_mode,
            comment,
            include_path,
            archive_options,
            partition_format,
            empty_as_string=False):
        _log_not_supported_api_usage_and_raise(module_logger, '_DatasetClient.from_delimited_files', 'deprecated')

    @staticmethod
    def auto_read_files(path, include_path, partition_format):
        _log_not_supported_api_usage_and_raise(module_logger, '_DatasetClient.auto_read_files', 'deprecated')

    @staticmethod
    def from_parquet_files(path, include_path, partition_format):
        _log_not_supported_api_usage_and_raise(module_logger, '_DatasetClient.from_parquet_files', 'deprecated')

    @staticmethod
    def from_parquet_datasets(path, include_path, partition_format):
        _log_not_supported_api_usage_and_raise(module_logger, '_DatasetClient.from_parquet_datasets', 'deprecated')

    @staticmethod
    def from_excel_files(
        path,
        sheet_name,
        use_column_headers,
        skip_rows,
        include_path,
        infer_column_types,
        partition_format
    ):
        _log_not_supported_api_usage_and_raise(module_logger, '_DatasetClient.from_excel_files', 'deprecated')

    @staticmethod
    def from_binary_files(path):
        _log_not_supported_api_usage_and_raise(module_logger, '_DatasetClient.from_binary_files', 'deprecated')

    @staticmethod
    def from_sql_query(data_source, query, query_timeout=None):
        _log_not_supported_api_usage_and_raise(module_logger, '_DatasetClient.from_sql_query', 'deprecated')

    @staticmethod
    def from_json_files(path, encoding, flatten_nested_arrays, include_path, partition_format):
        _log_not_supported_api_usage_and_raise(module_logger, '_DatasetClient.from_json_files', 'deprecated')

    @staticmethod
    @track(get_logger)
    def to_pandas_dataframe(definition):
        _log_not_supported_api_usage_and_raise(module_logger, '_DatasetClient.to_pandas_dataframe', 'deprecated')

    @staticmethod
    def head(definition, count=5):
        _log_not_supported_api_usage_and_raise(module_logger, '_DatasetClient.head', 'deprecated')

    @staticmethod
    @track(get_logger)
    def to_spark_dataframe(definition):
        _log_not_supported_api_usage_and_raise(module_logger, '_DatasetClient.to_spark_dataframe', 'deprecated')

    @staticmethod
    def sample(dataset, sample_strategy, arguments, file_type):
        _log_not_supported_api_usage_and_raise(module_logger, '_DatasetClient.sample', 'deprecated')

    @staticmethod
    def filter(dataset, expression, file_type):
        _log_not_supported_api_usage_and_raise(module_logger, '_DatasetClient.filter', 'deprecated')

    @staticmethod
    def get_datapath(workspace, dataset_id, definition_version):
        _log_not_supported_api_usage_and_raise(module_logger, '_DatasetClient.get_datapath', 'deprecated')

    @staticmethod
    def _get(ws, name=None, id=None, throw_error=True):
        _log_not_supported_api_usage_and_raise(module_logger, '_DatasetClient._get', 'deprecated')

    @staticmethod
    def _list(workspace, continuation_token, page_size, include_invisible):
        _log_not_supported_api_usage_and_raise(module_logger, '_DatasetClient._list', 'deprecated')

    @staticmethod
    def _get_dataset_from_dataflow(
            dataflow,
            file_data_path=None,
            sql_data_path=None,
            sql_data_store=None,
            file_type="Unknown",
            partition_format=None):
        _log_not_supported_api_usage_and_raise(module_logger, '_DatasetClient._get_dataset_from_dataflow',
                                               'deprecated')

    @staticmethod
    def _get_data_path(file_data_path=None, sql_data_path=None, sql_data_store=None):
        _log_not_supported_api_usage_and_raise(module_logger, '_DatasetClient._get_data_path', 'deprecated')

    @staticmethod
    def _get_new_definition(dataset, data_path):
        _log_not_supported_api_usage_and_raise(module_logger, '_DatasetClient._get_new_definition', 'deprecated')

    @staticmethod
    def _dto_to_dataset(workspace, dataset_dto):
        _log_not_supported_api_usage_and_raise(module_logger, '_DatasetClient._dto_to_dataset', 'deprecated')

    @staticmethod
    def _dto_to_dataset_definition(workspace, def_dto, dataset=None):
        _log_not_supported_api_usage_and_raise(module_logger, '_DatasetClient._dto_to_dataset_definition',
                                               'deprecated')

    @staticmethod
    def _archive_definition(definition):
        _log_not_supported_api_usage_and_raise(module_logger, '_DatasetClient._archive_definition', 'deprecated')

    @staticmethod
    def _deprecate_definition(definition, deprecate_by_dataset_id, deprecated_by_definition_version=None):
        _log_not_supported_api_usage_and_raise(module_logger, '_DatasetClient._deprecate_definition', 'deprecated')

    @staticmethod
    def _reactivate_definition(definition):
        _log_not_supported_api_usage_and_raise(module_logger, '_DatasetClient._reactivate_definition', 'deprecated')

    @staticmethod
    def _add_cache_step(definition, snapshot_name=None, target_datastore=None, snapshot_path=None):
        _log_not_supported_api_usage_and_raise(module_logger, '_DatasetClient._add_cache_step', 'deprecated')

    @staticmethod
    # TODO: Remove this method once Web API is ready for data snapshots
    def _get_snapshot_path(dataset_id, snapshot_name):
        _log_not_supported_api_usage_and_raise(module_logger, '_DatasetClient._get_snapshot_path', 'deprecated')

    @staticmethod
    def _get_all_snapshots(workspace, dataset_id=None, dataset_name=None, continuation_token=None, page_size=None):
        _log_not_supported_api_usage_and_raise(module_logger, '_DatasetClient._get_all_snapshots', 'deprecated')

    @staticmethod
    def _dto_to_dataset_snapshot(workspace, snapshot_dto):
        _log_not_supported_api_usage_and_raise(module_logger, '_DatasetClient._dto_to_dataset_snapshot', 'deprecated')

    @staticmethod
    def _execute_local_profile(dataflow, arguments):
        module_logger.info(f"Executing local profile with arguments: {arguments}")
        return dataflow._get_profile()

    @staticmethod
    def _submit_action(
        compute_target_name,
        workspace,
        dataset_id,
        version_id,
        action_type,
        arguments,
        dataflow_json=None,
        dataset_snapshot_name=None,
        pip_arguments=None,
        datastore_name=None
    ):
        _log_not_supported_api_usage_and_raise(module_logger, '_DatasetClient._submit_action', 'deprecated')

    @staticmethod
    def _upload_profile_to_datastore(
        workspace,
        dataset_id,
        action_id,
        action_type,
        data,
        datastore
    ):
        outfile = 'actions/{}/{}_result.json'.format(action_id, action_type)
        relative_root = 'Saveddataset/{}'.format(dataset_id)
        artifact_id = '{}/{}'.format(relative_root, outfile)

        os.makedirs(os.path.dirname(outfile), exist_ok=True)
        with open(outfile, 'w') as result_artifact:
            if(isinstance(data, str)):
                result_artifact.write(data)
            else:
                result_artifact.write(data._to_json())
        try:
            destination_uri = \
                "azureml://subscriptions/{}/resourcegroups/{}/workspaces/{}/datastores/{}/paths/{}".format(
                    datastore.workspace.subscription_id,
                    datastore.workspace.resource_group,
                    datastore.workspace.name,
                    datastore.name,
                    relative_root.lstrip("/"))
            _upload_to_datastore(outfile, destination_uri, None, overwrite=True, is_volume=False)

        except Exception as e:
            module_logger.error("Failed to upload {} result. Exception: {}".format(action_type, e))
            raise e
        finally:
            if os.path.isfile(outfile):
                os.remove(outfile)

        return [artifact_id]

    @staticmethod
    def _write_to_artifact_store(
        workspace,
        dataset_id,
        action_id,
        action_type,
        data
    ):
        outfile = 'actions/{}/{}_result.json'.format(action_id, action_type)
        os.makedirs(os.path.dirname(outfile))
        artifact_id = 'Dataset/{}/{}'.format(dataset_id, outfile)
        with open(outfile, 'w') as result_artifact:
            if(isinstance(data, str)):
                result_artifact.write(data)
            else:
                result_artifact.write(data._to_json())
        artifacts_client = ArtifactsClient(workspace.service_context)
        artifacts_client.upload_files(
            paths=[outfile], origin='Dataset', container=dataset_id)
        os.remove(outfile)

        return [artifact_id]

    @staticmethod
    def _get_compute_target_name(compute_target):
        _log_not_supported_api_usage_and_raise(module_logger, '_DatasetClient._get_compute_target_name', 'deprecated')

    @staticmethod
    def _get_profile(
            workspace,
            dataset_id,
            arguments=None,
            version_id=None,
            snapshot_name=None,
            action_id=None,
            datastore_name=None):
        _log_not_supported_api_usage_and_raise(module_logger, '_DatasetClient._get_profile', 'deprecated')

    @staticmethod
    def _get_diff_result(
            workspace,
            action_id,
            dataset_id,
            action_request_dto,
    ):
        _log_not_supported_api_usage_and_raise(module_logger, '_DatasetClient._get_diff_result', 'deprecated')

    @staticmethod
    def _get_profile_diff_result(
        workspace,
        action_id,
        dataset_id,
        action_request_dto,
    ):
        _log_not_supported_api_usage_and_raise(module_logger, '_DatasetClient._get_profile_diff_result', 'deprecated')

    @staticmethod
    def _get_action_result(workspace, dataset_id, action_id=None, action_type='profile',
                           arguments=None, version_id=None, snapshot_name=None, dataflow=None,
                           datastore_name=None):
        _log_not_supported_api_usage_and_raise(module_logger, '_DatasetClient._get_action_result', 'deprecated')

    @staticmethod
    def _is_result_available(action_result_dto):
        _log_not_supported_api_usage_and_raise(module_logger, '_DatasetClient._is_result_available', 'deprecated')

    @staticmethod
    def _wait_for_completion(workspace, dataset_id, action_id, show_output=True, status_update_frequency=5):
        _log_not_supported_api_usage_and_raise(module_logger, '_DatasetClient._wait_for_completion', 'deprecated')

    @staticmethod
    def _get_snapshot_status(workspace, dataset_id, profile_action_id):
        _log_not_supported_api_usage_and_raise(module_logger, '_DatasetClient._get_snapshot_status', 'deprecated')

    @staticmethod
    def _get_dataflow(workspace, datastore_name, relative_path):
        _log_not_supported_api_usage_and_raise(module_logger, '_DatasetClient._get_dataflow', 'deprecated')

    @staticmethod
    def _get_action_by_id(workspace, dataset_id, action_id):
        client = _DatasetClient._get_client(workspace)
        return client.dataset.get_action_by_id(
            subscription_id=workspace.subscription_id,
            resource_group_name=workspace.resource_group,
            workspace_name=workspace.name,
            dataset_id=dataset_id,
            action_id=action_id,
            custom_headers=_DatasetClient._custom_headers)

    @staticmethod
    def _update_action_result(workspace, dataset_id, action_id, result_artifact_ids, target_data_hash):
        client = _DatasetClient._get_client(workspace)
        result_update_dto = ActionResultUpdateDto(
            result_artifact_ids=result_artifact_ids,
            target_data_hash=target_data_hash)
        client.dataset.update_action_result(
            subscription_id=workspace.subscription_id,
            resource_group_name=workspace.resource_group,
            workspace_name=workspace.name,
            dataset_id=dataset_id,
            action_id=action_id,
            result_update_dto=result_update_dto,
            custom_headers=_DatasetClient._custom_headers)

    @staticmethod
    def compare_datasets(lhs_dataset,
                         rhs_dataset,
                         compute_target,
                         columns):

        """ Compare datasets lhs_dataset with rhs_dataset, including left to right and right to left

        :param lhs_dataset: left side dataset
        :type lhs_dataset: azureml.core.dataset.Dataset
        :param rhs_dataset: right side dataset
        :type rhs_dataset: azureml.core.dataset.Dataset
        :param compute_target: compute target to run dataset comparison
        :type compute_target: azureml.core.compute.ComputeTarget or str, optional
        :param columns: list of columns to be included
        :type columns: List[str]
        :return: DatasetActionRun

        """
        _log_not_supported_api_usage_and_raise(module_logger, '_DatasetClient.compare_datasets', 'deprecated')

    @staticmethod
    def compare_dataset_profiles(
        lhs_dataset,
        rhs_dataset,
        profile_arguments=dict(),
        compute_target=None,
        include_columns=None,
        exclude_columns=None,
        histogram_compare_method=HistogramCompareMethod.WASSERSTEIN
    ):
        """
        Compare the Profiles of the given two datasets.

        :param lhs_dataset: LHS dataset.
        :type lhs_dataset: Dataset
        :param rhs_dataset: RHS dataset
        :type rhs_dataset: Dataset
        :param compute_target: compute target to perform the profile diff, optional.
        :type compute_target: azureml.core.compute.ComputeTarget or str
        :param include_columns: List of column names to be included in comparison.
        :type include_columns: List[str]
        :param exclude_columns: List of column names to be excluded in comparison.
        :type exclude_columns: List[str]
        :param histogram_compare_method: Enum describing the method, ex: Wasserstein or Energy
        :type histogram_compare_method: azureml.dataprep.api.typedefinitions.HistogramCompareMethod
        :return: Difference of the profiles.
        :rtype: azureml.dataprep.api.engineapi.typedefinitions.DataProfileDifference
        """
        _log_not_supported_api_usage_and_raise(module_logger, '_DatasetClient.compare_dataset_profiles', 'deprecated')

    @staticmethod
    def compare_dataset_snapshot_profiles(
        lhs_dataset_snapshot,
        rhs_dataset_snapshot,
        dataset_snapshot_name,
        compute_target=None,
        include_columns=None,
        exclude_columns=None,
        histogram_compare_method=HistogramCompareMethod.WASSERSTEIN
    ):
        """
        Compare the Profiles of the given two datasets.

        :param lhs_dataset_snapshot: LHS dataset snapshot.
        :type lhs_dataset_snapshot: Datasetsnapshot
        :param rhs_dataset_snapshot: RHS dataset snapshot
        :type rhs_dataset_snapshot: Datasetsnapshot
        :param compute_target: compute target to perform the profile diff, optional.
        :type compute_target: azureml.core.compute.ComputeTarget or str
        :param include_columns: List of column names to be included in comparison.
        :type include_columns: List[str]
        :param exclude_columns: List of column names to be excluded in comparison.
        :type exclude_columns: List[str]
        :param histogram_compare_method: Enum describing the method, ex: Wasserstein or Energy
        :type histogram_compare_method: azureml.dataprep.api.typedefinitions.HistogramCompareMethod
        :return: Difference of the profiles.
        :rtype: azureml.dataprep.api.engineapi.typedefinitions.DataProfileDifference
        """
        _log_not_supported_api_usage_and_raise(module_logger, '_DatasetClient.compare_dataset_snapshot_profiles',
                                               'deprecated')

    @staticmethod
    def _execute_dataset_diff_local(
            lhs_dataset,
            rhs_dataset,
            columns,
            action_run,
            action_id,
            is_bi_direction=True
    ):
        """
        :param lhs_dataset: left side dataset
        :type lhs_dataset: azureml.core.dataset.Dataset
        :param rhs_dataset: right side dataset
        :type rhs_dataset: azureml.core.dataset.Dataset
        :param columns: list of columns to be included
        :type columns: List[str]
        :param action_run: ActionDatasetRun from dataset diff
        :type action_run: DatasetActionRun
        :param action_id: action_id
        :type action_id: uuid
        :param is_bi_direction: if need to calculate diff for the other direction
        :type is_bi_direction: BooleanType
        :return: artifact id of diff result
        """
        _log_not_supported_api_usage_and_raise(module_logger, '_DatasetClient._execute_dataset_diff_local',
                                               'deprecated')

    @staticmethod
    def _execute_diff_local(
        lhs_dataset_or_snapshot,
        rhs_dataset_or_snapshot,
        profile_arguments,
        include_columns,
        exclude_columns,
        histogram_compare_method,
        action_run,
        dataset_id,
        action_id
    ):
        _log_not_supported_api_usage_and_raise(module_logger, '_DatasetClient._execute_diff_local', 'deprecated')

    @staticmethod
    def _execute_dataset_diff_action(workspace, action):
        _log_not_supported_api_usage_and_raise(module_logger, '_DatasetClient._execute_dataset_diff_action',
                                               'deprecated')

    @staticmethod
    def execute_diff_action(workspace, action):
        _log_not_supported_api_usage_and_raise(module_logger, '_DatasetClient.execute_diff_action', 'deprecated')

    @staticmethod
    def _create_dataset_definition_dto(definition):
        _log_not_supported_api_usage_and_raise(module_logger, '_DatasetClient._create_dataset_definition_dto',
                                               'deprecated')

    @staticmethod
    def _get_updated_definition(definition, dataflow, data_path=None):
        _log_not_supported_api_usage_and_raise(module_logger, '_DatasetClient._get_updated_definition', 'deprecated')

    @staticmethod
    def _get_client(ws, auth=None, host=None):
        host_env = os.environ.get('AZUREML_SERVICE_ENDPOINT')
        auth = auth or ws._auth
        host = host or host_env or get_service_url(
            auth, _DatasetClient._get_workspace_uri_path(
                ws._subscription_id, ws._resource_group, ws._workspace_name), ws._workspace_id, ws.discovery_url)

        return RestClient(credentials=_DatasetClient._get_basic_token_auth(auth), base_url=host)

    @staticmethod
    def _get_basic_token_auth(auth):
        return BasicTokenAuthentication({
            "access_token": _DatasetClient._get_access_token(auth)
        })

    @staticmethod
    def _get_access_token(auth):
        header = auth.get_authentication_header()
        bearer_token = header["Authorization"]

        return bearer_token[_DatasetClient._bearer_prefix_len:]

    @staticmethod
    def _get_workspace_uri_path(subscription_id, resource_group, workspace_name):
        return ("/subscriptions/{}/resourceGroups/{}/providers"
                "/Microsoft.MachineLearningServices"
                "/workspaces/{}").format(subscription_id, resource_group, workspace_name)

    @staticmethod
    def _get_credential_type(account_key, sas_token):
        _log_not_supported_api_usage_and_raise(module_logger, '_DatasetClient._get_credential_type', 'deprecated')

    @staticmethod
    def _get_package_with_version(name):
        package_with_version = name
        try:
            from pkg_resources import get_distribution
            version = get_distribution(name).version
            package_with_version = "{}=={}".format(name, version)
        except Exception:
            pass
        return package_with_version

    @staticmethod
    def _execute_dataset_action(workspace, dataset_id, action_id, dataflow_json):
        if not dataflow_json:
            _log_not_supported_api_usage_and_raise(module_logger,
                                                   '_DatasetClient._execute_dataset_action(no dafalow)',
                                                   'deprecated')
        sdk_verion_str = ' '.join(
            [_DatasetClient._get_package_with_version(pkg) for pkg in ['azureml-core', 'azureml-dataprep']])
        module_logger.info(
            'Action execution started. Action id: {}. SDK versions: {}. ClientSessionId: {}'
            .format(action_id, sdk_verion_str, _ClientSessionId))
        action = _DatasetClient._get_action_by_id(workspace, dataset_id, action_id)
        module_logger.info('Action retrieved. Action id: {}'.format(action_id))
        dflow = None

        datastore = None
        datastore_name_from_request = action.datastore_name
        if datastore_name_from_request:
            module_logger.info('datastore name: {}'.format(datastore_name_from_request))
            datastore = Datastore.get(workspace, datastore_name=datastore_name_from_request)

        import azureml.dataprep as dprep
        dflow = dprep.EnginelessDataflow.from_json(dataflow_json)
        module_logger.info('Dataflow retrieved. Action id: {}'.format(action_id))
        if action.action_type == 'profile':
            result = _DatasetClient._execute_local_profile(dflow, action.arguments)
            result_artifacts = []
            if datastore:
                module_logger.info('Uploading profile result to datastore. Action id: {}'.format(action_id))
                result_artifacts = _DatasetClient._upload_profile_to_datastore(
                    workspace,
                    dataset_id,
                    action.action_id,
                    action.action_type,
                    result,
                    datastore)
                if action.arguments.get('generate_preview', False):
                    if 'row_count' not in action.arguments:
                        raise Exception('\'row_count\' is not specified in the arguments')
                    result_artifacts.append(_DatasetClient._upload_preview_to_datastore(
                        workspace,
                        action,
                        dflow,
                        datastore))
            else:
                module_logger.info('Writing profile result to artifact store. Action id: {}'.format(action_id))
                result_artifacts = _DatasetClient._write_to_artifact_store(
                    workspace,
                    dataset_id,
                    action.action_id,
                    action.action_type,
                    result)
                if action.arguments.get('generate_preview', False):
                    if 'row_count' not in action.arguments:
                        raise Exception('\'row_count\' is not specified in the arguments')
                    result_artifacts.append(_DatasetClient._upload_preview(workspace, action, dflow))

            import datetime
            _DatasetClient._update_action_result(
                workspace,
                dataset_id,
                action_id,
                result_artifacts,
                # generate a number that would staty constant until the end of this month
                datetime.datetime.now().strftime("%Y%m"))
        else:
            _log_not_supported_api_usage_and_raise(
                module_logger,
                f'_DatasetClient._execute_dataset_action(not supported type: {action.action_type})',
                'deprecated')

        module_logger.info('Action execution completed. Action id: {}'.format(action_id))

    @staticmethod
    def _upload_images_stream(workspace, action, dataflow):
        _log_not_supported_api_usage_and_raise(module_logger, '_DatasetClient._upload_images_stream', 'deprecated')

    @staticmethod
    def _upload_preview_to_datastore(workspace, action, dataflow, datastore):
        row_count = int(action.arguments['row_count'])
        data_path = 'actions/{}/preview_result.csv'.format(action.action_id)
        relative_root = 'Saveddataset/{}'.format(action.dataset_id)
        artifact_id = '{}/{}'.format(relative_root, data_path)
        os.makedirs(os.path.dirname(data_path), exist_ok=True)

        dataflow.take(row_count).to_pandas_dataframe().to_csv(data_path, index=False)

        try:
            destination_uri = \
                "azureml://subscriptions/{}/resourcegroups/{}/workspaces/{}/datastores/{}/paths/{}".format(
                    datastore.workspace.subscription_id,
                    datastore.workspace.resource_group,
                    datastore.workspace.name,
                    datastore.name,
                    relative_root.lstrip("/"))
            _upload_to_datastore(data_path, destination_uri, None, overwrite=True, is_volume=False)
        except Exception as e:
            module_logger.error("Failed to upload preview result. Exception: {}".format(e))
            raise e
        finally:
            if os.path.isfile(data_path):
                os.remove(data_path)
        return artifact_id

    @staticmethod
    def _upload_preview(workspace, action, dataflow):
        artifacts_client = ArtifactsClient(workspace.service_context)
        row_count = int(action.arguments['row_count'])
        data_path = 'actions/{}'.format(action.action_id)
        if not os.path.exists(data_path):
            os.mkdir(data_path)
        csv_path = data_path + '/preview_result.csv'
        dataflow.take(row_count).to_pandas_dataframe().to_csv(csv_path, index=False)

        try:
            artifact = artifacts_client.create_empty_artifacts(
                origin='Dataset',
                container=action.dataset_id,
                paths=[csv_path]).artifacts[csv_path]
            artifacts_client.upload_files(
                paths=[csv_path],
                origin=artifact.origin,
                container=artifact.container)
        except Exception:
            pass
        finally:
            if os.path.isfile(csv_path):
                os.remove(csv_path)
        return artifact.artifact_id

    @staticmethod
    def _handle_exception(err):
        _log_not_supported_api_usage_and_raise(module_logger, '_DatasetClient._handle_exception', 'deprecated')

    @staticmethod
    def _get_partition_format_dataflow(dflow, partition_format):
        _log_not_supported_api_usage_and_raise(module_logger, '_DatasetClient._get_partition_format_dataflow',
                                               'deprecated')

    @staticmethod
    def _partition_format_to_regex(format):
        _log_not_supported_api_usage_and_raise(module_logger, '_DatasetClient._partition_format_to_regex',
                                               'deprecated')

    @staticmethod
    def _ensure_partition_format(format, reserved_keys):
        _log_not_supported_api_usage_and_raise(module_logger, '_DatasetClient._ensure_partition_format', 'deprecated')

    @staticmethod
    def _insert_step(
        dflow,
        pos,
        step_type,
        arguments,
        local_data=None
    ):
        _log_not_supported_api_usage_and_raise(module_logger, '_DatasetClient._insert_step', 'deprecated')

    @staticmethod
    def reference_local_file(dataflow):
        _log_not_supported_api_usage_and_raise(module_logger, '_DatasetClient.reference_local_file', 'deprecated')
