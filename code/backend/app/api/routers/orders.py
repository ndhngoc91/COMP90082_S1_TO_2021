from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from starlette import status
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
