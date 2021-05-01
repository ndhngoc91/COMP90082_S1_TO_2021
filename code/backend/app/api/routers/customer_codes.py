from typing import Optional

from fastapi import APIRouter

from api.service import customer_service

router = APIRouter(
    prefix="/customer-codes",
    tags=["Customer Codes"]
)


@router.get("")
def list_customers_codes(used: Optional[bool] = None):
    if used is None:
        return list(customer_service.customer_codes)
    elif used:
        return list(customer_service.list_used_customer_codes())
    else:
        return list(customer_service.list_unused_customer_codes())
