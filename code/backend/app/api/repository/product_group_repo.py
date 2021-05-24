from typing import List
from sqlalchemy import func
from sqlalchemy.orm import Session
from app.api import models, schemas


def get_all_product_groups(db: Session):
    return db.query(models.ProductGroup).all()


def get_all_product_group_names(db: Session):
    return db.query(models.ProductGroup.name).all()


def get_product_groups_by_ids(ids: List[int], db: Session):
    return db.query(models.ProductGroup).filter(models.ProductGroup.id.in_(ids)).all()


def get_product_groups_of_package(package_id: int, db: Session):
    query = db.query(models.ProductGroup.id, models.ProductGroup.name)
    query = query.join(models.PackageProductGroup)
    query = query.filter(models.PackageProductGroup.package_id == package_id)
    return query.all()


def get_product_groups_of_many_packages(package_ids: List[int], db: Session):
    query = db.query(models.ProductGroup.id, models.ProductGroup.name, func.count(models.ProductGroup.id).label("number_of_products"))
    query = query.join(models.PackageProductGroup)
    query = query.filter(models.PackageProductGroup.package_id.in_(package_ids))
    query = query.group_by(models.ProductGroup.id)
    return query.all()
