from sqlalchemy.orm import Session
from app.api import models, schemas
from app.api.repository import package_repo


def get_all(db: Session):
    return package_repo.get_all(db=db)


def filter_by_query(query: str, db: Session):
    return package_repo.filter_by_query(query=query, db=db)


def create(request: schemas.Package, db: Session):
    return package_repo.create(request=request, db=db)


def delete(package_id: int, db: Session):
    return package_repo.delete(package_id=package_id, db=db)


def put(package_id: int, request: schemas.Package, db: Session):
    return package_repo.put(package_id=package_id, request=request, db=db)
