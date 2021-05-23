from typing import Tuple
from sqlalchemy import Column, DECIMAL, DateTime, Enum, ForeignKey, Integer, Table, Text, Date, BOOLEAN, VARCHAR
from sqlalchemy.dialects.mysql import TINYINT
from sqlalchemy.orm import relationship
from app.api.database import Base

metadata = Base.metadata


class AgeGroup(Base):
    __tablename__ = 'age_groups'

    id = Column(Integer, primary_key=True)
    name = Column(VARCHAR(45))


class Category(Base):
    __tablename__ = 'categories'

    id = Column(Integer, primary_key=True)
    name = Column(VARCHAR(45))
    image_url = Column(VARCHAR(45))


class Customer(Base):
    __tablename__ = 'customers'

    id = Column(Integer, primary_key=True)
    customer_code = Column(VARCHAR(45))
    title = Column(VARCHAR(45))
    first_name = Column(VARCHAR(45))
    last_name = Column(VARCHAR(45))
    phone = Column(VARCHAR(45))
    email = Column(VARCHAR(45))
    organization_desc = Column(VARCHAR(45))
    nationality_code = Column(VARCHAR(45))


class Extra(Base):
    __tablename__ = 'extra'

    id = Column(Integer, primary_key=True)
    name = Column(VARCHAR(45))
    age_group_id = Column(Integer, nullable=False, index=True)
    base_price = Column(Integer, nullable=False)
    price_levels = Column(Text, nullable=False)
    sell_code = Column(VARCHAR(20), nullable=False)


class Order(Base):
    __tablename__ = 'orders'

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, nullable=False, index=True)
    start_date = Column(DateTime)
    end_date = Column(DateTime)
    description = Column(Text)
    status = Column(Enum('New', 'Handling', 'Done', 'Cancelled', 'Executing'), nullable=False,
                    server_default='New')


class Organization(Base):
    __tablename__ = 'organizations'

    id = Column(Integer, primary_key=True, unique=True)
    organization_id = Column(VARCHAR(80), nullable=False)
    api_organization_key = Column(Text)
    api_organization_password = Column(VARCHAR(80))
    account_code = Column(VARCHAR(60))
    supplier_organization_id = Column(VARCHAR(80))


class ProductGroup(Base):
    __tablename__ = 'product_groups'

    id = Column(Integer, primary_key=True, unique=True)
    name = Column(VARCHAR(100), nullable=False)
    description = Column(VARCHAR(80), nullable=False)


class Session(Base):
    __tablename__ = 'sessions'

    id = Column(Integer, primary_key=True, unique=True)
    session_id = Column(VARCHAR(100), nullable=False)
    date = Column(DateTime, nullable=False)
    user_id = Column(Integer, nullable=False, index=True)
    organization_id = Column(Integer, nullable=False)


class SkillLevel(Base):
    __tablename__ = 'skill_levels'

    id = Column(Integer, primary_key=True)
    name = Column(VARCHAR(45))


class TrailType(Base):
    __tablename__ = 'trail_types'

    id = Column(Integer, primary_key=True)
    name = Column(VARCHAR(45))


class UserType(Base):
    __tablename__ = 'user_types'

    id = Column(Integer, primary_key=True, unique=True)
    type = Column(VARCHAR(10), nullable=False)


t_order_receipts = Table(
    'order_receipts', metadata,
    Column('orders_id', ForeignKey('orders.id'), nullable=False, index=True),
    Column('receipt', VARCHAR(45))
)


class Package(Base):
    __tablename__ = 'packages'

    id = Column(Integer, primary_key=True, unique=True)
    category_id = Column(ForeignKey('categories.id'), nullable=False, index=True)
    skill_level_id = Column(ForeignKey('skill_levels.id'), nullable=False, index=True)
    age_group_id = Column(ForeignKey('age_groups.id'), nullable=False, index=True)
    name = Column(VARCHAR(45))
    description = Column(Text)
    image_key = Column(VARCHAR(45))
    base_price = Column(Integer, nullable=False)
    price_levels = Column(Text, nullable=False)

    age_group = relationship('AgeGroup')
    category = relationship('Category')
    skill_level = relationship('SkillLevel')


class Product(Base):
    __tablename__ = 'products'

    id = Column(Integer, primary_key=True, unique=True)
    key_product_id = Column(VARCHAR(45))
    product_code = Column(VARCHAR(20))
    key_taxcode_id = Column(VARCHAR(45))
    name = Column(VARCHAR(50))
    description = Column(Text)
    key_sell_unit_id = Column(VARCHAR(45))
    is_price_tax_inclusive = Column(BOOLEAN)
    is_kitted = Column(BOOLEAN)
    internal_id = Column(VARCHAR(45))
    product_group_id = Column(ForeignKey('product_groups.id'), index=True)
    status = Column(Enum('AVAILABLE', 'HIRED', 'RESERVED'), server_default='AVAILABLE')
    unavailable_from = Column(DateTime)
    unavailable_to = Column(DateTime)

    product_group = relationship('ProductGroup')


class Recipient(Base):
    __tablename__ = 'recipients'

    id = Column(Integer, primary_key=True)
    height = Column(DECIMAL(5, 2))
    weight = Column(DECIMAL(5, 2))
    foot_size = Column(Integer)
    first_name = Column(VARCHAR(127))
    last_name = Column(VARCHAR(127))
    birthday = Column(Date)
    din = Column(DECIMAL(5, 2))
    skill_level_id = Column(ForeignKey('skill_levels.id'), index=True)

    skill_level = relationship('SkillLevel')


class User(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True)
    username = Column(VARCHAR(60), nullable=False, unique=True)
    password = Column(VARCHAR(255), nullable=False)
    height = Column(DECIMAL(5, 2))
    weight = Column(DECIMAL(5, 2))
    foot_size = Column(Integer)
    first_name = Column(VARCHAR(127))
    last_name = Column(VARCHAR(127))
    gender = Column(VARCHAR(45))
    birthday = Column(Date)
    phone = Column(VARCHAR(20))
    email = Column(VARCHAR(255), unique=True)
    din = Column(DECIMAL(5, 2))
    is_enabled = Column(TINYINT, server_default='1')
    skill_level_id = Column(ForeignKey('skill_levels.id'), index=True)
    organization_id = Column(ForeignKey('organizations.id'), index=True)
    user_type_id = Column(ForeignKey('user_types.id'), index=True)

    organization = relationship('Organization')
    skill_level = relationship('SkillLevel')
    user_type = relationship('UserType')
    addresses = relationship('Address', cascade='save-update')


class Address(Base):
    __tablename__ = 'addresses'

    id = Column(Integer, primary_key=True, unique=True)
    state = Column(VARCHAR(80))
    city = Column(VARCHAR(80))
    postcode = Column(VARCHAR(45))
    address_line = Column(Text)
    user_id = Column(ForeignKey('users.id'), nullable=False, index=True)
    order_id = Column(Integer, index=True)

    user = relationship('User')


class OrderDetail(Base):
    __tablename__ = 'order_details'

    id = Column(Integer, primary_key=True)
    order_id = Column(ForeignKey('orders.id', ondelete='CASCADE', onupdate='CASCADE'), nullable=False, index=True)
    recipient_id = Column(ForeignKey('recipients.id', ondelete='RESTRICT', onupdate='CASCADE'), nullable=False,
                          index=True)
    package_id = Column(ForeignKey('packages.id', ondelete='RESTRICT', onupdate='CASCADE'), nullable=False, index=True)
    trail_id = Column(ForeignKey('trail_types.id', ondelete='RESTRICT', onupdate='CASCADE'), nullable=False, index=True)
    package_cost = Column(DECIMAL(6, 2))

    order = relationship('Order')
    package = relationship('Package')
    recipient = relationship('Recipient')
    trail = relationship('TrailType')


class PackageProductGroup(Base):
    __tablename__ = 'package_product_group'

    id = Column(Integer, primary_key=True)
    package_id = Column(ForeignKey('packages.id'), nullable=False, index=True)
    product_group_id = Column(ForeignKey('product_groups.id'), nullable=False, index=True)

    package = relationship('Package')
    product_group = relationship('ProductGroup')


class PackageTtypesPair(Base):
    __tablename__ = 'package_ttypes_pair'

    package_id = Column(ForeignKey('packages.id'), primary_key=True, nullable=False, index=True)
    trail_type_id = Column(ForeignKey('trail_types.id'), primary_key=True, nullable=False, index=True)
    sellcode = Column(VARCHAR(45))

    package = relationship('Package')
    trail_type = relationship('TrailType')


class UserGroup(Base):
    __tablename__ = 'user_groups'

    id = Column(Integer, primary_key=True, unique=True)
    name = Column(VARCHAR(50), nullable=False)
    user_id = Column(ForeignKey('users.id'), index=True)

    user = relationship('User')


class Member(Base):
    __tablename__ = 'members'

    id = Column(Integer, primary_key=True)
    height = Column(DECIMAL(5, 2))
    weight = Column(DECIMAL(5, 2))
    foot_size = Column(Integer)
    first_name = Column(VARCHAR(127))
    last_name = Column(VARCHAR(127))
    birthday = Column(Date)
    din = Column(DECIMAL(5, 2))
    skill_level_id = Column(ForeignKey('skill_levels.id'), index=True)
    user_group_id = Column(ForeignKey('user_groups.id'), index=True)

    skill_level = relationship('SkillLevel')
    user_group = relationship('UserGroup')


class OrderExtra(Base):
    __tablename__ = 'order_extras'

    id = Column(Integer, primary_key=True)
    order_details_id = Column(ForeignKey('order_details.id', ondelete='RESTRICT', onupdate='CASCADE'), nullable=False,
                              index=True)
    extra_id = Column(ForeignKey('extra.id', ondelete='RESTRICT', onupdate='CASCADE'), nullable=False, index=True)
    cost = Column(DECIMAL(6, 2))

    extra = relationship('Extra')


class Contract(Base):
    __tablename__ = 'contracts'

    id = Column(Integer, primary_key=True)
    name = Column(VARCHAR(45))
    created_at = Column(DateTime)
    created_by = Column(VARCHAR(45))


class ContractDetail(Base):
    __tablename__ = 'contract_details'

    id = Column(Integer, primary_key=True)
    contract_id = Column(ForeignKey('contracts.id'), index=True)
    product_id = Column(ForeignKey('products.id'), index=True)

    contract = relationship('Contract')
    product = relationship('Product')
