from typing import Optional

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.api.service import skill_level_service
from app.api.database import get_db

router = APIRouter(
    prefix="/skill-levels",
    tags=["Skill Levels"]
)


@router.get("")
def get_all_skill_levels(db: Session = Depends(get_db)):
    return skill_level_service.get_all_skill_levels(db=db)
