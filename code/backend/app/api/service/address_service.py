from typing import Optional
from fastapi import HTTPException
from starlette import status
from sqlalchemy.orm import Session
from app.api import schemas
from app.api.repository import address_repo


def get_all_addresses(db: Session):
    return address_repo.get_all_addresses(db=db)


def get_addresses_by_user_id(user_id: int, db: Session):
    return address_repo.get_addresses_by_user_id(user_id=user_id, db=db)


def create_new_address(request: schemas.Address, db: Session):
    return address_repo.create_new_address(request=request, db=db)


def delete_address(address_id: int, db: Session):
    return address_repo.delete_address(address_id=address_id, db=db)
