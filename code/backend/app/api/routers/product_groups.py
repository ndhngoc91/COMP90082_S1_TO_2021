from typing import Optional

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.api.service import product_group_service
from app.api.database import get_db

router = APIRouter(
    prefix="/product-groups",
    tags=["Product Groups"]
)


@router.get("")
def get_all_product_groups(db: Session = Depends(get_db)):
    return product_group_service.get_all(db=db)
