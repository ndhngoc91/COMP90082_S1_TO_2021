import logging
from api.model.customer import Customer
from api.resource.simple_model_resource import SimpleModelResource
import math

logger = logging.getLogger(__name__)
logging.basicConfig(level=logging.DEBUG)


class CustomerResource(SimpleModelResource):
    """
    A subclass of DatabaseBase, responsible for handling customer information
    related db operations

    These operations include:
        - Search customers based name or email
    """

    def __init__(self):
        super().__init__()

    def search(self, query, page_id=None, page_size=10):
        obj_filter = ""
        obj_filter_values = []
        if query is not None:
            query = "%" + query + "%"
            obj_filter = "WHERE first_name LIKE %s\
                         OR last_name LIKE %s\
                         OR email LIKE %s\
                         OR phone LIKE %s"
            obj_filter_values = [query, query, query, query]

        if page_id is None:
            page_id = 1

        cur_page = (page_id - 1) * page_size
        count_query = "SELECT COUNT(*) AS count FROM customers " + \
            obj_filter
        count = self.run_query(
            count_query,
            obj_filter_values,
            False
        )[0]["count"]
        total_pages = math.ceil(count / page_size)
        if total_pages == 0:
            total_pages = 1
        if page_id > total_pages or page_id < 1:
            return {}

        # page filter
        customer_list = "SELECT * FROM customers " + obj_filter + " LIMIT %s,%s"
        obj_dict_list = self.run_query(
            customer_list,
            obj_filter_values + [cur_page, page_size],
            False
        )
        obj_dict_list = [] if obj_dict_list is None else obj_dict_list
        obj_list = [self.to_model(Customer, obj_dict)
                    for obj_dict in obj_dict_list]

        return {
            "total_pages": total_pages,
            "total_items": count,
            "page_num": 1 if page_id is None else page_id,
            "page_size": page_size,
            "items": obj_list
        }
