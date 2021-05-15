from sqlalchemy.orm import Session
from app.api import models, schemas


def create_new_session(request: schemas.Session, db: Session):
    new_session = models.Session(
        session_id=request.session_id,
        date=request.date,
        user_id=request.user_id,
        organization_id=request.organization_id
    )
    db.add(new_session)
    db.commit()
    db.refresh(new_session)
    return new_session
