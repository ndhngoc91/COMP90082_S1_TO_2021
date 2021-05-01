import logging

import math
from pymysql import IntegrityError
from api.resource.database_base import DatabaseBase
from api.exception.exceptions import *

logger = logging.getLogger(__name__)
logging.basicConfig(level=logging.DEBUG)


class SimpleModelResource(DatabaseBase):
    """
    A subclass of DatabaseBase, responsible for handling database
    operations regarding simple Models (customer, address, etc.)
    ** Notice **, to use this resource, the model must:
            implement the fields mapping            get_fields_mapping()
            specify the corresponding table name    get_table_name()

            please refer the Customer and the Address Model

    These operations include:
        - Insert Record
        - Update Record
        - Delete Record
        - Retrieve Record by auto increment id(pk)
        - Retrieve Record(s) by multiple fields using Model obj
    """

    def __init__(self):
        super().__init__()

    @staticmethod
    def to_dict(obj):
        """
        Read field names as well as corresponding values

        :param obj: Model obj
        :return: field_value_dict -> dict
        """
        fields_mapping = obj.fields_mapping()
        obj_dict = obj.__dict__.copy()
        field_value_dict = {}
        for key in obj_dict:
            if key in fields_mapping:
                field_value_dict[fields_mapping[key]] = obj_dict[key]

        return field_value_dict

    @staticmethod
    def to_model(cls, record_dict):
        fields_mapping = cls.fields_mapping()
        obj_dict = {}
        for key in record_dict:
            if key in fields_mapping:
                obj_dict[fields_mapping[key]] = record_dict[key]
        return cls(obj_dict)

    def get_one_by_id(self, obj):
        """
        Retrieve on record from specific table in database

        """
        cls = type(obj)
        table = obj.table_name()
        query = f'SELECT * FROM {table} WHERE id=%s'
        ret = self.run_query(query, [obj.id], False)
        if ret is None:
            logger.error(f'Record not found in table {table}')
            raise NotFound(obj)
        else:
            ret_obj = self.to_model(cls, ret[0])
            return ret_obj

    def list_all(self, cls, fields=None, page=None, page_size=20):
        """return all records by the given class"""
        table = cls.table_name()

        if fields is None:
            fields_str = '*'
        else:
            fields_str = ','.join(fields)

        if page is None:
            paging_str = ''
        else:
            paging_str = f'LIMIT {(page - 1) * page_size}, {page_size}'
            count_query = f'SELECT COUNT(*) AS count FROM {table}'
            count = self.run_query(count_query, [], False)[0]['count']
            total_pages = math.ceil(count / page_size)
            if total_pages == 0:
                total_pages = 1
            if page > total_pages or page < 1:
                raise PaginationError()

        query = f'SELECT {fields_str} FROM {table} {paging_str}'
        obj_dict_list = self.run_query(query, [], False)
        obj_dict_list = [] if obj_dict_list is None else obj_dict_list
        obj_list = [self.to_model(cls, obj_dict) for obj_dict in obj_dict_list]

        if page is None:
            return obj_list
        else:
            return {
                "total_pages": total_pages, "total_items": count,
                "page_num": page, "page_items": len(obj_list),
                "items": obj_list
            }

    def insert(self, obj, commit=True):
        """
        Save current obj as an new instance into the database

        """
        table = obj.table_name()
        record_dict = self.to_dict(obj)
        del record_dict['id']

        fields_str = ','.join(record_dict.keys())
        values = list(record_dict.values())
        place_holders = ('%s,' * len(values))[:-1]
        query = f"INSERT into {table} ({fields_str}) VALUES ({place_holders})"
        try:
            self.run_query(query, values, commit)
            obj.id = self.cursor.lastrowid
            return obj
        except IntegrityError as e:
            logger.error(f'Create record for table {table} failed: {str(e)}')
            if e.args[0] == 1062:
                raise AlreadyExists(obj)
            if e.args[0] == 1216:
                raise ViolateFKConstraint(obj)
            else:
                raise OtherException(obj)
        except Exception as e:
            logger.error(f'Create record for table {table} failed: {str(e)}')
            raise OtherException(obj)

    # TODO to finalise
    def batch_insert(self, obj_list, batch_size=5000, commit=True):
        """Insert records one by one for now"""
        total = len(obj_list)
        if total == 0:
            return
        table = obj_list[0].table_name()
        success = 0
        failed = 0
        failed_list = []
        for obj in obj_list:
            try:
                self.insert(obj, commit=commit)
            except Exception as e:
                failed += 1
                failed_list.append(obj)
                logger.error(f'Create record for table {table} failed: {str(e)}')
            else:
                success += 1

        logger.info(f"Batch insert into table '{table}', num of success [{success}/{total}]")
        return {
            'total': total,
            'success': success,
            'failed': failed,
            'failed_objs': failed_list
        }

    def update(self, obj, commit=True):
        """
        Save current obj into database according to the id

        """
        self.get_one_by_id(obj)
        table = obj.table_name()
        record_dict = self.to_dict(obj)
        del record_dict['id']

        fields = record_dict.keys()
        values = list(record_dict.values())
        sets = ','.join([f'{field}=%s' for field in fields])
        query = f"UPDATE {table} SET {sets} WHERE id={obj.id}"
        try:
            self.run_query(query, values, commit)
        except IntegrityError as e:
            logger.error(f'Update record in table {table} failed: {str(e)}')
            if e.args[0] == 1062:
                raise AlreadyExists(obj)
            if e.args[0] == 1216:
                raise ViolateFKConstraint(obj)
            else:
                raise OtherException(obj)
        except Exception as e:
            logger.error(f'Update record in table {table} failed: {str(e)}')
            raise OtherException(obj)

    def delete(self, obj, commit=True):
        """
        Delete current obj from database according to the id

        """
        obj = self.get_one_by_id(obj)
        table = obj.table_name()
        query = f'DELETE FROM {table} WHERE id=%s'
        self.run_query(query, [obj.id], commit)

    def find_all(self, obj, page=None, page_size=20):
        """
        Exact match records by obj, do not support filtering Nulls.

        :param  obj
        :param  page page number
        :param  page_size page size
        :return exact one obj
        :raise  OtherException
        """
        table = obj.table_name()
        cls = type(obj)
        fv_dict = self.to_dict(obj)
        for k, v in list(fv_dict.items()):
            if v is None:
                del fv_dict[k]

        if len(fv_dict) == 0:
            return []

        fields = fv_dict.keys()
        values = list(fv_dict.values())

        where_clause = 'WHERE ' + ' AND '.join(
            [f'{field}=%s' for field in fields]
        )
        if page is None:
            paging_str = ''
        else:
            paging_str = f'LIMIT {(page - 1) * page_size}, {page_size}'

        query = f'SELECT * FROM {table} {where_clause} {paging_str}'
        try:
            ret_list = self.run_query(query, values, False)
            if ret_list is None:
                return []

            obj_list = [self.to_model(cls, record) for record in ret_list]
            return obj_list

        except Exception as e:
            logger.error(f'Unexpected error while executing query: {self.cursor._last_executed}\n%s', e)
            raise OtherException(obj)

    def find_one(self, obj):
        """
        Exact match one record by obj, do not support filtering Nulls.

        :param  obj
        :return exact one obj
        :raise  MultipleRecordsFound, OtherException, NotFound
        """
        ret_list = self.find_all(obj)
        if len(ret_list) == 0:
            raise NotFound(obj)
        elif len(ret_list) > 1:
            raise MultipleRecordsFound(obj)
        else:
            return ret_list[0]

    def truncate(self, cls, commit=True):
        """Clear tables"""
        try:
            self.run_query(f'DELETE FROM {cls.table_name()}', [], commit)
        except Exception as e:
            logger.error(f'Unexpected error while executing query: {self.cursor._last_executed}\n%s', e)
            raise OtherException(cls())
