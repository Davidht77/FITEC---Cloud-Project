from pydantic import BaseModel # type: ignore
from models import RoleEnum
import uuid
from datetime import datetime

# Define un modelo Pydantic para la validación de datos
class EmployeeBase(BaseModel):
    id: uuid.UUID | None = None # Opcional para que el mismo backend lo genere
    name: str
    lastName: str | None = None
    age: int
    phone: str
    email: str
    password: str
    salary: float | None = None
    date_contract: datetime | None = None
    role: RoleEnum = RoleEnum.TRAINER
    sede_id: uuid.UUID | None = None

class SedeBase(BaseModel):
    id: uuid.UUID | None = None # Opcional para que el mismo backend lo genere
    name: str
    address: str | None = None
    phone: str