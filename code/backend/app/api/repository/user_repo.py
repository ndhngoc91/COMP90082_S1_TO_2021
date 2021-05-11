from fastapi import HTTPException
from sqlalchemy.orm import Session
from app.api import models, schemas, hashing


def get_all(db: Session):
    return db.query(models.User).all()


def authenticate(username: str, password: str, db: Session):
    return db.query(models.User.username, models.User.id, models.User.organization_id,
                    models.Organization.organization_id.label("organization_str_id")).join(models.Organization) \
        .filter(models.User.username == username and models.User.password == password).first()


def check_username(username: str, db: Session):
    new_username = db.query(models.User).filter(models.User.username == username).first()
    if new_username:
        return True
    return False


def create_user(request: schemas.UserCreate, db: Session):
    new_user = models.User(username=request.username,
                           password=hashing.get_password_hash(request.password),
                           email=request.email,
                           birthday=request.birthday,
                           phone=request.phone,
                           gender=request.gender,
                           user_type_id=db.query(models.UserType.id).filter(models.UserType.type == request.user_type))

    new_address = models.Address(address_line=request.address_line, state=request.state, city=request.city,
                                 postcode=request.postcode, user_id=new_user.id)

    new_user.address = [new_address]

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return new_user


def create_admin(request: schemas.AdminCreate, db: Session):
    new_admin = models.User(username=request.username, password=request.password, email=request.email,
                            user_type_id=db.query(models.UserType.id).filter(models.UserType.type == request.user_type))

    db.add(new_admin)
    db.commit()
    db.refresh(new_admin)

    return new_admin
