from fastapi import APIRouter, Depends
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from app.api.service import user_service
from app.api.token import verify_token
from app.api.database import get_db

router = APIRouter(
    prefix="/auth",
    tags=["Auth"]
)


@router.get("/verify-token")
def validate_token(token: str):
    return verify_token(token)


@router.post("/login")
async def login(request: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    return user_service.validate(username=request.username, password=request.password, db=db)
