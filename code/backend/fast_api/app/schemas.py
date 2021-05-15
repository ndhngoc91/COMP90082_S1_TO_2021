from typing import Optional, List

from pydantic import BaseModel


class Customer(BaseModel):
    customer_id: int


class Product(BaseModel):
    product_id: int
    quantity: int


# class Order(BaseModel):
#     customer_id: int
#     delivery_addr_id: str
#     billing_addr_id: str
#     lines: List[Product]
#     instruction: str

class CustomerInfo(BaseModel):
    firstName: str
    lastName: str
    dob: str
    height: int
    shoeSize: int
    skierLevel: int
    tyreSize: int
    weight: int


class PackageInfo(BaseModel):
    customer: CustomerInfo
    category_id: int
    package_id: int
    extras: List[int]
    start_date: str
    end_date: str
    user_id: int


class Order(BaseModel):
    packages: List[PackageInfo]


class Address(BaseModel):
    contact: str
    address_line1: str
    address_line2: str
    postcode: str
    region: str
    country: str


class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    username: Optional[str] = None
    org_id: Optional[str] = None
    session_id: Optional[str] = None


class Package(BaseModel):
    name: str
    description: str
    what_is_included: str
    available: str
