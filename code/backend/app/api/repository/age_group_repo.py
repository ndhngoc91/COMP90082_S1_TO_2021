from sqlalchemy.orm import Session
from app.api import models, schemas


def get_all_age_groups(db: Session):
    return db.query(models.AgeGroup).all()
