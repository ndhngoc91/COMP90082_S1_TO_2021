from sqlalchemy.orm import Session
from app.api import models, schemas


def get_all(db: Session):
    return db.query(models.User).all()


def authenticate(username: str, password: str, db: Session):
    return db.query(models.User.username, models.User.id, models.User.organization_id,
                    models.Organization.organization_id.label("organization_str_id")).join(models.Organization) \
        .filter(models.User.username == username and models.User.password == password).first()


def create_user(request: schemas.UserCreate, db: Session):
    new_user = models
