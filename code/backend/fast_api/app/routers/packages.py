from typing import Optional

from fastapi import APIRouter, Depends, status, HTTPException
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


@router.get("/filter")
def filter_packages(query: str, product_type: Optional[str] = None, db: Session = Depends(get_db)):
    return package.filter_packges(query=query, db=db)


@router.post("", status_code=status.HTTP_201_CREATED)
def create_package(request: schemas.Package, db: Session = Depends(get_db)):
    return package.create(request=request, db=db)


@router.delete("/{package_id}", status_code=status.HTTP_204_NO_CONTENT)  # delete by id
def delete_package(package_id: int, db: Session = Depends(get_db)):
    package.delete(package_id=package_id, db=db)
    return f'id {package_id} data is deleted'


@router.put("/{package_id}", status_code=status.HTTP_202_ACCEPTED)  # update the db by id
def update(package_id: int, request: schemas.Package, db: Session = Depends(get_db)):
    package.put(package_id=package_id, request=request, db=db)
    return 'UPDATED'
