from sqlalchemy.orm import Session
from app.api import models, schemas


def create(request: schemas.Session, db: Session):
    new_package = models.Session(
        session_id=request.session_id,
        date=request.date,
        user_id=request.user_id,
        organization_id=request.organization_id
    )
    db.add(new_package)
    db.commit()
    db.refresh(new_package)
    return new_package
