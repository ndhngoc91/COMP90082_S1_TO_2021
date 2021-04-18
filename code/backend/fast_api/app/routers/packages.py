from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.repository import package

router = APIRouter(
    prefix="/packages",
    tags=["Packages"]
)


@router.get("")
def list_all_packages(db: Session = Depends(get_db)):
    return package.get_all(db=db)
