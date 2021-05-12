from sqlalchemy.orm import Session
from app.api import models, schemas


def get_all_categories(db: Session):
    return db.query(models.Category).all()
