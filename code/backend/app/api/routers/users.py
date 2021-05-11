from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from starlette import status

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


# @router.get('/', status_code=status.HTTP_200_OK)
# def check_username(request: schemas.Username, db: Session = Depends(get_db)):
#     return user_repo.check_username(request, db)


# @router.post('/', response_model=schemas.User, status_code=status.HTTP_201_CREATED)
@router.post('/', status_code=status.HTTP_201_CREATED)
def create_user(request: schemas.UserCreate, db: Session = Depends(get_db)):
    new_user = user_repo.create_user(request, db)
    return new_user.__dict__


# @router.post('/admin', response_model=schemas.Admin, status_code=status.HTTP_201_CREATED)
@router.post('/admin', status_code=status.HTTP_201_CREATED)
def create_admin(request: schemas.AdminCreate, db: Session = Depends(get_db)):
    new_admin = user_repo.create_admin(request, db)
    return new_admin.__dict__

