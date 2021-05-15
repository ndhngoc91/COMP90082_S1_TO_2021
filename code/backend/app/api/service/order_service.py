from sqlalchemy.orm import Session
from app.api.repository import order_repo


def get_all_orders(db: Session):
    return order_repo.get_all_orders(db=db)
