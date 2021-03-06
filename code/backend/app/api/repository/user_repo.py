from typing import Optional

from fastapi import HTTPException
from sqlalchemy import or_
from sqlalchemy.orm import Session
from starlette import status

from app.api import models, schemas
from app.api.hashing import get_password_hash, verify_password


def get_all_users(db: Session):
    return db.query(models.User).all()


def get_user_by_id(user_id: int, db: Session):
    return db.query(models.User).filter(models.User.id == user_id).first()


def get_user_by_username(username: str, db: Session):
    return db.query(models.User).filter(models.User.username == username).first()


def filter_users(query: Optional[str], db: Session):
    return db.query(models.User).filter(or_(models.User.username.like(f"%{query}%"),
                                            models.User.email.like(f"%{query}%"))).all()


def authenticate(username: str, password: str, db: Session):
    user = get_user_by_username(username, db)
    if not user:
        return None
    if not verify_password(password, user.password):
        return None
    return user


def is_enable(username: str, db: Session):
    query = db.query(models.User.is_enabled)
    query = query.filter(models.User.username == username)
    query = query.filter(models.User.is_enabled == 1)
    return query.first()


def create_new_user(request: schemas.UserWithAddresses, db: Session):
    is_username_exist = db.query(models.User).filter(models.User.username == request.username).first()
    if is_username_exist:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT,
                            detail="Username already exists")

    is_email_exist = db.query(models.User).filter(models.User.email == request.email).first()
    if is_email_exist:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT,
                            detail="Email already exists")

    new_user = models.User(username=request.username,
                           height=request.height,
                           weight=request.weight,
                           foot_size=request.foot_size,
                           first_name=request.first_name,
                           last_name=request.last_name,
                           gender=request.gender,
                           birthday=request.birthday,
                           phone=request.phone,
                           email=request.email,
                           din=request.din,
                           skill_level_id=request.skill_level_id,
                           user_type_id=request.user_type_id,
                           password=get_password_hash(request.password))

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


def update_user(user_id: int, request: schemas.UserWithoutPassword, db: Session):
    user_to_update = db.query(models.User).filter(models.User.id == user_id)
    if not user_to_update.first():
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"data with id {user_id} not found")

    user_to_update.update(dict(request))
    db.commit()
