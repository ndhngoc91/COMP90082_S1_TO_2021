from typing import Optional

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.api.service import age_group_service
from app.api.database import get_db

router = APIRouter(
    prefix="/age-groups",
    tags=["Age Groups"]
)


@router.get("")
def get_all_age_groups(db: Session = Depends(get_db)):
    return age_group_service.get_all_age_groups(db=db)
