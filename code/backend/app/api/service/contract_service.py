from sqlalchemy.orm import Session
from app.api import models, schemas
from app.api.repository import contract_repo, product_repo


def get_all_contracts(db: Session):
    return contract_repo.get_all_contracts(db=db)


def get_contract(contract_id: int, db: Session):
    contract = contract_repo.get_contract(contract_id=contract_id, db=db)
    contract.products = product_repo.get_products_of_contract(contract_id=contract_id, db=db)
    return contract


def create_new_contract(contract: schemas.Contract, db: Session):
    return contract_repo.create_new_contract(contract=contract, db=db)
