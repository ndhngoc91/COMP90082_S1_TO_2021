import logging
from app.api.model.category import Category
from app.api.resource.simple_model_resource import SimpleModelResource

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

    def get_all_categories(self):
        """
        This method will return all categories of records from the database

        Args: None

        Return: List of categories
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
            list of category details
        """

        # category_id & category_name
        query_category_name = "SELECT name FROM categories WHERE id = %s"
        category_dict_list = self.run_query(
            query_category_name,
            [category_id],
            False
        )
        category_name = [] if category_dict_list is None else category_dict_list[0]["name"]

        query_packages = "SELECT * FROM packages WHERE category_id = %s"
        packages_dict_list = self.run_query(
            query_packages,
            [category_id],
            False
        )
        packages_dict_list = [] if packages_dict_list is None else packages_dict_list

        details = []

        for package in packages_dict_list:
            detail = {}
            package_id = package["id"]
            package_name = package["name"]
            query_price = "SELECT price FROM price_levels\
                                WHERE package_id = %s\
                                AND number_of_days = %s"

            price = self.run_query(
                query_price,
                [package_id, days],
                False
            )

            detail["package_id"] = package["id"]
            detail["package_name"] = package["name"]
            detail["skill_level_id"] = package["skill_level_id"]
            detail["age_group_id"] = package["age_group_id"]
            detail["description"] = package["description"]

            if price is None:
                detail["price"] = 0
            else:
                detail["price"] = price[0]["price"]

            query_type_id = "SELECT trail_type_id FROM package_ttypes_pair WHERE package_id = %s"

            type_ids_dict = self.run_query(
                query_type_id,
                [package_id],
            )
            type_ids_list = [] if type_ids_dict is None else [
                type_id["trail_type_id"] for type_id in type_ids_dict]

            query_types = "SELECT * FROM trail_types WHERE id = %s"

            all_type_details = []
            for type_id in type_ids_list:
                type_detail = {}
                type_dict = self.run_query(
                    query_types,
                    [str(type_id)],
                )
                types = [] if type_dict is None else type_dict[0]
                type_detail["type_id"] = type_id
                type_detail["type_name"] = types["name"]
                type_detail["category_id"] = category_id
                type_detail["category_name"] = category_name
                type_detail["package_id"] = package_id
                type_detail["package_name"] = package_name
                type_detail["price"] = price[0]["price"]
                all_type_details.append(type_detail)

            detail["types"] = all_type_details
            detail["extras"] = self.get_extras_details(days,detail["age_group_id"])

            details.append(detail)

        return details

    def get_extras_details(self, days, age_group_id):
        """
        This method will return all details of extras based on chosen package

        Args:
            days:
            age_group_id

        return:
            list of extras details
        """
        query_extra_name = "SELECT * FROM extra \
                                WHERE age_group_id = %s"
        extras_dict_list = self.run_query(
            query_extra_name,
            [age_group_id],
            False
        )
        extras_list = [] if extras_dict_list is None else extras_dict_list
        extra_ids = [extra["idextra"] for extra in extras_list]
        extra_names = [extra["extracol"] for extra in extras_list]
        price_list = []
        for e_id in extra_ids:
            query_price = "SELECT extraprice FROM extraprice\
                                WHERE idextra = %s\
                                AND daynumber = %s"
            price_dict_list = self.run_query(
                query_price,
                [e_id, days],
                False
            )

            if price_dict_list is None:
                price = 0
            else:
                price = price_dict_list[0]["extraprice"]

            price_list.append(price)

        all_details = []
        for i in range(len(extra_ids)):
            details = {}
            details["extra_id"] = extra_ids[i]
            details["extra_name"] = extra_names[i]
            details["extra_price"] = int(price_list[i])
            all_details.append(details)

        return all_details
