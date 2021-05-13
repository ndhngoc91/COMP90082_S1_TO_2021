from typing import Optional
from sqlalchemy.orm import Session
from app.api import models, schemas


def get_all_addresses(db: Session):
    return db.query(models.Address).all()


def get_addresses_by_user_id(user_id: int, db: Session):
    query = db.query(models.Address)
    query = query.filter(models.Address.user_id == user_id)
    return query.all()
