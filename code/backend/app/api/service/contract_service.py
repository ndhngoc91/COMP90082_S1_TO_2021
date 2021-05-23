from sqlalchemy.orm import Session
from app.api import models, schemas
from app.api.repository import contract_repo


def get_all_contracts(db: Session):
    return contract_repo.get_all_contracts(db=db)


def create_new_contract(contract: schemas.Contract, db: Session):
    return contract_repo.create_new_contract(contract=contract, db=db)
