from fastapi import APIRouter

from app.service import order_service

router = APIRouter(
    prefix="/orders",
    tags=["Orders"]
)


@router.get("")
def retrieve_order_history(session_id: str):
    return order_service.get_order_history(session_id)


@router.get("/{order_id}")
def get_order(order_id: int):
    return order_service.get_order(order_id)


@router.post("/")
def submit_order():
    return "submit_order"
