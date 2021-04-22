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


@router.post("", status_code=status.HTTP_201_CREATED)
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


@router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_package(id, db: Session = Depends(get_db)):
    package_to_delete = db.query(models.Package).filter(models.Package.id == id)
    if not package_to_delete:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"data with id {id} not found, delete failure")

    package_to_delete.delete(synchronize_session=False)
    db.commit()
    return f'id {id} data is deleted'


@router.delete("", status_code=status.HTTP_204_NO_CONTENT)
def delete_package(db: Session = Depends(get_db)):
    db.query(models.Package).delete()
    db.commit()
    return 'all data being deleted'


@router.put("")
def update_package(db: Session = Depends(get_db)):
    pass
