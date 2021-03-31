from app.Util import AuthUtil as authUtil
from app.Service import ProductService as product_service
from flask import (
    Blueprint,
    redirect,
    request,
    jsonify,
    url_for,
)

product = Blueprint('product', __name__)


# Example of the API call
# http://127.0.0.1:3000/api/product?sessionKey=8A96E4EF6C4C9ECC4938A7DB816346DC&barcode=9326243001262
@product.route('/api/barcode', methods=['GET'])
def get_barcode_product():
    barcode = request.args.get('barcode')
    return jsonify(product_service.get_product_by_barcode(barcode))


# Example of the API call
# http://127.0.0.1:3000/api/product?sessionKey=8A96E4EF6C4C9ECC4938A7DB816346DC&productCode=01248
@product.route('/api/product', methods=['GET'])
def get_product_by_id():
    product_code = request.args.get('productCode')
    return jsonify(product_service.get_product_by_product_code(product_code))

# Example of the API call
# http://localhost:3000/api/products/search?identifier=CFP&identifierType=productCode
@product.route('/api/products/search', methods=['GET'])
def search_products():
    identifier = request.args.get('identifier')
    identifierType = request.args.get('identifierType')
    
    return jsonify(product_service.search_products(identifier, identifierType))


# This method is not called from the front end. These are supposed to be called by the Postman or another similar tool that
# allow you to make calls to the REST API.
# This method is repsonbile for getting the latest products from SQUIZZ platform and updating the table in the local database
@product.route('/retrieveProducts', methods=['GET'])
def retrieve_products():
    return jsonify(product_service.retrieve_products())


# This method is not called from the front end. These are supposed to be called by the Postman or another similar tool
# that allow you to make calls to the REST API.
# Getting the latest product prices from SQUIZZ platform and updating the table in the local database
@product.route('/retrievePrices', methods=['GET'])
def retrieve_prices():
    return jsonify(product_service.retrieve_prices())


# This method is not called from the front end. These are supposed to be called by the Postman or another similar tool
# that allow you to make calls to the REST API.
# Getting the product update from SQUIZZ platform and updating the table in the local database
@product.route('/updateProducts', methods=['GET'])
def update_products():
    return jsonify(product_service.update_products())


# This method is not called from the front end. These are supposed to be called by the Postman or another similar tool
# that allow you to make calls to the REST API.
# Getting the latest product prices from SQUIZZ platform and updating the table in the local database
@product.route('/updatePrices', methods=['GET'])
def update_product_price():
    return jsonify(product_service.update_prices())


@product.route('/metadata/import', methods=['POST'])
def import_metadata():
    data = request.get_json(silent=True)
    return jsonify(product_service.import_metadata(data))


@product.route('/threedmodel/import', methods=['POST'])
def import_threedmodel():
    data = request.get_json(silent=True)
    return jsonify(product_service.import_threedmodel(data))


@product.route('/api/metadata/get', methods=['GET'])
def get_metadata_by_product_code():
    product_code = request.args.get('productCode')
    return jsonify(product_service.get_metadata_by_product_code(product_code))


@product.route('/updateCategories', methods=['GET'])
def update_product_categories():
    return jsonify(product_service.restore_category())


@product.route('/api/categories', methods=['GET'])
def list_categories():
    parents, children = product_service.list_all_categories()
    categories = []
    for category in parents:
        p_cate_dict = category.__dict__
        if category.keyCategoryID not in children:
            p_cate_dict['Children'] = []
        else:
            p_cate_dict['Children'] = [child.__dict__ for child in children[category.keyCategoryID]]
        categories.append(p_cate_dict)

    return jsonify(categories), 200


@product.route('/api/products', methods=['GET'])
def list_products_with_pagination():
    params = request.args
    category_id = params.get('cate')
    page = params.get('page')
    if category_id is not None:
        category_id = int(category_id)

    if page is not None:
        page = int(page)
    else:
        page = 1

    ret_set = product_service.list_all_products(category_id, page)

    items = [prod.basic_dict() for prod in ret_set['items']]
    ret_set['items'] = items
    return jsonify(ret_set), 200
