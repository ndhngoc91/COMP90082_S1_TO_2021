from sqlalchemy.orm import Session
from sqlalchemy.orm import aliased
from sqlalchemy.sql.expression import or_, select
from typing import Optional
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
        models.Order.is_pending,
        user.first_name.label("customer_first_name"),
        user.last_name.label("customer_last_name"),
        user.phone.label("customer_phone"),
        user.email.label("customer_email"),
        staff.first_name.label("staff_first_name"),
        staff.last_name.label("staff_last_name"),
    )

    sql_query = sql_query.filter(models.Order.description.like(f"%{query}%"))
    sql_query = sql_query.outerjoin(user, user.id == models.Order.user_id)
    sql_query = sql_query.outerjoin(staff, staff.id == models.Order.staff_id)

    return sql_query.all()
