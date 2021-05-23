from typing import Optional

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.api.service import category_service
from app.api.database import get_db

router = APIRouter(
    prefix="/categories",
    tags=["Categories"]
)


@router.get("")
def get_all_categories(db: Session = Depends(get_db)):
    return category_service.get_all_categories(db=db)
