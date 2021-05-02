from fastapi import APIRouter, Depends
from starlette import status

from app.api import schemas
from app.api.oauth2 import get_current_user
from app.api.service import order_service

router = APIRouter(
    prefix="/orders",
    tags=["Orders"]
)


@router.get("")
def retrieve_order_history(current_user: schemas.TokenData = Depends(get_current_user)):
    return order_service.get_order_history(current_user.session_id)


@router.get("/{order_id}")
def get_order(order_id: int):
    return order_service.get_order(order_id)


@router.post("/", status_code=status.HTTP_201_CREATED)
def submit_order(order: schemas.Order, current_user: schemas.TokenData = Depends(get_current_user)):
    return order_service.save_order(
        current_user.session_id,
        order.customer_id,
        order.delivery_addr_id,
        order.billing_addr_id,
        order.lines,
        order.instruction
    )
