from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from starlette import status
from typing import Optional
from app.api import database, schemas
from app.api.service import user_group_service

router = APIRouter(
    prefix="/user-groups",
    tags=["User Groups"]
)

get_db = database.get_db


@router.get("")
def get_user_groups_by_user_id(user_id: Optional[int] = None, db: Session = Depends(get_db)):
    if user_id is not None:
        return user_group_service.get_user_groups_by_user_id(user_id=user_id, db=db)
    return user_group_service.get_all_user_groups(db=db)


@router.post("", status_code=status.HTTP_201_CREATED)
def create_new_user_group(request: schemas.UserGroup, db: Session = Depends(get_db)):
    return user_group_service.create_new_user_group(request=request, db=db)


@router.delete("/{user_group_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_user_group(user_group_id: int, db: Session = Depends(get_db)):
    user_group_service.delete_user_group(user_group_id=user_group_id, db=db)
    return f'id {user_group_id} data is deleted'


@router.put("/{user_group_id}", status_code=status.HTTP_202_ACCEPTED)
def update_user_group(user_group_id: int, request: schemas.UserGroup, db: Session = Depends(get_db)):
    return user_group_service.update_user_group(user_group_id=user_group_id, request=request, db=db)
