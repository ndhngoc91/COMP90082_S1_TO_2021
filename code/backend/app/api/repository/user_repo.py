from fastapi import HTTPException
from sqlalchemy.orm import Session
from app.api import models, schemas, hashing


def get_all(db: Session):
    return db.query(models.User).all()


def get_one_by_id(user_id: int, db: Session):
    return db.query(models.User).filter(models.User.id == user_id).first()


def authenticate(username: str, password: str, db: Session):
    return db.query(models.User.username, models.User.id, models.User.organization_id,
                    models.Organization.organization_id.label("organization_str_id")).join(models.Organization) \
        .filter(models.User.username == username and models.User.password == password).first()


def check_username(username: str, db: Session):
    new_username = db.query(models.User).filter(models.User.username == username).first()
    if new_username:
        return True
    return False


def create_user(request: schemas.UserWithAddresses, db: Session):
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


def put(user_id: int, request: schemas.UserWithoutPassword, db: Session):
    user_to_update = db.query(models.User).filter(models.User.id == user_id)
    if not user_to_update.first():
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"data with id {user_id} not found")

    user_to_update.update(dict(request))
    db.commit()
