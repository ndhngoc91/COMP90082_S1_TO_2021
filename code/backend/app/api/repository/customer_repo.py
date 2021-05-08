from sqlalchemy.orm import Session
from app.api import models, schemas


def get_all(db: Session):
    return db.query(models.Customer).all()


def get_one_by_id(customer_id: int, db: Session):
    return db.query(models.Customer).filter(models.Customer.id == customer_id).one()


def create(request: schemas.Customer, db: Session):
    new_package = models.Customer(
        customer_code=request.customer_code,
        title=request.title,
        first_name=request.first_name,
        last_name=request.last_name,
        phone=request.phone,
        email=request.email,
        organization_desc=request.organization_desc,
        nationality_code=request.nationality_code
    )
    db.add(new_package)
    db.commit()
    db.refresh(new_package)
    return new_package
