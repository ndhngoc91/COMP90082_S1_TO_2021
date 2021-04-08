from typing import Optional

from fastapi import APIRouter, Request

from app.service import product_service

router = APIRouter(
    prefix="/products",
    tags=["Products"]
)


@router.get("/barcode")
def get_barcode_product(barcode: str):
    return product_service.get_product_by_barcode(barcode)


@router.get("/search")
def search_products(identifier: str, identifier_type: str):
    return product_service.search_products(identifier, identifier_type)


@router.get("/{product_code}")
def get_product_by_id(product_code: str):
    return product_service.get_product_by_product_code(product_code)


# This method is not called from the front end. These are supposed to be called by the Postman or another similar tool
# that allow you to make calls to the REST API.
# Getting the latest product prices from SQUIZZ platform and updating the table in the local database
@router.get("/retrieve-products")
def retrieve_products():
    return product_service.retrieve_products()


# This method is not called from the front end. These are supposed to be called by the Postman or another similar tool
# that allow you to make calls to the REST API.
# Getting the latest product prices from SQUIZZ platform and updating the table in the local database
@router.get("/retrieve-prices")
def retrieve_prices():
    return product_service.retrieve_prices()


# This method is not called from the front end. These are supposed to be called by the Postman or another similar tool
# that allow you to make calls to the REST API.
# Getting the product update from SQUIZZ platform and updating the table in the local database
@router.get("/update-products")
def update_products():
    return product_service.update_products()


# This method is not called from the front end. These are supposed to be called by the Postman or another similar tool
# that allow you to make calls to the REST API.
# Getting the latest product prices from SQUIZZ platform and updating the table in the local database
@router.get("/update-product-prices")
def update_product_price():
    return product_service.update_prices()


@router.post("/threedmodel/import")
async def import_threedmodel(request: Request):
    data = await request.json()
    return product_service.import_threedmodel(data)


@router.get("/{product_code}/metadata/get")
def get_metadata_by_product_code(product_code: str):
    return product_service.get_metadata_by_product_code(product_code)


@router.post("/metadata/import")
async def import_metadata(request: Request):
    data = await request.json()
    return product_service.import_metadata(data)


@router.get("/update-categories")
def update_product_categories():
    return product_service.restore_category()


@router.get("")
def list_products_with_pagination(category_id: Optional[int] = None, page: Optional[int] = 1):
    result = product_service.list_all_products(category_id, page)
    result['items'] = [prod.basic_dict() for prod in result['items']]
    return result
