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
