from fastapi import APIRouter, Depends
from starlette import status

from app import schemas
from app.model.address import Address
from app.oauth2 import get_current_user
from app.service import customer_service
from app.service.product_service import restore_prices as sync_products_prices

router = APIRouter(
    prefix="/customers",
    tags=["Customers"]
)


@router.get("")
def list_customers():
    all_customers = customer_service.list_all_customers()
    return [customer.__dict__ for customer in all_customers]


@router.get("/search/{query}")
def search_customers(query: str):
    customers = customer_service.search_customers(query)
    return [customer.__dict__ for customer in customers]


@router.post("/switch-customer")
def switch_customer(customer_info: schemas.Customer, current_user: schemas.TokenData = Depends(get_current_user)):
    customer = customer_service.get_one_customer(customer_info.customer_id)
    sync_products_prices(org_id=current_user.org_id, customer_code=customer.customer_code)
    return {"message": "Switch customer successfully"}


@router.post("")
def create_customer():
    return "create_customer"


@router.get("/{customer_id}")
def get_customer(customer_id: int):
    return f"get_customer {customer_id}"


@router.put("/{customer_id}")
def update_customer(customer_id: int):
    return f"update_customer {customer_id}"


@router.delete("/{customer_id}")
def delete_customer(customer_id: int):
    return f"del_customer {customer_id}"


@router.get("/{customer_id}/addresses")
def list_addresses(customer_id: int):
    customer_addresses = customer_service.list_customer_addresses(customer_id)
    return [custom_address.__dict__ for custom_address in customer_addresses]


@router.post("/{customer_id}/addresses", status_code=status.HTTP_201_CREATED)
def create_address(customer_id: int, address_data: schemas.Address):
    new_address = Address(address_data.dict())
    customer_service.create_customer_address(customer_id, new_address)
    return new_address


@router.put("/{customer_id}/addresses/{address_id}", status_code=status.HTTP_202_ACCEPTED)
def update_address(customer_id: int, address_id: int, address_data: schemas.Address):
    address = customer_service.get_one_address(customer_id, address_id)
    for key, value in address_data:
        if key in address.__dict__:
            address.__dict__[key] = value

    customer_service.update_address(address)
    return address


@router.delete("/{customer_id}/addresses/{address_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_address(customer_id: int, address_id: int):
    customer_service.delete_address(customer_id, address_id)
    return {"message": f"Address {address_id} deleted"}
