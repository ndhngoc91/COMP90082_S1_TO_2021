from fastapi import APIRouter

router = APIRouter(
    prefix="/user",
    tags=["Users"]
)
