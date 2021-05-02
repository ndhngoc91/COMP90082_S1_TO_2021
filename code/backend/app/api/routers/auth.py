from fastapi import APIRouter, Depends
from fastapi.security import OAuth2PasswordRequestForm

from app.api.service import user_service

from app.api.token import verify_token

router = APIRouter(
    prefix="/auth",
    tags=["Auth"]
)


@router.get("/verify-token")
def validate_token(token: str):
    verify_token(token)


@router.post("/login")
async def login(request: OAuth2PasswordRequestForm = Depends()):
    return user_service.validate(request.username, request.password)
