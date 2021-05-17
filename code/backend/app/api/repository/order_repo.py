from fastapi.exceptions import HTTPException
from sqlalchemy.orm import Session
from sqlalchemy.orm import aliased
from typing import Optional
from sqlalchemy.sql.elements import or_

from starlette import status
from app.api import models, schemas


def get_all_orders(db: Session):
    return db.query(models.Order).all()


def filter_orders(query: Optional[str], db: Session):
    user = aliased(models.User)
    staff = aliased(models.User)

    sql_query = db.query(
        models.Order.id,
        models.Order.start_date,
        models.Order.end_date,
        models.Order.description,
        models.Order.status,
        user.first_name.label("customer_first_name"),
        user.last_name.label("customer_last_name"),
        user.phone.label("customer_phone"),
        user.email.label("customer_email"),
        staff.first_name.label("staff_first_name"),
        staff.last_name.label("staff_last_name"),
    )

    sql_query = sql_query.filter(
        or_(
            models.Order.description.like(f"%{query}%"),
            user.first_name.like(f"%{query}%"),
            user.last_name.like(f"%{query}%")
        )
    )
    sql_query = sql_query.outerjoin(user, user.id == models.Order.user_id)
    sql_query = sql_query.outerjoin(staff, staff.id == models.Order.staff_id)

    return sql_query.all()


def cancel_order(order_id: int, db: Session):
    order_to_cancel = db.query(models.Order).filter(models.Order.id == order_id)
    if not order_to_cancel.first():
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"order with id {order_id} not found")

    order_to_cancel.update(dict(status="Cancelled"))
    db.commit()

    return filter_orders("", db)
