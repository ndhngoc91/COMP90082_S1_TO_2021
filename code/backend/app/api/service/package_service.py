from typing import Optional
from sqlalchemy.orm import Session
from app.api import models, schemas
from app.api.repository import package_repo, trail_type_repo, product_group_repo


def get_all_packages(db: Session):
    packages = package_repo.get_all_packages(db=db)
    for package in packages:
        package.trail_types = trail_type_repo.get_trail_types_by_package_id(package_id=package.id, db=db)
    return packages


def get_package(package_id: int, db: Session):
    package = package_repo.get_package(package_id=package_id, db=db)
    if package is not None:
        package.trail_types = trail_type_repo.get_trail_types_by_package_id(package_id=package_id, db=db)
    return package


def filter_packages(query: Optional[str],
                    category_id: Optional[int],
                    skill_level_id: Optional[int],
                    age_group_id: Optional[int],
                    db: Session):
    return package_repo.filter_packages(query=query,
                                        category_id=category_id,
                                        skill_level_id=skill_level_id,
                                        age_group_id=age_group_id,
                                        db=db)


def create_new_package(request: schemas.Package, db: Session):
    return package_repo.create_new_package(request=request, db=db)


def delete_package(package_id: int, db: Session):
    return package_repo.delete_package(package_id=package_id, db=db)


def update_package(package_id: int, request: schemas.Package, db: Session):
    return package_repo.update_package(package_id=package_id, request=request, db=db)
