from fastapi import APIRouter, Depends, Request

from app.api import schemas
from app.api.oauth2 import get_current_user
from app.api.service import product_service

router = APIRouter(
    prefix="/squizz",
    tags=["Squizz"]
)


@router.get("")
def synchonize():
    return "Implementing ..."
