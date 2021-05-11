from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from starlette import status
from typing import Dict

from app.api import database, schemas
from app.api.repository import user_repo

router = APIRouter(
    prefix="/user",
    tags=["Users"]
)

get_db = database.get_db


'''
When I user the response_model, I got the following error:
pydantic.error_wrappers.ValidationError: 1 validation error for User
response
  value is not a valid dict (type=type_error.dict)
'''


# @router.post('/', response_model=schemas.User, status_code=status.HTTP_201_CREATED)
@router.post('/', status_code=status.HTTP_201_CREATED)
def create_user(request: schemas.UserCreate, db: Session = Depends(get_db)):
    return user_repo.create_user(request, db)


@router.post('/admin', status_code=status.HTTP_201_CREATED)
def create_user(request: schemas.UserCreate, db: Session = Depends(get_db)):
    return user_repo.create_admin(request, db)

