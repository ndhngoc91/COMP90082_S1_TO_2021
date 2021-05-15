from sqlalchemy.orm import Session
from app.api.repository import order_repo
from app.api.resource.order_resource import OrderResource


def get_all_orders(db: Session):
    return order_repo.get_all_orders(db=db)


def create_order(packages):
    return OrderResource().create_order(packages)
