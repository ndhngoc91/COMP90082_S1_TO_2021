from typing import Optional
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.api.service import product_service
from app.api.database import get_db
from app.api import consts

router = APIRouter(
    prefix="/products",
    tags=["Products"]
)


@router.get("")
def get_all_products(db: Session = Depends(get_db)):
    return product_service.get_all_products(db=db)


@router.get("/filter")
def filter_products(query: Optional[str] = "", product_status: Optional[consts.ProductStatus] = None,
                    product_group_id: Optional[int] = None,
                    db: Session = Depends(get_db)):
    return product_service.filter_products(query=query, product_status=product_status,
                                           product_group_id=product_group_id, db=db)
