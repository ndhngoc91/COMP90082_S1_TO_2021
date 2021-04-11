from fastapi import APIRouter

from app.service import product_service

router = APIRouter(
    prefix="/categories",
    tags=["Categories"]
)


@router.get("")
def list_categories():
    parents, children = product_service.list_all_categories()
    categories = []
    for category in parents:
        p_cate_dict = category.__dict__
        if category.keyCategoryID not in children:
            p_cate_dict['Children'] = []
        else:
            p_cate_dict['Children'] = [child.__dict__ for child in children[category.keyCategoryID]]
        categories.append(p_cate_dict)

    return categories
