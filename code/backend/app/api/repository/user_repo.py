from typing import Optional
from fastapi import HTTPException
from sqlalchemy.orm import Session
from app.api import models, schemas, hashing


def get_all_users(db: Session):
    return db.query(models.User).all()


def get_user_by_id(user_id: int, db: Session):
    return db.query(models.User).filter(models.User.id == user_id).first()


def filter_users(query: Optional[str], db: Session):
    return db.query(models.User).filter(models.User.username.like(f"%{query}%")).all()


def authenticate(username: str, password: str, db: Session):
    query = db.query(models.User)
    query.filter(models.User.username == username)
    query.filter(models.User.password == password)
    return query.first()


def create_new_user(request: schemas.UserWithAddresses, db: Session):
    new_user = models.User(username=request.username,
                           height=request.height,
                           weight=request.weight,
                           foot_size=request.foot_size,
                           first_name=request.first_name,
                           last_name=request.last_name,
                           gender=request.gender,
                           birthday=request.birthday,
                           phone=request.phone,
                           din=request.din,
                           skill_level_id=request.skill_level_id,
                           user_type_id=request.user_type_id,
                           password=request.password)

    new_addresses = []
    for address in request.address_list:
        new_addresses.append(models.Address(state=address.state,
                                            city=address.city,
                                            postcode=address.postcode,
                                            address_line=address.address_line))
    new_user.addresses = new_addresses
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    new_user.addresses = new_addresses  # refresh the addresses field
    return new_user


def update_user(user_id: int, request: schemas.UserWithEditableFields, db: Session):
    user_to_update = db.query(models.User).filter(models.User.id == user_id)
    if not user_to_update.first():
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"data with id {user_id} not found")

    user_to_update.update(dict(request))
    db.commit()
