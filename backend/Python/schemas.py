from pydantic import BaseModel # type: ignore
from models import RoleEnum
import uuid
from datetime import datetime

# Define un modelo Pydantic para la validación de datos
class EmployeeCreate(BaseModel):
    name: str
    lastName: str | None = None
    age: int
    phone: str
    email: str
    password: str
    salary: float | None = None
    role: RoleEnum = RoleEnum.TRAINER
    sede_id: uuid.UUID

# Modelo de respuesta (incluye campos generados como id y fecha de contrato)
class EmployeeResponse(BaseModel):
    id: uuid.UUID
    name: str
    lastName: str | None = None
    age: int
    phone: str
    email: str
    salary: float | None = None
    role: RoleEnum = RoleEnum.TRAINER
    sede_id: uuid.UUID
    date_contract: datetime

    class Config:
        orm_mode = True

class SedeCreate(BaseModel):
    name: str
    address: str | None = None
    phone: str

class SedeResponse(SedeCreate):
    id: uuid.UUID

    class Config:
        orm_mode = True