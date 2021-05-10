from sqlalchemy import BigInteger, Column, DECIMAL, DateTime, Enum, Float, ForeignKey, Integer, String, Table, Text, \
    text, DATE, BOOLEAN
from sqlalchemy.orm import relationship
from app.api.database import Base

metadata = Base.metadata


class AgeGroup(Base):
    __tablename__ = 'age_groups'

    id = Column(Integer, primary_key=True)
    name = Column(String(45))


class Category(Base):
    __tablename__ = 'categories'

    id = Column(Integer, primary_key=True)
    name = Column(String(45))
    image_url = Column(String(45))


class Customer(Base):
    __tablename__ = 'customers'

    id = Column(Integer, primary_key=True)
    customer_code = Column(String(45))
    title = Column(String(45))
    first_name = Column(String(45))
    last_name = Column(String(45))
    phone = Column(String(45))
    email = Column(String(45))
    organization_desc = Column(String(45))
    nationality_code = Column(String(45))


class Extra(Base):
    __tablename__ = 'extra'

    idextra = Column(Integer, primary_key=True)
    extracol = Column(String(45))


class OrderDetail(Base):
    __tablename__ = 'order_details'

    order_id = Column(Integer, primary_key=True, index=True)
    item_id = Column(String(45))


class Order(Base):
    __tablename__ = 'orders'

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, nullable=False, index=True)
    start_date = Column(DateTime)
    end_date = Column(DateTime)
    description = Column(Text)
    package_id = Column(Integer, nullable=False, index=True)
    is_drop_ship = Column(Enum('Y', 'N'), nullable=False, server_default=text("'N'"))
    is_pending = Column(Enum('Y', 'N'), nullable=False, server_default=text("'N'"))


class Organization(Base):
    __tablename__ = 'organizations'

    id = Column(Integer, primary_key=True, unique=True)
    organization_id = Column(String(80), nullable=False)
    api_organization_key = Column(Text)
    api_organization_password = Column(String(80))
    account_code = Column(String(60))
    supplier_organization_id = Column(String(80))


class ProductGroup(Base):
    __tablename__ = 'product_groups'

    id = Column(Integer, primary_key=True, unique=True)
    name = Column(String(100), nullable=False)
    description = Column(String(80), nullable=False)


class Session(Base):
    __tablename__ = 'sessions'

    id = Column(Integer, primary_key=True, unique=True)
    session_id = Column(String(100), nullable=False)
    date = Column(DateTime, nullable=False)
    user_id = Column(Integer, nullable=False, index=True)
    organization_id = Column(Integer, nullable=False)


class SkillLevel(Base):
    __tablename__ = 'skill_levels'

    id = Column(Integer, primary_key=True)
    name = Column(String(45))


class TrailType(Base):
    __tablename__ = 'trail_types'

    id = Column(Integer, primary_key=True)
    name = Column(String(45))


class UserGroup(Base):
    __tablename__ = 'user_groups'

    group_id = Column(Integer, primary_key=True, unique=True)
    group_name = Column(String(50), nullable=False)
    users = Column(String(255))
    user_id = ForeignKey('users.id', index=True)


class UserType(Base):
    __tablename__ = 'user_types'

    id = Column(Integer, primary_key=True, unique=True)
    type = Column(String(10), nullable=False)


class Extraprice(Base):
    __tablename__ = 'extraprice'

    idextra = Column(ForeignKey('extra.idextra'), primary_key=True, nullable=False, index=True)
    daynumber = Column(Integer, primary_key=True, nullable=False)
    extraprice = Column(Float, server_default=text("'0'"))

    extra = relationship('Extra')


t_order_receipts = Table(
    'order_receipts', metadata,
    Column('orders_id', ForeignKey('orders.id'), nullable=False, index=True),
    Column('receipt', String(45))
)


class Package(Base):
    __tablename__ = 'packages'

    id = Column(Integer, primary_key=True, unique=True)
    category_id = Column(ForeignKey('categories.id'), nullable=False, index=True)
    skill_level_id = Column(ForeignKey('skill_levels.id'), nullable=False, index=True)
    age_group_id = Column(ForeignKey('age_groups.id'), nullable=False, index=True)
    name = Column(String(45))
    description = Column(String(45))

    age_group = relationship('AgeGroup')
    category = relationship('Category')
    skill_level = relationship('SkillLevel')
    product_groups = relationship('ProductGroup', secondary='package_product_group')


class Product(Base):
    __tablename__ = 'products'

    id = Column(Integer, primary_key=True, unique=True)
    model = Column(String(50))
    idpackage = Column(Integer, nullable=False, index=True, server_default=text("'1'"))
    description = Column(Text)
    price = Column(DECIMAL(10, 2), nullable=False)
    is_available = Column(BOOLEAN, server_default=text("'1'"))
    setting = Column(Text)
    group_id = Column(ForeignKey('product_groups.id', ondelete='CASCADE', onupdate='CASCADE'), index=True)

    group = relationship('ProductGroup')


class User(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True)
    username = Column(String(60), nullable=False)
    password = Column(String(255), nullable=False)
    height = Column(DECIMAL(5, 2))
    weight = Column(DECIMAL(5, 2))
    foot_size = Column(DECIMAL(3, 1))
    first_name = Column(String(127))
    last_name = Column(String(127))
    gender = Column(String(45))
    birthday = Column(DATE)
    phone = Column(String(20))
    email = Column(String(255))
    skier_ability = Column(Integer)
    din = Column(DECIMAL(5, 2))
    organization_id = Column(ForeignKey('organizations.id'), index=True)
    user_type_id = Column(ForeignKey('user_types.id'), index=True)

    organization = relationship('Organization')
    user_type = relationship('UserType')
    address = relationship('Address')
    user_group = relationship('UserGroup')


class Address(Base):
    __tablename__ = 'addresses'

    id = Column(Integer, primary_key=True,  unique=True, nullable=False, index=True,)
    state = Column(String(80))
    city = Column(String(80))
    postcode = Column(String(45))
    address_line = Column(Text)
    user_id = Column(ForeignKey('users.id'), nullable=False, index=True)
    order_id = Column(ForeignKey('orders.id'), index=True)

    # user = relationship('User')
    order = relationship('Order')


t_package_product_group = Table(
    'package_product_group', metadata,
    Column('package_id', ForeignKey('packages.id'), primary_key=True, nullable=False),
    Column('product_group_id', ForeignKey('product_groups.id'), primary_key=True, nullable=False, index=True)
)


class PackageTtypesPair(Base):
    __tablename__ = 'package_ttypes_pair'

    package_id = Column(ForeignKey('packages.id'), primary_key=True, nullable=False, index=True)
    trail_type_id = Column(ForeignKey('trail_types.id'), primary_key=True, nullable=False, index=True)
    sellcode = Column(String(45))

    package = relationship('Package')
    trail_type = relationship('TrailType')


class PriceLevel(Base):
    __tablename__ = 'price_levels'

    package_id = Column(ForeignKey('packages.id'), primary_key=True, nullable=False, index=True)
    number_of_days = Column(Integer, primary_key=True, nullable=False)
    price = Column(Float, server_default=text("'0'"))

    package = relationship('Package')

