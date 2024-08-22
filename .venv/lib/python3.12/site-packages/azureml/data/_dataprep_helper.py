# ---------------------------------------------------------
# Copyright (c) Microsoft Corporation. All rights reserved.
# ---------------------------------------------------------

"""Contains helper methods for dataprep."""

import sys

MIN_DATAPREP_VERSION = '1.1.29'
_version_checked = False


def check_min_version():
    global _version_checked
    if _version_checked:
        return
    _version_checked = True
    from pkg_resources import parse_version, get_distribution
    import logging
    installed_version = get_distribution('azureml-dataprep').version
    if parse_version(installed_version) < parse_version(MIN_DATAPREP_VERSION):
        logging.getLogger().warning(
            _dataprep_incompatible_version_error.format(MIN_DATAPREP_VERSION, installed_version))


def is_dataprep_installed():
    try:
        from azureml.dataprep import api
        return api is not None
    except Exception:
        return False


def dataprep():
    if not is_dataprep_installed():
        raise ImportError(get_dataprep_missing_message())
    import azureml.dataprep as _dprep
    check_min_version()
    return _dprep


def dataprep_fuse():
    try:
        import azureml.dataprep.fuse.dprepfuse as _dprep_fuse
        check_min_version()
        return _dprep_fuse
    except ImportError:
        raise ImportError(get_dataprep_missing_message(extra='[fuse]'))


def ensure_dataflow(dataflow):
    if not isinstance(dataflow, dataprep().Dataflow):
        raise RuntimeError('dataflow must be instance of azureml.dataprep.Dataflow')


def update_metadata(dataflow, action, source, **kwargs):
    from copy import deepcopy
    meta = deepcopy(dataflow._meta)

    if 'activityApp' not in meta:
        meta['activityApp'] = source

    if 'activity' not in meta:
        meta['activity'] = action

    try:
        import os
        run_id = os.environ.get("AZUREML_RUN_ID", None)
        if run_id is not None:
            meta['runId'] = run_id  # keep this here so not to break existing reporting
            meta['run_id'] = run_id
    except Exception:
        pass

    if len(kwargs) > 0:
        kwargs.update(meta)
        meta = kwargs
    return meta


def get_dataflow_for_execution(dataflow, action, source, **kwargs):
    return dataflow._copy_and_update_metadata(action, source, **kwargs)


def get_dataflow_with_meta_flags(dataflow, **kwargs):
    if len(kwargs) > 0:
        return dataflow._copy_and_update_metadata(None, None, **kwargs)
    return dataflow


def get_dataprep_missing_message(issue=None, extra=None, how_to_fix=None):
    dataprep_available = sys.maxsize > 2**32  # no azureml-dataprep available on 32 bit
    extra = extra or ''
    if how_to_fix:
        suggested_fix = ' This can {}be resolved by {}.'.format('also ' if dataprep_available else '', how_to_fix)
    else:
        suggested_fix = ''

    message = (issue + ' due to missing') if issue else 'Missing'
    message += ' required package "azureml-dataset-runtime{}", which '.format(extra)

    if not dataprep_available:
        message += 'is unavailable for 32bit Python.'
    else:
        message += 'can be installed by running: {}'.format(_get_install_cmd(extra))

    return message + suggested_fix


def _get_install_cmd(extra):
    return '"{}" -m pip install azureml-dataset-runtime{} --upgrade'.format(sys.executable, extra or '')


_dataprep_incompatible_version_error = (
    'Warning: The minimum required version of "azureml-dataprep" is {}, but {} is installed.'
    + '\nSome functionality may not work correctly. Please upgrade it by running:'
    + '\n' + _get_install_cmd('[fuse,pandas]')
)


def dataprep_stub():
    """
    Returns a stub of azureml.dataprep module that allows constructing v1 json based dataflows
    without the need for dataprep engine.
    """
    import azureml.data._dataprep_stub as _stub
    return _stub


def _convert_dataflow_stub_to_engineless(dataflow_stub):
    from azureml.dataprep import EnginelessDataflow, Expression, PromoteHeadersMode, FileEncoding
    dataflow = EnginelessDataflow(py_rs_dataflow="")
    for step in dataflow_stub._get_steps():
        step_type = step['type']
        if step_type == "Microsoft.DPrep.ExpressionAddColumnBlock":
            dataflow = dataflow.add_column(
                expression=Expression.from_pod(step['arguments']['expression']),
                new_column_name=step['arguments']['newColumnName'],
                prior_column=None)
        elif step_type == "Microsoft.DPrep.DropColumnsBlock":
            dataflow = dataflow.drop_columns(step['arguments']['columns']['details']['selectedColumns'])
        elif step_type == "Microsoft.DPrep.KeepColumnsBlock":
            dataflow = dataflow.keep_columns(step['arguments']['columns']['details']['selectedColumns'])
        elif step_type == "Microsoft.DPrep.ExpressionFilterBlock":
            dataflow = dataflow.filter(Expression.from_pod(step['arguments']['expression']))
        elif step_type == "Microsoft.DPrep.ParseDelimitedBlock":
            dataflow = dataflow.parse_delimited(
                separator=step['arguments']['separator'],
                headers_mode=PromoteHeadersMode(step['arguments']['columnHeadersMode']),
                encoding=FileEncoding(step['arguments']['fileEncoding']),
                quoting=step['arguments']['handleQuotedLineBreaks'])
        elif step_type == "Microsoft.DPrep.ReadParquetFileBlock":
            dataflow = dataflow.read_parquet_file()
        elif step_type == "Microsoft.DPrep.Microsoft.DPrep.TakeSampleBlock":
            step_args = step['arguments']
            dataflow = dataflow._add_transformation('sample',
                                                    {"sampler": "random_percent",
                                                     "sampler_arguments":
                                                        {"probability": step_args['probability'],
                                                         "probability_lower_bound": step_args['probabilityLowerBound'],
                                                         "seed": step_args['seed']}})
        elif step_type == "Microsoft.DPrep.AddColumnsFromPartitionFormatBlock":
            dataflow = dataflow._add_columns_from_partition_format(
                column="Path",
                partition_format=step['arguments']['partitionFormat'],
                ignore_error=False)
        elif step_type == "Microsoft.DPrep.SetColumnTypesBlock":
            from .dataset_factory import DataType
            from ..core.workspace import Workspace

            def map_to_data_type(type_property, type_arguments):
                if type_property == 0:  # FieldType.STRING
                    return DataType.to_string()
                elif type_property == 1:  # FieldType.BOOLEAN
                    return DataType.to_bool()
                elif type_property == 2:  # FieldType.INTEGER
                    return DataType.to_long()
                elif type_property == 3:  # FieldType.DECIMAL
                    return DataType.to_float(decimal_mark=type_arguments['decimalMark'])
                elif type_property == 4:  # FieldType.DATETIME
                    return DataType.to_datetime(formats=type_arguments['dateTimeFormats'])
                elif type_property == 10:  # FieldType.STREAM_INFO
                    workspace = Workspace(type_arguments['subscription'],
                                          type_arguments['resourceGroup'],
                                          type_arguments['workspaceName'])
                    return DataType.to_stream(workspace, type_arguments['escaped'])

            conversions = {item['column']['selectedColumn']:
                           map_to_data_type(item['typeProperty'],
                                            item['typeArguments'] if 'typeArguments' in item else None)
                           for item in step['arguments']['columnConversion']}

            dataflow = dataflow.set_column_types(conversions)
        else:
            raise ValueError('Unsupported step type: {}'.format(step_type))

    return dataflow
