# ---------------------------------------------------------
# Copyright (c) Microsoft Corporation. All rights reserved.
# ---------------------------------------------------------

"""
Contains helper class to allow construction of partial dataprep steps for additional transformations
without dataprep engine.
"""

import json
import random
import uuid
from azureml.data.dataset_type_definitions import PromoteHeadersBehavior

class DataflowStub(object):
    """
    A stub for Dataflow that allows for the creation of a Dataflow json object without the need for dataprep engine.
    """
    steps = []

    def __init__(self, steps=[]):
        self.steps = steps

    @property
    def _steps(self):
        return self.steps

    def _get_steps(self):
        return self.steps

    def add_step(self, step):
        return DataflowStub(self.steps + [step])

    def add_column(self, expression, column_name, _record = None):
        format = f'{{"id": "{str(uuid.uuid4())}", "type": "Microsoft.DPrep.ExpressionAddColumnBlock", "arguments": {{"expression": {json.dumps(expression.underlying_data)}, "newColumnName": "{column_name}"}}, "localData": {{}}, "isEnabled": true, "name": null, "annotation": null}}'
        return self.add_step(json.loads(format))

    def drop_columns(self, column_name):
        if not isinstance(column_name, list):
            column_name = [column_name]
        format = f'{{"id": "{str(uuid.uuid4())}", "type": "Microsoft.DPrep.DropColumnsBlock", "arguments": {{"columns": {{"type": 0, "details": {{"selectedColumns": {json.dumps(column_name)}}}}}}}, "localData": {{}}, "isEnabled": true, "name": null, "annotation": null}}'
        return self.add_step(json.loads(format))

    def keep_columns(self, column_name):
        if not isinstance(column_name, list):
            column_name = [column_name]
        format = f'{{"id": "{str(uuid.uuid4())}", "type": "Microsoft.DPrep.KeepColumnsBlock", "arguments": {{"columns": {{"type": 0, "details": {{"selectedColumns": {json.dumps(column_name)}}}}}}}, "localData": {{}}, "isEnabled": true, "name": null, "annotation": null}}'
        return self.add_step(json.loads(format))

    def filter(self, expression):
        format = f'{{"id": "{str(uuid.uuid4())}", "type": "Microsoft.DPrep.ExpressionFilterBlock", "arguments": {{"expression": {json.dumps(expression.underlying_data)} }}, "localData": {{}}, "isEnabled": true, "name": null, "annotation": null}}'
        return self.add_step(json.loads(format))

    def parse_delimited(self, separator = ',', headers_mode = PromoteHeadersBehavior.ALL_FILES_HAVE_SAME_HEADERS, quoting = False):
        format = f'{{"id": "{str(uuid.uuid4())}", "type": "Microsoft.DPrep.ParseDelimitedBlock", "arguments": {{"columnHeadersMode": {headers_mode.value}, "fileEncoding": 0, "handleQuotedLineBreaks": {str(quoting).lower()}, "preview": false, "separator": "{separator}", "skipRows": 0, "skipRowsMode": 0}}, "localData": {{}}, "isEnabled": true, "name": null, "annotation": null}}'
        return self.add_step(json.loads(format))

    def read_parquet_file(self):
        format=f'{{"id": "{str(uuid.uuid4())}", "type": "Microsoft.DPrep.ReadParquetFileBlock", "arguments": {{"preview": false}}, "localData": {{}}, "isEnabled": true, "name": null, "annotation": null}}'
        return self.add_step(json.loads(format))

    def random_split(self, percentage, seed = None):
        if percentage < 0.0 or percentage > 1.0:
            raise ValueError("percentage must be a number between 0.0 and 1.0.")

        seed = seed or random.randint(0, 4294967295)

        format = '{{"id": "{}", "type": "Microsoft.DPrep.TakeSampleBlock", "arguments": {{"probability": {}, "probabilityLowerBound": {}, "seed": {}}}, "localData": {{}}, "isEnabled": true, "name": null, "annotation": null}}'
        dflow1 = self.add_step(json.loads(format.format(str(uuid.uuid4()), percentage, 0.0, seed)))
        dflow2 = self.add_step(json.loads(format.format(str(uuid.uuid4()), 1.0, percentage, seed)))
        return dflow1, dflow2

    def set_column_types(self, type_conversions):
        """
        type_conversions: dict of column_name -> DataType
        """
        conversions = []

        for column_name, column_type in type_conversions.items():
            type_value = column_type._type_conversion.data_type.value
            if type_value >= 0 and type_value <= 2:
                conversions.append({"column": {"type": 2, "details": {"selectedColumn": column_name}}, "typeProperty": type_value})
            elif type_value == 3:
                conversions.append({"column": {"type": 2, "details": {"selectedColumn": column_name}}, "typeArguments": {"decimalMark": column_type._type_conversion.decimal_mark.value}, "typeProperty": 3})
            elif type_value == 4:
                conversions.append({"column": {"type": 2, "details": {"selectedColumn": column_name}}, "typeArguments": {"dateTimeFormats": column_type._type_conversion.formats}, "typeProperty": 4})
            elif type_value == 10:
                ws = column_type._type_conversion.workspace
                conversions.append({"column": {"type": 2, "details": {"selectedColumn": column_name}}, "typeArguments": {"escaped": column_type._type_conversion.escaped, "resourceGroup": ws.resource_group, "subscription": ws.subscription_id, "workspaceName": ws.name}, "typeProperty": 10})
        if len(conversions) == 0:
            return self

        format = f'{{"id": "{str(uuid.uuid4())}", "type": "Microsoft.DPrep.SetColumnTypesBlock", "arguments": {{"columnConversion": {json.dumps(conversions)}}}, "localData": {{}}, "isEnabled": true, "name": null, "annotation": null}}'
        return self.add_step(json.loads(format))

    def _add_columns_from_partition_format(self, partition_format):
        format = f'{{"id": "{str(uuid.uuid4())}", "type": "Microsoft.DPrep.AddColumnsFromPartitionFormatBlock", "arguments": {{"column": {{"type": 2, "details": {{"selectedColumn": "Path"}}}}, "ignoreError": false, "partitionFormat": "{partition_format}"}}, "localData": {{}}, "isEnabled": true, "name": null, "annotation": null}}'
        return self.add_step(json.loads(format))

    def to_json(self):
        dataflow_object = {"blocks": self.steps}
        return json.dumps(dataflow_object)

    @staticmethod
    def from_json(json_string):
        dataflow_object = json.loads(json_string)
        return DataflowStub(dataflow_object["blocks"])


def find_first_different_step(left, right):
    """Compares the two dataflow and return the first index where the step differs.

    :param left: The dataflow to compare.
    :type left: azureml.dataprep.Dataflow
    :param right: The dataflow to compare.
    :type right: azureml.dataprep.Dataflow
    :return: int
    """

    left_steps = left._get_steps()
    right_steps = right._get_steps()
    short_length = min(len(left_steps), len(right_steps))
    for i in range(short_length):
        if not steps_equal(left_steps[i], right_steps[i]):
            return i
    return short_length


def steps_equal(left, right):
    return left['type'] == right['type'] and left['arguments'] == right['arguments']


def is_tabular(transformations):
    tabular_transformations = {
        'Microsoft.DPrep.ReadParquetFileBlock',
        'Microsoft.DPrep.ParseDelimitedBlock',
        'Microsoft.DPrep.ParseJsonLinesBlock'
    }

    for steps in transformations._get_steps():
        if steps['type'] in tabular_transformations:
            return True
    return False