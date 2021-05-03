from app.api.repository import skill_level_repo
from sqlalchemy.orm import Session

from app.api import models, schemas


def get_all(db: Session):
    return skill_level_repo.get_all(db=db)