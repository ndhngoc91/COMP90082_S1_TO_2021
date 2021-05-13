import datetime
import json
from typing import Optional
from fastapi import HTTPException
from starlette import status
from sqlalchemy.orm import Session
from app.api import token, schemas
from app.api.repository import user_group_repo
from app.api.util import auth_util

import logging

logger = logging.getLogger(__name__)
logging.basicConfig(level=logging.DEBUG)


def get_all_user_groups(db: Session):
    return user_group_repo.get_all_user_groups(db=db)


def get_user_groups_by_user_id(user_id: int, db: Session):
    return user_group_repo.get_user_groups_by_user_id(user_id=user_id, db=db)


def create_new_user_group(request: schemas.UserGroup, db: Session):
    return user_group_repo.create_user_group(request=request, db=db)


def delete_user_group(user_group_id: int, db: Session):
    return user_group_repo.delete_user_group(user_group_id=user_group_id, db=db)
