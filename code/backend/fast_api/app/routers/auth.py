from fastapi import APIRouter

from app.service import user_service
from app import schemas

router = APIRouter(
    prefix="/auth",
    tags=["Auth"]
)


# TODO: impure API
@router.post("/login")
async def login(user_credentials: schemas.UserCredentials):
    return user_service.validate(user_credentials.username, user_credentials.password)


# TODO: impure API
@router.get("/logout")
async def logout():
    return {"status": "success", "message": "LOGOUT_SUCCESS"}
