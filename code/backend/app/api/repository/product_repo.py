from sqlalchemy.orm import Session
from app.api import models, schemas


def get_all_products(db: Session):
    return db.query(models.Product).all()


def create_new_product(request: schemas.Product, db: Session):
    new_product = models.Product(
        key_product_id=request.key_product_id,
        product_code=request.product_code,
        key_taxcode_id=request.key_taxcode_id,
        name=request.name,
        description=request.description,
        key_sell_unit_id=request.key_sell_unit_id,
        is_price_tax_inclusive=request.is_price_tax_inclusive,
        is_kitted=request.is_kitted,
        internal_id=request.internal_id,
        product_group_id=request.product_group_id
    )
    db.add(new_product)
    db.commit()
    db.refresh(new_product)
    return new_product
