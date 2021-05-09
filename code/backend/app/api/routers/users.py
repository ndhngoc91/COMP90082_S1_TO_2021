from fastapi import APIRouter

from app.api import database

router = APIRouter(
    prefix="/user",
    tags=["Users"]
)

get_db = database.get_db


