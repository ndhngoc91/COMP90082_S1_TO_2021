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


@router.post("", status_code=status.HTTP_201_CREATED)
def create_user(request: schemas.UserCreate, db: Session = Depends(get_db)):
    return user_service.create_user(request, db)


@router.post("/admin", status_code=status.HTTP_201_CREATED)
def create_admin(request: schemas.AdminCreate, db: Session = Depends(get_db)):
    return user_service.create_admin(request, db)
