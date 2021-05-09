from app.api.repository import product_group_repo
from sqlalchemy.orm import Session

from app.api import models, schemas


def get_all(db: Session):
    return product_group_repo.get_all(db=db)
