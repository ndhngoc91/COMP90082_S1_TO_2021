from fastapi import APIRouter
from app.service import category_service

router = APIRouter(
    prefix="/categories",
    tags=["Categories"]
)


@router.get("")
def list_categories(query: str = None):
    categories = category_service.get_all_categories(query)
    return categories


@router.post("")
async def list_category_details(days: int, category_id: int):
    details = category_service.list_category_details(days, category_id)
    return details

@router.get("/extras")
async def list_extras(days:int,):
    customer_addresses = customer_service.list_customer_addresses(customer_id)
    return [custom_address.__dict__ for custom_address in customer_addresses]
