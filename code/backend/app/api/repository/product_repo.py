from sqlalchemy.orm import Session
from app.api import models, schemas
from app.api import consts


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


def update_product_status_to_hired(product_id: int, db: Session):
    product_to_update = db.query(models.Product).filter(models.Product.id == product_id)
    if not product_to_update.first():
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"data with id {product_id} not found")

    product_to_update.update({"status": consts.ProductStatus.HIRED.value})
    db.commit()
