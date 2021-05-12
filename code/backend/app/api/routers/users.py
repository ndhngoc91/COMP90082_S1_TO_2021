from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from starlette import status

from app.api import database, schemas
from app.api.service import user_service
from app.api.repository import user_repo

router = APIRouter(
    prefix="/users",
    tags=["Users"]
)

get_db = database.get_db


@router.get("")
def get_all_users(db: Session = Depends(get_db)):
    return user_service.get_all(db=db)


@router.get("/{user_id}", response_model=schemas.UserWithAddresses)
def get_user_by_id(user_id: int, db: Session = Depends(get_db)):
    return user_service.get_user_by_id(user_id=user_id, db=db).__dict__


@router.post("", status_code=status.HTTP_201_CREATED)
def create_user(request: schemas.UserWithAddresses, db: Session = Depends(get_db)):
    return user_service.create_user(request=request, db=db)


@router.put("/{user_id}", status_code=status.HTTP_202_ACCEPTED)
def update_user(user_id: int, request: schemas.UserWithEditableFields, db: Session = Depends(get_db)):
    return user_service.put(user_id=user_id, request=request, db=db)
