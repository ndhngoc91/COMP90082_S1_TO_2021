from typing import Optional

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.api.service import product_service
from app.api.database import get_db

router = APIRouter(
    prefix="/products",
    tags=["Products"]
)


@router.get("")
def get_all_products(db: Session = Depends(get_db)):
    return product_service.get_all(db=db)
