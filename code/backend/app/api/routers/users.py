from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from starlette import status
from typing import List

from app.api import database, schemas
from app.api.repository import user_repo

router = APIRouter(
    prefix="/user",
    tags=["Users"]
)

get_db = database.get_db


@router.post('/', response_model=List[schemas.User], status_code=status.HTTP_201_CREATED)
def create_user(request: schemas.UserCreate, db: Session = Depends(get_db)):
    return user_repo.create_user(request, db)

