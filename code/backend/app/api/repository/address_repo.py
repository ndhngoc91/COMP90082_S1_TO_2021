from typing import Optional
from sqlalchemy.orm import Session
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
