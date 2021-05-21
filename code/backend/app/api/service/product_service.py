import requests
from app.api.repository import product_repo
from sqlalchemy.orm import Session
from app.api import models, schemas, config


def get_all_products(db: Session):
    return product_repo.get_all_products(db=db)


def sync_products(session_id):
    requests_session = requests.Session()
    params = {
        "session_id": session_id,
        "supplier_org_id": config.SUPPLIER_ORG_ID,
        "data_type_id": 3,
        "customer_account_code": "TESTDEBTOR"  # Default customer account code is TESTDEBTOR
    }
    response = requests_session.get(f"https://api.squizz.com/rest/1/org/retrieve_esd/{session_id}",
                                    params=params).json()
    for entry in response['dataRecords']:
        print(entry)
