import datetime
from typing import Optional, List

from pydantic import BaseModel
from pydantic.schema import date


class Customer(BaseModel):
    customer_code: str
    title: str
    first_name: str
    last_name: str
    phone: int
    email: str
    organization_desc: str
    nationality_code: str


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
    sellcode: str
    category_id: int
    age_group_id: int
    skill_level_id: int


class Session(BaseModel):
    session_id: str
    date: datetime.datetime
    user_id: int
    organization_id: int


class User(BaseModel):
    username: str
    email: str
    birthday: date
    phone: str
    gender: str
    first_name: str
    last_name: str
    address_line: str
    state: str
    city: str
    postcode: str


class UserCreate(User):
    password: str


class AddressCreate(BaseModel):
    address_line: str
    state: str
    city: str
    postcode: str
    user_id: int


class UserProfile(User):
    height: str
    weight: str
    shoe_size: str
    skier_ability: int
    din: str
    organization: str


