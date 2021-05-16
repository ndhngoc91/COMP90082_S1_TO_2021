from typing import Optional
from sqlalchemy.orm import Session
from app.api import models, schemas
from app.api.repository import package_repo, product_group_repo


def get_trail_types_by_package_id(package_id: int, db: Session):
    sql_query = db.query(models.TrailType.id, models.TrailType.name)
    sql_query = sql_query.join(models.PackageTtypesPair)
    sql_query = sql_query.filter(models.PackageTtypesPair.package_id == package_id)
    return sql_query.all()

