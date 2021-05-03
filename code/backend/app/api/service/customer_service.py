from sqlalchemy.orm import Session
from app.api import models, schemas
from app.api.repository import customer_repo


def get_all_customers(db: Session):
    return customer_repo.get_all(db=db)


def get_one_customer(customer_id, db: Session):
    return customer_repo.get_one_by_id(customer_id=customer_id, db=db)


def create_new_customer(request: schemas.Customer, db: Session):
    return customer_repo.create(request=request, db=db)
