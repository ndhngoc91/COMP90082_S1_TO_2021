from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from starlette import status
from typing import Optional
from app.api import database, schemas
from app.api.service import address_service

router = APIRouter(
    prefix="/addresses",
    tags=["Addresses"]
)

get_db = database.get_db


@router.get("")
def get_addresses_by_user_id(user_id: Optional[int] = None, db: Session = Depends(get_db)):
    if user_id is not None:
        return address_service.get_addresses_by_user_id(user_id=user_id, db=db)
    return address_service.get_all_addresses(db=db)
