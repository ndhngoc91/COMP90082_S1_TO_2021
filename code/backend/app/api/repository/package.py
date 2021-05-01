from fastapi import HTTPException
from sqlalchemy.orm import Session
from starlette import status

from api import models, schemas


def get_all(db: Session):
    return db.query(models.Package).all()


def filter_packges(query: str, db: Session):
    return db.query(models.Package).filter(models.Package.name.like(f"%{query}%")).all()


def create(request: schemas.Package, db: Session):
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


def delete(package_id: int, db: Session):
    package_to_delete = db.query(models.Package).filter(models.Package.id == package_id)
    if not package_to_delete:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"data with id {package_id} not found, delete failure")

    package_to_delete.delete(synchronize_session=False)
    db.commit()


def put(package_id: int, request: schemas.Package, db: Session):
    package_to_update = db.query(models.Package).filter(models.Package.id == package_id)
    if not package_to_update.first():
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"data with id {package_id} not found")

    package_to_update.update(dict(request))
    db.commit()
