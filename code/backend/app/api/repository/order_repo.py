from fastapi.exceptions import HTTPException
from sqlalchemy.orm import Session
from sqlalchemy.orm import aliased
from typing import Optional
from sqlalchemy.sql.elements import or_

from starlette import status
from app.api import models, schemas
from app.api.repository import product_group_repo


def get_all_orders(db: Session):
    return db.query(models.Order).all()


def filter_orders(query: Optional[str], db: Session):
    return db.query(
        models.Order.id,
        models.Order.start_date,
        models.Order.end_date,
        models.Order.description,
        models.Order.status,
        models.User.first_name.label("customer_first_name"),
        models.User.last_name.label("customer_last_name"),
        models.User.phone.label("customer_phone"),
        models.User.email.label("customer_email")
    ).filter(
        or_(
            models.Order.description.like(f"%{query}%"),
            models.User.first_name.like(f"%{query}%"),
            models.User.last_name.like(f"%{query}%")
        )
    ).outerjoin(
        models.User, models.User.id == models.Order.user_id
    ).all()


def cancel_order(order_id: int, db: Session):
    order_to_cancel = db.query(models.Order).filter(models.Order.id == order_id)
    if not order_to_cancel.first():
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"order with id {order_id} not found"
        )

    order_to_cancel.update(dict(status="Cancelled"))
    db.commit()

    return filter_orders("", db)


def get_order_with_details(order_id: int, db: Session):
    order = db.query(
        models.Order.id,
        models.Order.start_date,
        models.Order.end_date,
        models.Order.description,
        models.Order.status,
        models.User.first_name.label("customer_first_name"),
        models.User.last_name.label("customer_last_name"),
        models.User.phone.label("customer_phone"),
        models.User.email.label("customer_email"),
    ).filter(
        models.Order.id == order_id
    ).outerjoin(
        models.User, models.User.id == models.Order.user_id
    ).first()

    if not order:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"order with id {order_id} not found"
        )

    details = db.query(models.OrderDetail).join(models.Order).filter(models.Order.id == order_id).all()
    for detail in details:
        product_groups = product_group_repo.get_product_groups_of_package(package_id=detail.package_id, db=db)
        detail.product_groups = product_groups
        detail.recipient = db.query(models.Recipient).filter(models.Recipient.id == detail.recipient_id).first()

    return {
        "order": order,
        "details": details
    }


def create_new_order(order: schemas.Order, db: Session):
    new_order = models.Order(
        user_id=order.user_id,
        start_date=order.start_date,
        end_date=order.end_date,
        description=order.description
    )
    db.add(new_order)
    db.commit()

    for order_detail in order.order_details:
        new_recipient = models.Recipient(
            first_name=order_detail.recipient.first_name,
            last_name=order_detail.recipient.last_name,
            birthday=order_detail.recipient.dob,
            height=order_detail.recipient.height,
            weight=order_detail.recipient.weight,
            foot_size=order_detail.recipient.foot_size,
            skill_level_id=order_detail.recipient.skill_level_id
        )
        db.add(new_recipient)
        db.commit()

        new_order_detail = models.OrderDetail(
            order_id=new_order.id,
            recipient_id=new_recipient.id,
            package_id=order_detail.package_id,
            trail_id=order_detail.trail_id,
            package_cost=order_detail.package_cost
        )
        db.add(new_order_detail)
        db.commit()

        for order_extra in order_detail.extras:
            new_order_extra = models.OrderExtra(
                order_details_id=new_order_detail.id,
                extra_id=order_extra.id,
                cost=order_extra.cost
            )
            db.add(new_order_extra)
            db.commit()
