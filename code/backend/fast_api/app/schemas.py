from typing import Optional, List

from pydantic import BaseModel


class Customer(BaseModel):
    customer_id: int
    customer_code: str
    title: str
    first_name: str
    last_name: str
    phone: int
    email: str
    nationality_code: str
    organization_desc: str


class Product(BaseModel):
    product_id: int
    quantity: int


class Order(BaseModel):
    customer_id: int
    delivery_addr_id: str
    billing_addr_id: str
    lines: List[Product]
    instruction: str


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