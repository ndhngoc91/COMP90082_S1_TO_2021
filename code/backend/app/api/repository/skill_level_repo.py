from sqlalchemy.orm import Session
from app.api import models, schemas


def get_all_skill_levels(db: Session):
    return db.query(models.SkillLevel).all()
