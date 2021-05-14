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


@router.post("", status_code=status.HTTP_201_CREATED)
def create_new_address(request: schemas.Address, db: Session = Depends(get_db)):
    return address_service.create_new_address(request=request, db=db)


@router.delete("/{address_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_address(address_id: int, db: Session = Depends(get_db)):
    address_service.delete_address(address_id=address_id, db=db)
    return f'id {address_id} data is deleted'


@router.put("/{address_id}", status_code=status.HTTP_202_ACCEPTED)
def update_package(address_id: int, request: schemas.Address, db: Session = Depends(get_db)):
    address_service.update_address(address_id=address_id, request=request, db=db)
    return 'UPDATED'
