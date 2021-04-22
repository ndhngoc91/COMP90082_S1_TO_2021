from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db, engine
from app.repository import package
from .. import models, schemas

models.Base.metadata.create_all(bind=engine)


router = APIRouter(
    prefix="/packages",
    tags=["Packages"]
)


@router.get("")
def list_all_packages(db: Session = Depends(get_db)):
    return package.get_all(db=db)


@router.post("", status_code=201)
def create_package(request: schemas.Package, db: Session = Depends(get_db)):

    new_package = models.Package(
        name=request.name,
        description=request.description,
        what_is_included=request.what_is_included,
        available=request.available
    )
    db.add(new_package)
    db.commit()
    db.refresh(new_package)
    return new_package



    # TODO: 1. define a request body for the api
    # TODO: 2. write an add function in the package repository
    # TODO: 3. call that function in the package repository
    # TODO: 4. return 201 if successful



@router.put("")
def update_package(db: Session = Depends(get_db)):
    pass


@router.delete("")
def delete_package(db: Session = Depends(get_db)):
    pass
