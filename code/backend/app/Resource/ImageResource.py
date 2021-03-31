import logging
from .DatabaseBase import DatabaseBase

logger = logging.getLogger(__name__)
logging.basicConfig(level=logging.DEBUG)


class ImageResource(DatabaseBase):
    def __init__(self):
        super().__init__()

    def get_product_images_by_id(self, id):
        search_image_query = """Select * From images where productId = %s """
        values = [id]
        image_records = self.run_query(search_image_query, values, False)
        return image_records

    def get_threed_link_by_product_id(self, pid):
        select_query = """ Select * from images where is3DModelType = 'Y' and productId = %s"""
        values = [str(pid)]
        records = self.run_query(select_query, values, True)
        if records is None:
            return None
        return records[0]

    def update_threed_link(self, url, id_list):
        update_query = """UPDATE images SET threeDModelLocation = %s  WHERE productId =%s and is3DModelType = 'Y' """
        for id in id_list:
            self.run_query(update_query, [url, id], False)



    def insert_threed_model(self, url, id_list):
        insert_query = """INSERT INTO images(threeDModelLocation, is3DModelType, productId) VALUES (%s, %s, %s)"""
        values = []
        for id in id_list:
            temp = (url, 'Y', str(id))
            values.append(temp)
        try:
            self.run_query_many(insert_query, values, True)
        except Exception as e:
            self.connection.rollback()
            logger.error('Exception occurred when inserting order', e)
            return 0
        return 1
