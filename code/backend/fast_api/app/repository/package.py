from sqlalchemy.orm import Session

from app import models


def get_all(db: Session):
    return db.query(models.Package).all()