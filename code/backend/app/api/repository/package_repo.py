from typing import Optional
from sqlalchemy import and_
from sqlalchemy.orm import Session
from starlette import status
from fastapi import HTTPException
from app.api import models, schemas
from app.api.repository import product_group_repo


def get_all(db: Session):
    return db.query(models.Package).all()


def filter_by_query(query: Optional[str],
                    category_id: Optional[int],
                    skill_level_id: Optional[int],
                    age_group_id: Optional[int],
                    db: Session):
    sql_query = db.query(models.Package.id, models.Package.name,
                         models.AgeGroup.name.label("age_group"),
                         models.Category.name.label("category"),
                         models.SkillLevel.name.label("skill_level"),
                         models.Package.description)
    sql_query = sql_query.join(models.AgeGroup)
    sql_query = sql_query.join(models.Category)
    sql_query = sql_query.join(models.SkillLevel)
    if query is not None:
        sql_query = sql_query.filter(models.Package.name.like(f"%{query}%"))
    if category_id is not None:
        sql_query = sql_query.filter(models.Package.category_id == category_id)
    if skill_level_id is not None:
        sql_query = sql_query.filter(models.Package.skill_level_id == skill_level_id)
    if age_group_id is not None:
        sql_query = sql_query.filter(models.Package.age_group_id == age_group_id)
    return sql_query.all()


def create(request: schemas.Package, db: Session):
    new_package = models.Package(
        name=request.name,
        description=request.description,
        category_id=request.category_id,
        age_group_id=request.age_group_id,
        skill_level_id=request.skill_level_id
    )
    product_groups = product_group_repo.get_by_ids(ids=request.product_group_ids, db=db)
    for product_group in product_groups:
        new_package.product_groups.append(product_group)
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
