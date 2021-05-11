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
    state: Optional[str]
    city: Optional[str]
    postcode: Optional[str]
    address_line: Optional[str]
    user_id: Optional[int]
    order_id: Optional[int]


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
    age_group_id: int
    category_id: int
    skill_level_id: int
    product_group_ids: List[int]


class Session(BaseModel):
    session_id: str
    date: datetime.datetime
    user_id: int
    organization_id: int


class Username(BaseModel):
    username: str


class UserWithoutPassword(BaseModel):
    username: str
    height: Optional[float]
    weight: Optional[float]
    foot_size: Optional[float]
    first_name: Optional[str]
    last_name: Optional[str]
    gender: Optional[str]
    birthday: Optional[date]
    phone: Optional[str]
    din: Optional[float]
    skill_level_id: Optional[int]
    user_type_id: Optional[int]


class User(UserWithoutPassword):
    password: str


class UserWithAddresses(User):
    address_list: Optional[List[Address]]
