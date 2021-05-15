from sqlalchemy.orm import Session
from app.api import models, schemas
from app.api.repository import skill_level_repo


def get_all_skill_levels(db: Session):
    return skill_level_repo.get_all_skill_levels(db=db)
