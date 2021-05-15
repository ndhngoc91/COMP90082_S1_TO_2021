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


def delete_user_group(user_group_id: int, db: Session):
    user_group_to_delete = db.query(models.UserGroup).filter(models.UserGroup.id == user_group_id)
    if not user_group_to_delete:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"data with id {user_group_id} not found, delete failure")

    user_group_to_delete.delete(synchronize_session=False)
    db.commit()


def update_user_group(user_group_id: int, request: schemas.UserGroup, db: Session):
    request_dict = dict(request)
    user_group_to_update = db.query(models.UserGroup).filter(models.UserGroup.id == user_group_id)
    if not user_group_to_update.first():
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"data with id {address_id} not found")

    user_group_to_update.update(request_dict)
    db.commit()
