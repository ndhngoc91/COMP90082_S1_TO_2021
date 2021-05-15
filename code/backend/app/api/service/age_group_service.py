from app.api.repository import age_group_repo
from sqlalchemy.orm import Session

from app.api import models, schemas


def get_all_age_groups(db: Session):
    return age_group_repo.get_all_age_groups(db=db)
