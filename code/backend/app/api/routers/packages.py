from typing import Optional

from fastapi import APIRouter, Depends, status, HTTPException
from sqlalchemy.orm import Session

from app.api.database import get_db, engine
from app.api.service import package_service
from app.api import models, schemas

router = APIRouter(
    prefix="/packages",
    tags=["Packages"]
)


@router.get("")
def get_all_packages(db: Session = Depends(get_db)):
    return package_service.get_all_packages(db=db)


@router.get("/{package_id}")
def get_package(package_id: int, db: Session = Depends(get_db)):
    return package_service.get_package(package_id=package_id, db=db)


@router.get("/filter")
def filter_packages(query: Optional[str] = "",
                    category_id: Optional[int] = None,
                    skill_level_id: Optional[int] = None,
                    age_group_id: Optional[int] = None,
                    db: Session = Depends(get_db)):
    return package_service.filter_packages(query=query,
                                           category_id=category_id,
                                           skill_level_id=skill_level_id,
                                           age_group_id=age_group_id,
                                           db=db)


@router.post("", status_code=status.HTTP_201_CREATED)
def create_new_package(request: schemas.Package, db: Session = Depends(get_db)):
    return package_service.create_new_package(request=request, db=db)


@router.delete("/{package_id}", status_code=status.HTTP_204_NO_CONTENT)  # delete by id
def delete_package(package_id: int, db: Session = Depends(get_db)):
    package_service.delete_package(package_id=package_id, db=db)
    return f'id {package_id} data is deleted'


@router.put("/{package_id}", status_code=status.HTTP_202_ACCEPTED)  # update the db by id
def update_package(package_id: int, request: schemas.Package, db: Session = Depends(get_db)):
    package_service.update_package(package_id=package_id, request=request, db=db)
    return 'UPDATED'
