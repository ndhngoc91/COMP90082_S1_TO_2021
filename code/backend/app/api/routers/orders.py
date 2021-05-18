from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from starlette import status
from typing import Optional
from app.api import schemas
from app.api.oauth2 import get_current_user
from app.api.database import get_db, engine
from app.api.service import order_service

router = APIRouter(
    prefix="/orders",
    tags=["Orders"]
)


@router.get("")
def get_all_orders(db: Session = Depends(get_db)):
    return order_service.get_all_orders(db)


@router.get("/filter")
def filter_orders(query: Optional[str] = "", db: Session = Depends(get_db)):
    return order_service.filter_orders(query=query, db=db)


@router.get("/order-details/{order_id}")
def get_order_details(order_id: int = None, db: Session = Depends(get_db)):
    if order_id == None:
        return None
    return order_service.get_order_details(order_id=order_id, db=db)


@router.put("/cancel/{order_id}", status_code=status.HTTP_202_ACCEPTED)
def filter_orders(order_id: int = None, db: Session = Depends(get_db)):
    if order_id == None:
        return None
    return order_service.cancel_order(order_id=order_id, db=db)


@router.post("/hiring", status_code=status.HTTP_201_CREATED)
def submit_order(orders: schemas.Order):
    return order_service.create_order(orders.packages)
