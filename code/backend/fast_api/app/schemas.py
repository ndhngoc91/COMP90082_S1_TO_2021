from typing import Optional

from pydantic import BaseModel


class Customer(BaseModel):
    customer_id: int


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
