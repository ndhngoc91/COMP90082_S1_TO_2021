from fastapi import APIRouter, Depends

from app import schemas
from app.oauth2 import get_current_user
from app.service import order_service

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


@router.post("/")
def submit_order():
    return "submit_order"
