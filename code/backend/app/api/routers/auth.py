from fastapi import APIRouter, Depends
from fastapi.security import OAuth2PasswordRequestForm
from starlette import status
from sqlalchemy.orm import Session
from app.api.service import user_service
from app.api.token import verify_token
from app.api.database import get_db

router = APIRouter(
    prefix="/auth",
    tags=["Auth"]
)


@router.get('/verify-username', status_code=status.HTTP_200_OK)
def check_username(username: str, db: Session = Depends(get_db)):
    """
    Check if **username** exists.

    Returns:
    - **200** & **username** if not exists
    - **409** if already exists

    """
    return user_service.check_username(username=username, db=db)


@router.get("/verify-token")
def validate_token(token: str):
    return verify_token(token)


@router.post("/login")
async def login(request: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    return user_service.validate(username=request.username, password=request.password, db=db)
