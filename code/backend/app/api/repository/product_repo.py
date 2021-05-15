from sqlalchemy.orm import Session
from app.api import models, schemas


def get_all_products(db: Session):
    return db.query(models.Product).all()
