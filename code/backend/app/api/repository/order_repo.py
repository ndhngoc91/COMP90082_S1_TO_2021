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
    guest = aliased(models.User)
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
        models.TrailType,
        models.Extra,
        guest.id.label("guest_id"),
        guest.first_name.label("guest_first_name"),
        guest.last_name.label("guest_last_name"),
    ).filter(
        models.Order.id == order_id
    ).order_by(
        models.Package.id
    ).outerjoin(
        models.OrderDetail, models.OrderDetail.order_id == models.Order.id
    ).outerjoin(
        models.Package, models.Package.id == models.OrderDetail.package_id
    ).outerjoin(
        models.TrailType, models.TrailType.id == models.OrderDetail.trail_id
    ).outerjoin(
        guest, guest.id == models.OrderDetail.user_id
    ).outerjoin(
        models.OrderExtra, models.OrderExtra.order_details_id == models.OrderDetail.id
    ).outerjoin(
        models.Extra, models.Extra.id == models.OrderExtra.extra_id
    ).all()

    return {
        "order": order,
        "packages": packages
    }
