from fastapi import APIRouter, Depends, Request

from app import schemas
from app.oauth2 import get_current_user
from app.service import product_service

router = APIRouter(
    prefix="/squizz",
    tags=["Squizz"]
)


# This method is not called from the front end. These are supposed to be called by the Postman or another similar tool
# that allow you to make calls to the REST API.
# Getting the latest product prices from SQUIZZ platform and updating the table in the local database
@router.get("/retrieve-products")
def retrieve_products(current_user: schemas.TokenData = Depends(get_current_user)):
    return product_service.retrieve_products(current_user.org_id)


# This method is not called from the front end. These are supposed to be called by the Postman or another similar tool
# that allow you to make calls to the REST API.
# Getting the latest product prices from SQUIZZ platform and updating the table in the local database
@router.get("/retrieve-prices")
def retrieve_prices(current_user: schemas.TokenData = Depends(get_current_user)):
    return product_service.retrieve_prices(current_user.org_id)


# This method is not called from the front end. These are supposed to be called by the Postman or another similar tool
# that allow you to make calls to the REST API.
# Getting the product update from SQUIZZ platform and updating the table in the local database
@router.get("/update-products")
def update_products(current_user: schemas.TokenData = Depends(get_current_user)):
    return product_service.update_products(current_user.org_id)


# This method is not called from the front end. These are supposed to be called by the Postman or another similar tool
# that allow you to make calls to the REST API.
# Getting the latest product prices from SQUIZZ platform and updating the table in the local database
@router.get("/update-product-prices")
def update_product_price(current_user: schemas.TokenData = Depends(get_current_user)):
    return product_service.update_prices(current_user.org_id)


@router.post("/threedmodel/import")
async def import_threedmodel(request: Request):
    data = await request.json()
    return product_service.import_threedmodel(data)


@router.post("/metadata/import")
async def import_metadata(request: Request):
    data = await request.json()
    return product_service.import_metadata(data)


@router.get("/update-categories")
def update_product_categories(current_user: schemas.TokenData = Depends(get_current_user)):
    return product_service.restore_category(current_user.org_id)

