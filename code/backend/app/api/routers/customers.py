from fastapi import APIRouter, Depends, Request
from starlette import status
from sqlalchemy.orm import Session
from app.api import schemas
from app.api.oauth2 import get_current_user
from app.api.service import customer_service
from app.api.service.product_service import sync_products_prices
from app.api.database import get_db, engine

router = APIRouter(
    prefix="/customers",
    tags=["Customers"]
)


@router.get("")
def get_all_customers(db: Session = Depends(get_db)):
    return customer_service.get_all_customers(db=db)


@router.post("/switch-customer")
def switch_customer(customer_info: schemas.Customer, current_user: schemas.TokenData = Depends(get_current_user)):
    customer = customer_service.get_one_customer(customer_info.customer_id)
    sync_products_prices(org_id=current_user.org_id, customer_code=customer.customer_code)
    return {"message": "Switch customer successfully"}


@router.post("", status_code=status.HTTP_201_CREATED)
def create_customer(request: schemas.Customer, db: Session = Depends(get_db)):
    return customer_service.create_new_customer(request=request, db=db)


@router.get("/{customer_id}")
def get_one_customer(customer_id: int, db: Session = Depends(get_db)):
    return customer_service.get_one_customer(customer_id=customer_id, db=db)
