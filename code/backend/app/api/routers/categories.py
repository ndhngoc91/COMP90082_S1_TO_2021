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
def get_all_categories():
    return category_service.get_all_categories()


@router.post("")
async def list_category_details(days: int, category_id: int):
    details = category_service.list_category_details(days, category_id)
    return details