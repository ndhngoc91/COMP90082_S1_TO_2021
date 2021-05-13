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


def create_user_group(request: schemas.UserGroup, db: Session):
    new_user_group = models.UserGroup(
        name=request.name,
        contacts=request.contacts,
        user_id=request.user_id
    )
    db.add(new_user_group)
    db.commit()
    db.refresh(new_user_group)
    return new_user_group
