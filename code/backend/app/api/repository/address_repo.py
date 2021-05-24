from typing import Optional

from fastapi import HTTPException
from sqlalchemy.orm import Session
from starlette import status

from app.api import models, schemas


def get_all_addresses(db: Session):
    return db.query(models.Address).all()


def get_addresses_by_user_id(user_id: int, db: Session):
    query = db.query(models.Address)
    query = query.filter(models.Address.user_id == user_id)
    return query.all()


def create_new_address(request: schemas.Address, db: Session):
    new_address = models.Address(
        state=request.state,
        city=request.city,
        postcode=request.postcode,
        address_line=request.address_line,
        user_id=request.user_id,
        order_id=request.order_id
    )
    db.add(new_address)
    db.commit()
    db.refresh(new_address)
    return new_address


def delete_address(address_id: int, db: Session):
    address_to_delete = db.query(models.Address).filter(models.Address.id == address_id)
    if not address_to_delete:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"data with id {address_id} not found, delete failure")

    address_to_delete.delete(synchronize_session=False)
    db.commit()


def update_address(address_id: int, request: schemas.Address, db: Session):
    request_dict = dict(request)
    address_to_update = db.query(models.Address).filter(models.Address.id == address_id)
    if not address_to_update.first():
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"data with id {address_id} not found")

    address_to_update.update(request_dict)
    db.commit()
