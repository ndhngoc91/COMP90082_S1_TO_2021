from app.model.cate_prod import CateProd
from app.model.category import Category
from app.model.price import Price
from app.resource.simple_model_resource import SimpleModelResource
from app.model.product import Product
from app.resource.product_resource import ProductResource
from app.resource.user_resource import UserResource
from app.resource.model_metadata_resource import ModelMetadataResource
from app.util import auth_util
from app.resource.image_resource import ImageResource
import json
import logging

logger = logging.getLogger(__name__)
logging.basicConfig(level=logging.DEBUG)


def retrieve_products(org_id: str, customer_code: str = "TESTDEBTOR") -> dict:
    connection = auth_util.build_connection(org_id=org_id)
    data_type = 3
    success, product_list = connection.retrieve_organisation_data(data_type, customer_code=customer_code)
    product_resource = ProductResource()
    if success:
        return product_resource.store_products(product_list)

    return {
        "status": "error",
        "data": None,
        "Message": "Error while retrieving products data from server"
    }


def retrieve_prices(org_id: str) -> dict:
    connection = auth_util.build_connection(org_id=org_id)
    data_type = 37
    success, price_list = connection.retrieve_organisation_data(data_type)
    product_resource = ProductResource()
    if success:
        return product_resource.store_prices(price_list)

    return {
        "status": "error",
        "data": None,
        "Message": "Error while retrieving product prices data from server"
    }


def get_product_by_barcode(barcode) -> dict:
    # Get Product Details
    product_resource = ProductResource()
    product_record = product_resource.get_product_by_barcode(barcode)

    try:
        if product_record is not None:
            # Get Product images
            image_records = get_product_images(product_record["id"])

            # Converting Decimal to float (Python serializable)
            product_record["price"] = float(product_record["price"])

            # Packing data in the Model
            product_record = Product(product_record)
            if image_records is not None:
                product_record.imageList = image_records

            result = {
                "status": "success",
                "Message": "successfully retrieved product",
                "data": product_record.__dict__
            }

        else:
            result = {
                "status": "error",
                "data": None,
                "Message": "No data found"
            }
    except Exception as e:
        result = {
            "status": "error",
            "data": None,
            "Message": str(e)
        }

    return result


def get_product_by_product_code(product_code) -> dict:
    # Get Product Details
    pr = ProductResource()
    product_record = pr.get_product_by_product_code(product_code)

    try:
        if product_record is not None:
            # Get Product images
            image_records = get_product_images(product_record["id"])

            # Converting Decimal to float (Python serializable)
            product_record["price"] = float(product_record["price"])

            # Packing data in the Model
            product_record = Product(product_record)
            if image_records is not None:
                product_record.imageList = image_records

            result = {
                "status": "success",
                "message": "successfully retrieved product",
                "data": product_record.__dict__
            }

        else:
            result = {
                "status": "error",
                "data": None,
                "Message": "No data found"
            }
    except Exception as e:
        result = {
            "status": "error",
            "data": None,
            "Message": str(e)
        }

    return result


def search_products(identifier: str, identifier_type: str):
    """
    Takes an identifier value and returns the product codes or barcodes
    of products in the database that are similar to the identifier

    Args:
        identifier: a potential product code or barcode
        identifier_type: "barcode" or "productCode"

    Returns:
        JSON object including a list of similar identifiers, or no identifiers, if none were found
    """

    product_resource = ProductResource()
    product_identifiers = product_resource.search_products(identifier, identifier_type)

    if not product_identifiers:
        result = {
            "status": "error",
            "identifiers": None,
            "message": "No barcodes or product codes match the given identifier"
        }
    else:
        result = {
            "status": "success",
            "identifiers": product_identifiers,
            "message": "Successfully retrieved similar barcodes or product codes"
        }

    return result


def get_product_images(product_image_id) -> dict:
    image_resource = ImageResource()
    image_records = image_resource.get_product_images_by_id(product_image_id)
    return image_records


def update_products(org_id: str) -> dict:
    product_resource = ProductResource()
    connection = auth_util.build_connection(org_id=org_id)
    data_type = 3
    success, product_list = connection.retrieve_organisation_data(data_type)

    if success:
        return product_resource.update_products(product_list)

    return {
        "status": "error",
        "data": None,
        "Message": "Error while retrieving product from server"
    }


def update_prices(org_id: str, customer_code: str = "TESTDEBTOR") -> dict:
    connection = auth_util.build_connection(org_id=org_id)
    data_type = 37
    success, price_list = connection.retrieve_organisation_data(data_type, customer_code)
    product_resource = ProductResource()

    if success:
        return product_resource.update_prices(price_list)

    return {
        "status": "error",
        "data": None,
        "Message": "Error while retrieving product price from SQUIZZ server"
    }


def import_metadata(data) -> dict:
    username = data["Username"]
    password = data["Password"]
    try:
        user_resource = UserResource()
        org_id = user_resource.validate_username_password(username, password)
    except AttributeError:
        return {"status": "failure", "message": "LOGIN_ERROR"}

    if org_id is None:
        # wrong username or password
        return {"status": "failure", "message": "LOGIN_ERROR"}
    product_list = data["Products"]
    errormessage = ""
    for product in product_list:
        code = product["Code"]
        product_resource = ProductResource()
        product_id = product_resource.get_product_id_by_product_code(code)
        if product_id is None:
            errormessage += '"' + code + '" '
            continue
        model_metadata_resource = ModelMetadataResource()
        res = model_metadata_resource.get_metadata_by_product_code(code)
        json_dict = {}
        for element in product['ProductParameters']:
            json_dict[element['Key']] = element['Value']
        json_string = json.dumps(json_dict)
        json_string.replace('\'', '\"')

        if res is not None:
            status_code = model_metadata_resource.update_metadata(code, str(json_string))
            if status_code == 0:
                errormessage += '\"' + code + '\" '
            continue
        status_code = model_metadata_resource.insert_metadata(product_id, code, str(json_string))
        if status_code == 0:
            errormessage += '\"' + code + '\" '
            continue
    if errormessage == "":
        return {"status": "success", "message": "metadata was imported successfully"}
    else:
        return {"status": "partial success",
                "message": "product code with " + errormessage + "failed to upload, please check the product code or "
                                                                 "try again"}


def import_threedmodel(data) -> dict:
    username = data['Username']
    password = data['Password']
    try:
        user_resource = UserResource()
        org_id = user_resource.validate_username_password(username, password)
    except AttributeError:
        return {'status': "failure", "message": "LOGIN_ERROR"}

    if org_id is None:
        # wrong username or password
        return {'status': "failure", "message": "LOGIN_ERROR"}
    product_list = data['Products']
    errormessage = ""
    # for each product
    for product in product_list:
        # check if the product exist
        code = product['Code']
        product_resource = ProductResource()
        product_id_list = product_resource.search_product_id_by_product_code(code)
        if product_id_list is None:
            errormessage += "\"" + code + "\" "
            continue
        # make a list of id, get one URl link check if the record exist in image
        id_list = []
        url = product['ModelURL']
        for product_id in product_id_list:
            id_list.append(product_id['id'])
        image_resource = ImageResource()
        record = image_resource.get_threed_link_by_product_id(id_list[0])
        if record is None:
            status_code = image_resource.insert_threed_model(url, id_list)
            if status_code == 0:
                errormessage += "\"" + code + "\" "
            continue
        else:
            link = record['threeDModelLocation']
            if link is None or link != url:
                image_resource.update_threed_link(url, id_list)
    if errormessage == "":
        return {'status': "success", "message": "3d model have been imported successfully"}
    else:
        return {'status': "partial success",
                "message": "product code contains:" + errormessage + " failed to import ,please check product code or import again"}


def get_metadata_by_product_code(product_code) -> dict:
    model_metadata_resource = ModelMetadataResource()
    result = model_metadata_resource.get_metadata_by_product_code(product_code)
    if result is None:
        return {"found": False}
    meta_json = str(result['meta_json_string'])

    return {"found": True, "json_data": json.loads(meta_json)}


def restore_category(org_id: str):
    connection = auth_util.build_connection(org_id=org_id)
    status, categories = connection.retrieve_organisation_data(8)

    if not status:
        return {
            'status': 'Failed',
            'message': 'Retrieve data from squizz failed.'
        }

    sr = SimpleModelResource()
    try:
        # Rewrite categories
        sr.truncate(CateProd, False)
        sr.truncate(Category, False)
        sr.batch_insert(categories, commit=False)

        # Traverse products and convert to key, id pairs
        prod_key_id = {}
        for product in sr.list_all(Product):
            prod_key_id[product.keyProductID] = product.id

        # Rewrite category product relationships
        for category in categories:
            if category.keyCategoryParentID is None:
                continue
            if category.keyProductIDs is None:
                continue
            print(category.keyProductIDs)
            for productKey in category.keyProductIDs:
                if productKey not in prod_key_id:
                    continue
                cate_prod_rel = CateProd({'categoryId': category.id, 'productId': prod_key_id[productKey]})
                sr.insert(cate_prod_rel, commit=False)

    except Exception as e:
        sr.connection.rollback()
        sr.cursor.close()
        raise e
    else:
        sr.connection.commit()
        sr.cursor.close()

    return {
        'status': 'Success',
        'message': 'Category data Updated'
    }


def restore_prices(org_id: str, customer_code: str = "TESTDEBTOR"):
    connection = auth_util.build_connection(org_id=org_id)
    status, prices = connection.retrieve_organisation_data(37, customer_code)
    if not status:
        return {
            'status': 'Failed',
            'message': 'Retrieve data from squizz failed.'
        }

    sr = SimpleModelResource()
    try:
        # Truncate prices
        sr.truncate(Price, False)

        # Traverse products and convert to key, id pairs
        prod_key_id = {}
        for product in sr.list_all(Product, ['keyProductId', 'id']):
            prod_key_id[product.keyProductID] = product.id

        # Rewrite prices
        for price in prices:
            if price.keyProductID not in prod_key_id:
                continue
            price.productId = prod_key_id[price.keyProductID]
            sr.insert(price, False)

    except Exception as e:
        sr.connection.rollback()
        sr.cursor.close()
        raise e
    else:
        sr.connection.commit()
        sr.cursor.close()

    return {
        'status': 'Success',
        'message': 'Price data Updated.'
    }


def list_all_categories():
    # Parent categories
    p_cate_list = []
    # Children categories
    c_cate_dict = {}

    # Retrieve all categories
    for category in SimpleModelResource().list_all(Category):
        if category.keyCategoryParentID is None:
            p_cate_list.append(category)
        else:
            if category.keyCategoryParentID not in c_cate_dict:
                c_cate_dict[category.keyCategoryParentID] = [category]
            else:
                c_cate_dict[category.keyCategoryParentID].append(category)

    return p_cate_list, c_cate_dict


def list_all_products(category_id=None, page=1, page_size=20):
    # List products
    result = ProductResource().list_products_by_category(category_id, page, page_size)
    # set product price
    ProductResource().assign_price_and_images_to_product(result['items'])
    return result
