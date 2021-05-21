from fastapi import APIRouter, Depends, Request
from sqlalchemy.orm import Session
from app.api import schemas
from app.api.database import get_db, engine
from app.api.oauth2 import get_current_user
from app.api.service import product_service

router = APIRouter(
    prefix="/squizz",
    tags=["Squizz"]
)


@router.post("/retrieve-products")
def retrieve_products(current_user: schemas.TokenData = Depends(get_current_user), db: Session = Depends(get_db)):
    product_service.sync_products(session_id=current_user.session_id, db=db)
    return "Implementing ..."
