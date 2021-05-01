from sqlalchemy import Column, Integer, String
from api.database import Base


class Package(Base):
    __tablename__ = 'packages'

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String)
    description = Column(String)
    what_is_included = Column(String)
    available = Column(String)
