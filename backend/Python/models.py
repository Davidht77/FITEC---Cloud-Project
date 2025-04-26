from sqlalchemy import Column, String, Float, ForeignKey
from sqlalchemy.orm import relationship
import uuid
from sqlalchemy.types import Uuid # Import Uuid type
from database import Base

class Employees(Base):
    __tablename__ = 'clients'

    id = Column(Uuid, primary_key=True, default=uuid.uuid4(), index=True)
    name = Column(String(50))
    lastName = Column(String(50))
    phone = Column(Float)
    email = Column(String(50))
    salary = Column(Float)

    sede_id = Column(Uuid, ForeignKey('sede.id'), nullable=False)
    sede = relationship("Sede", back_populates="clients")


class Sede(Base):
    __tablename__ = 'sede'

    id = Column(Uuid, primary_key=True, default=uuid.uuid4(), index=True)
    name = Column(String(50))
    address = Column(String(50))
    phone = Column(String(50))

    clients = relationship("Employees", back_populates="sede", cascade="all, delete-orphan")    