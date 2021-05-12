from typing import List
from sqlalchemy.orm import Session
from app.api import models, schemas


def get_all_product_groups(db: Session):
    return db.query(models.ProductGroup).all()


def get_product_groups_by_ids(ids: List[int], db: Session):
    return db.query(models.ProductGroup).filter(models.ProductGroup.id.in_(ids)).all()
