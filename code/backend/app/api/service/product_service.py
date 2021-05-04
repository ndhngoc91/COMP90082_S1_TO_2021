from app.api.repository import product_repo
from sqlalchemy.orm import Session

from app.api import models, schemas


def get_all(db: Session):
    return product_repo.get_all(db=db)


# deprecated
def sync_products_prices(org_id: str, customer_code: int):
    pass