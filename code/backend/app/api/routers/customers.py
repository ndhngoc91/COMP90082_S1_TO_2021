from api import schemas
from api.model.address import Address
from api.model.customer import Customer
from api.oauth2 import get_current_user
from api.service import customer_service
from api.service.product_service import restore_prices as sync_products_prices
from fastapi import APIRouter, Depends, Request
from starlette import status

router = APIRouter(
    prefix="/customers",
    tags=["Customers"]
)


@router.get("")
def list_customers():
    all_customers = customer_service.list_all_customers()
    return [customer.__dict__ for customer in all_customers]


@router.post("/search")
async def search_customers(req: Request):
    req = await req.json()
    customers = customer_service.search_customers(req["query"], req["page_id"])

    customers["items"] = [
        customer.__dict__ for customer in customers["items"]]
    return customers


@router.post("/switch-customer")
def switch_customer(customer_info: schemas.Customer, current_user: schemas.TokenData = Depends(get_current_user)):
    customer = customer_service.get_one_customer(customer_info.customer_id)
    sync_products_prices(org_id=current_user.org_id,
                         customer_code=customer.customer_code)
    return {"message": "Switch customer successfully"}


@router.post("", status_code=status.HTTP_201_CREATED)
def create_customer(customer_info: schemas.Customer):
    new_customer = Customer(customer_info.dict())
    customer_service.create_new_customer(new_customer)
    return new_customer


@router.get("/{customer_id}")
def get_customer(customer_id: int):
    customer = customer_service.get_one_customer(customer_id)
    return customer


@router.put("/{customer_id}", status_code=status.HTTP_202_ACCEPTED)
def update_customer(customer_id: int, customer_info: schemas.Customer):
    customer = customer_service.get_one_customer(customer_id)
    for key, value in customer_info:
        if key in customer.__dict__:
            customer.__dict__[key] = value

    customer_service.update_customer(customer)
    return customer


@router.delete("/{customer_id}")
def delete_customer(customer_id: int):
    customer_service.delete_customer(customer_id)
    return {"message": f"Customer {customer_id} deleted"}


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