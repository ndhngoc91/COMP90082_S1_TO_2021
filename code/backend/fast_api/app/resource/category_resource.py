import logging
from app.model.category import Category
from app.resource.simple_model_resource import SimpleModelResource

logger = logging.getLogger(__name__)
logging.basicConfig(level=logging.DEBUG)


class CategoryResource(SimpleModelResource):
    """
    A subclass of DatabaseBase, responsible for handling database
    operations regarding orders

    These operations include:
        - Storing a purchase made on SQUIZZ in the database
        - Retrieving order history
    """

    def __init__(self):
        super().__init__()

    def get_all_categories(self, query=None):
        """
        This method will return all categories of records from the database

        Args:

        """

        category_list = "SELECT * FROM categories "

        category_dict_list = self.run_query(
            category_list,
            [],
            False
        )

        category_dict_list = [] if category_dict_list is None else category_dict_list

        for category in category_dict_list:
            category["image_url"] = "https://upload.wikimedia.org/wikipedia/commons/8/84/Ski_Famille_-_Family_Ski_Holidays.jpg"
        return [category for category in category_dict_list]

    def get_category_details(self, days, category_id):
        """
        This method will return all details of categories

        Args:
            days:
            category:

        return:
            list of details

        """

        query_packages = "SELECT * FROM packages WHERE category_id = %s"
        packages_dict_list = self.run_query(
            query_packages,
            [category_id],
            False
        )
        packages_dict_list = [] if packages_dict_list is None else packages_dict_list

        details = []
        for package in packages_dict_list:
            detail = package
            package_id = package["id"]
            query_price = "SELECT price FROM price_levels\
                                WHERE package_id = %s\
                                AND number_of_days = %s"
            price = self.run_query(
                query_price,
                [package_id, days],
                False
            )
            if price is None :
                detail["price"] = 0
            else:
                detail["price"] = price[0]["price"]

            details.append(detail)

        return details
