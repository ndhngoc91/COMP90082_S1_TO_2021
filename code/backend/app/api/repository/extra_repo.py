from typing import Optional
from sqlalchemy.orm import Session
from app.api import models, schemas


def get_extra_products_by_age_group_id(age_group_id: int, db: Session):
    return db.query(models.Extra.id, models.Extra.name, models.Extra.base_price,
                    models.Extra.price_levels).filter(models.Extra.age_group_id == age_group_id).all()
