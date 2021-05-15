from app.api.repository import category_repo
from sqlalchemy.orm import Session

from app.api import models, schemas


def get_all_categories(db: Session):
    return category_repo.get_all_categories(db=db)
