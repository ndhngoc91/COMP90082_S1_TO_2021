from typing import Optional, List
from sqlalchemy.orm import Session
from app.api import models, schemas
from app.api.repository import product_group_repo


def get_all_product_groups(db: Session):
    return product_group_repo.get_all_product_groups(db=db)
