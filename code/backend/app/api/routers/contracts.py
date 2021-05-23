from typing import Optional
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from starlette import status
from app.api.service import contract_service
from app.api.database import get_db
from app.api import schemas

router = APIRouter(
    prefix="/contracts",
    tags=["Contracts"]
)


@router.get("")
def get_all_contracts(db: Session = Depends(get_db)):
    return contract_service.get_all_contracts(db=db)


@router.post("", status_code=status.HTTP_201_CREATED)
def create_new_contract(contract: schemas.Contract, db: Session = Depends(get_db)):
    return contract_service.create_new_contract(contract=contract, db=db)
