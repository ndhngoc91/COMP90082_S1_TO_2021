from sqlalchemy.orm import Session
from app.api import models, schemas


def get_all_contracts(db: Session):
    return db.query(models.Contract).all()


def create_new_contract(contract: schemas.Contract, db: Session):
    new_contract = models.Contract(
        name=contract.name,
        created_at=contract.created_at,
        created_by=contract.created_by
    )
    db.add(new_contract)
    db.commit()

    for contract_detail in contract.contract_details:
        new_contract_detail = models.ContractDetail(
            contract_id=new_contract.id,
            product_id=contract_detail.product_id
        )
        db.add(new_contract_detail)
        db.commit()
