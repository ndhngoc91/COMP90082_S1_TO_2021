from typing import Optional

from fastapi import APIRouter

from api.service import product_service

router = APIRouter(
    prefix="/products",
    tags=["Products"]
)


@router.get("")
def list_products_with_pagination(category_id: Optional[int] = None, page: Optional[int] = 1):
    result = product_service.list_all_products(category_id, page)
    result['items'] = [prod.basic_dict() for prod in result['items']]
    return result


@router.get("/barcode")
def get_barcode_product(barcode: str):
    return product_service.get_product_by_barcode(barcode)


@router.get("/search")
def search_products(identifier: str, identifier_type: str):
    return product_service.search_products(identifier, identifier_type)


@router.get("/{product_code}")
def get_product_by_id(product_code: str):
    return product_service.get_product_by_product_code(product_code)


@router.get("/{product_code}/metadata/get")
def get_metadata_by_product_code(product_code: str):
    return product_service.get_metadata_by_product_code(product_code)
