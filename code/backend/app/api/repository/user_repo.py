from sqlalchemy.orm import Session
from app.api import models, schemas


def get_all(db: Session):
    return db.query(models.User).all()


def authenticate(username: str, password: str, db: Session):
    return db.query(models.User.username, models.User.id, models.User.organization_id,
                    models.Organization.organization_id.label("organization_str_id")).join(models.Organization) \
        .filter(models.User.username == username and models.User.password == password).first()


def create_user(request: schemas.UserCreate, db: Session):
    new_user = models.User(username=request.username, password=request.password, email=request.email,
                           birthday=request.birthday, phone=request.phone, gender=request.gender,
                           first_name=request.first_name, last_name=request.last_name)
    new_address = models.Address(address_line=request.address_line, state=request.state, city=request.city,
                                 postcode=request.postcode, user_id=new_user.id)

    new_user.address = [new_address]
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user


def create_admin(request: schemas.UserCreate, db: Session):
    new_admin = models.User(username=request.username, password=request.password, email=request.email)

    db.add(new_admin)
    db.commit()
    db.refresh(new_admin)
    return new_admin


