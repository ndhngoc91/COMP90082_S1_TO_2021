from sqlalchemy.orm import Session
from app.api import models, schemas


def get_all_orders(db: Session):
    return db.query(models.Order).all()
