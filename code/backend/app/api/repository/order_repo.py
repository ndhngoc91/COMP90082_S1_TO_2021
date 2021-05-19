from fastapi.exceptions import HTTPException
from sqlalchemy.orm import Session
from sqlalchemy.orm import aliased
from typing import Optional
from sqlalchemy.sql.elements import or_

from starlette import status
from app.api import models, schemas
from itertools import groupby
from operator import attrgetter


def get_all_orders(db: Session):
    return db.query(models.Order).all()


def filter_orders(query: Optional[str], db: Session):
    customer = aliased(models.User)
    staff = aliased(models.User)

    return db.query(
        models.Order.id,
        models.Order.start_date,
        models.Order.end_date,
        models.Order.description,
        models.Order.status,
        customer.first_name.label("customer_first_name"),
        customer.last_name.label("customer_last_name"),
        customer.phone.label("customer_phone"),
        customer.email.label("customer_email"),
        staff.first_name.label("staff_first_name"),
        staff.last_name.label("staff_last_name"),
    ).filter(
        or_(
            models.Order.description.like(f"%{query}%"),
            customer.first_name.like(f"%{query}%"),
            customer.last_name.like(f"%{query}%")
        )
    ).outerjoin(
        customer, customer.id == models.Order.user_id
    ).outerjoin(
        staff, staff.id == models.Order.staff_id
    ).all()


def cancel_order(order_id: int, db: Session):
    order_to_cancel = db.query(models.Order).filter(
        models.Order.id == order_id)
    if not order_to_cancel.first():
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"order with id {order_id} not found"
        )

    order_to_cancel.update(dict(status="Cancelled"))
    db.commit()

    return filter_orders("", db)


def get_order_details(order_id: int, db: Session):
    customer = aliased(models.User)
    staff = aliased(models.User)

    order = db.query(
        models.Order.id,
        models.Order.start_date,
        models.Order.end_date,
        models.Order.description,
        models.Order.status,
        customer.first_name.label("customer_first_name"),
        customer.last_name.label("customer_last_name"),
        customer.phone.label("customer_phone"),
        customer.email.label("customer_email"),
        staff.first_name.label("staff_first_name"),
        staff.last_name.label("staff_last_name"),
    ).filter(
        models.Order.id == order_id
    ).outerjoin(
        customer, customer.id == models.Order.user_id
    ).outerjoin(
        staff, staff.id == models.Order.staff_id
    ).first()

    if not order:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"order with id {order_id} not found"
        )

    packages = db.query(
        models.Order.id,
        models.OrderDetail.id.label("order_detail_id"),
        models.Package,
        models.OrderPackage.cost.label("package_cost"),
        models.TrailType,
        models.Extra,
        models.OrderExtra.cost.label("extra_cost"),
        models.Recipient.id.label("recipient_id"),
        models.Recipient.first_name.label("recipient_first_name"),
        models.Recipient.last_name.label("recipient_last_name"),
    ).filter(
        models.Order.id == order_id
    ).order_by(
        models.Package.id
    ).outerjoin(
        models.OrderDetail, models.OrderDetail.order_id == models.Order.id
    ).outerjoin(
        models.OrderPackage, models.OrderPackage.order_details_id == models.OrderDetail.id
    ).outerjoin(
        models.Package, models.Package.id == models.OrderPackage.package_id
    ).outerjoin(
        models.TrailType, models.TrailType.id == models.OrderPackage.trail_id
    ).outerjoin(
        models.Recipient, models.Recipient.id == models.OrderDetail.recipient_id
    ).outerjoin(
        models.OrderExtra, models.OrderExtra.order_packages_id == models.OrderPackage.id
    ).outerjoin(
        models.Extra, models.Extra.id == models.OrderExtra.extra_id
    ).all()

    return {
        "order": order,
        "packages": packages
    }


def create_new_order(order: schemas.Order, db: Session):
    new_order = models.Order(
        user_id=order.customer_id,
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
            recipient_id=new_recipient.id
        )
        db.add(new_order_detail)
        db.commit()

        new_order_package = models.OrderPackage(
            order_details_id=new_order_detail.id,
            package_id=order_detail.package_id,
            trail_id=order_detail.trail_id,
            cost=order_detail.package_cost
        )
        db.add(new_order_package)
        db.commit()

        for order_extra in order_detail.extras:
            new_order_extra = models.OrderExtra(
                order_packages_id=new_order_package.id,
                extra_id=order_extra.id,
                cost=order_extra.cost
            )
            db.add(new_order_extra)
            db.commit()
