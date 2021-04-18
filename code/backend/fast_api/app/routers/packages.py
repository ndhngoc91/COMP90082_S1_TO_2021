from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.repository import package

router = APIRouter(
    prefix="/packages",
    tags=["Packages"]
)


@router.get("")
def list_all_packages(db: Session = Depends(get_db)):
    return package.get_all(db=db)


@router.post("")
def create_package(db: Session = Depends(get_db)):
    # TODO: 1. define a request body for the api
    # TODO: 2. write an add function in the package repository
    # TODO: 3. call that function in the package repository
    # TODO: 4. return 201 if successful
    pass


@router.put("")
def update_package(db: Session = Depends(get_db)):
    pass


@router.delete("")
def delete_package(db: Session = Depends(get_db)):
    pass
