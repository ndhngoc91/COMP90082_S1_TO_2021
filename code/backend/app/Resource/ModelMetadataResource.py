import logging
from .DatabaseBase import DatabaseBase

logger = logging.getLogger(__name__)
logging.basicConfig(level=logging.DEBUG)


class ModelMetadataResource(DatabaseBase):
    def __init__(self):
        super().__init__()

    def insert_metadata(self, product_id: str, product_code: str, meta_json_string: str) -> int:
        insert_query = (
            """INSERT into model_metadata(product_id,product_code,meta_json_string) values(%s,%s,%s) 
               """)

        values = [product_id, product_code, meta_json_string]
        try:
            self.run_query(insert_query, values, True)
        except Exception as e:
            self.connection.rollback()
            logger.error('Exception occurred when inserting order', e)
            return 0
        return 1

    def get_metadata_by_product_code(self, product_code: str):
        select_query = ("""
        SELECT * FROM model_metadata where product_code= %s
        """)
        values = [product_code]
        try:
            result = self.run_query(select_query, values, True)
            if result:
                return result[0]
        except Exception as e:
            self.connection.rollback()
            logger.error('Exception occurred when inserting order', e)

        return None

    def update_metadata(self, product_code, meta_json_string) -> int:
        logger.debug("update")
        update_query = """
        UPDATE model_metadata
        SET meta_json_string =%s where product_code=%s
        """
        values = [meta_json_string, product_code]
        try:
            self.run_query(update_query, values, True)
        except Exception as e:
            self.connection.rollback()
            logger.error('Exception occurred when inserting order', e)
            return 0
        return 1
