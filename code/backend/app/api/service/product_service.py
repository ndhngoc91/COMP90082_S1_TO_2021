import requests
from typing import Optional
from sqlalchemy.orm import Session
from app.api import models, schemas, config, consts
from app.api.repository import product_repo, product_group_repo


def get_all_products(db: Session):
    return product_repo.get_all_products(db=db)


def filter_products(query: Optional[str], product_status: Optional[consts.ProductStatus], db: Session):
    return product_repo.filter_products(query=query, product_status=product_status, db=db)


def sync_products(session_id: str, db: Session):
    product_groups = product_group_repo.get_all_product_groups(db=db)

    requests_session = requests.Session()
    params = {
        "session_id": session_id,
        "supplier_org_id": config.SUPPLIER_ORG_ID,
        "data_type_id": 3,  # product
        "customer_account_code": "TESTDEBTOR"  # Default customer account code is TESTDEBTOR
    }
    response = requests_session.get(f"https://api.squizz.com/rest/1/org/retrieve_esd/{session_id}",
                                    params=params).json()
    for entry in response["dataRecords"]:
        product = schemas.Product()
        product.key_product_id = entry["keyProductID"]
        product.product_code = entry["productCode"]
        product.key_taxcode_id = entry["keyTaxcodeID"]
        product.name = entry["name"]
        product.description = entry["description1"]
        product.key_sell_unit_id = entry["keySellUnitID"]
        product.is_price_tax_inclusive = entry["isPriceTaxInclusive"] == "Y"
        product.is_kitted = entry["isKitted"] == "Y"
        product.internal_id = entry["internalID"]
        product_name = entry["name"]
        product_name = product_name.lower()
        for product_group in product_groups:
            if product_group.name in product_name:
                product.product_group_id = product_group.id
                break
        if product.product_group_id is None:
            product.product_group_id = 20  # hardcoded - other
        for i in range(int(entry["stockQuantity"])):
            newly_created_product = product_repo.create_new_product(request=product, db=db)
            print(f"Added {newly_created_product.id}")
