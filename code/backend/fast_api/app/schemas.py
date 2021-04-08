from pydantic import BaseModel


class UserCredentials(BaseModel):
    username: str
    password: str


class Customer(BaseModel):
    customer_id: int


class Address(BaseModel):
    contact: str
    address_line1: str
    address_line2: str
    postcode: str
    region: str
    country: str
