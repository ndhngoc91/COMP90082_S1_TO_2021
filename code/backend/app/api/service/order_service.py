from app.api import schemas
from sqlalchemy.orm import Session
from typing import Optional
from app.api.repository import order_repo


def get_all_orders(db: Session):
    return order_repo.get_all_orders(db=db)


def filter_orders(query: Optional[str], db: Session):
    return order_repo.filter_orders(query=query, db=db)


def cancel_order(order_id: int, db: Session):
    return order_repo.cancel_order(order_id=order_id, db=db)


def get_order_details(order_id: int, db: Session):
    return order_repo.get_order_details(order_id=order_id, db=db)


def create_new_order(order: schemas.Order, db: Session):
    return order_repo.create_new_order(order=order, db=db)
