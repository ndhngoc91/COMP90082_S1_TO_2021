from sqlalchemy import Column, Integer, String
from app.database import Base


class Package(Base):
    __tablename__ = 'package'

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String)
    description = Column(String)
    what_is_included = Column(String)
    available = Column(String)
