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
    key_product_id: Optional[str]
    product_code: Optional[str]
    key_taxcode_id: Optional[str]
    name: Optional[str]
    description: Optional[str]
    key_sell_unit_id: Optional[str]
    is_price_tax_inclusive: Optional[bool]
    is_kitted: Optional[bool]
    internal_id: Optional[str]
    product_group_id: Optional[str]


class Recipient(BaseModel):
    first_name: str
    last_name: str
    dob: date
    height: float
    weight: float
    foot_size: float
    skill_level_id: int


class OrderExtra(BaseModel):
    id: int
    cost: float


class OrderDetail(BaseModel):
    package_id: int
    trail_id: int
    package_cost: float
    extras: List[OrderExtra]
    recipient: Recipient


class Order(BaseModel):
    user_id: int
    start_date: date
    end_date: date
    description: str
    order_details: List[OrderDetail]


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


class PackageToCreate(Package):
    product_group_ids: Optional[List[int]]


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
    foot_size: Optional[int]
    first_name: Optional[str]
    last_name: Optional[str]
    gender: Optional[str]
    birthday: Optional[date]
    phone: Optional[str]
    email: Optional[str]
    din: Optional[float]
    is_enabled: Optional[int] = 1
    skill_level_id: Optional[int]
    user_type_id: Optional[int]


class User(UserWithoutPassword):
    password: str


class UserWithAddresses(User):
    address_list: Optional[List[Address]]


class UserGroup(BaseModel):
    name: str
    contacts: str
    user_id: int


class ContractDetail(BaseModel):
    product_id: int
    recipient_id: int


class Contract(BaseModel):
    name: str
    order_id: int
    created_at: date
    created_by: str
    contract_details: List[ContractDetail]
