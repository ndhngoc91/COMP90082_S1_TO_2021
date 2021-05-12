from typing import Optional
from fastapi import HTTPException
from sqlalchemy.orm import Session
from app.api import models, schemas, hashing


def get_all_user_groups(db: Session):
    return db.query(models.UserGroup).all()


def get_user_groups_by_user_id(user_id: int, db: Session):
    query = db.query(models.UserGroup)
    query = query.filter(models.UserGroup.user_id == user_id)
    return query.all()
