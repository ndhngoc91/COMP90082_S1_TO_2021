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
