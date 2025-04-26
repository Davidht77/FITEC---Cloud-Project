from fastapi import FastAPI, HTTPException, Depends, status # type: ignore
from pydantic import BaseModel # type: ignore
from typing import Annotated # type: ignore
import models
from database import SessionLocal, engine # type: ignore
from sqlalchemy.orm import Session # type: ignore
import uuid

# Crea una instancia de la aplicación FastAPI
app = FastAPI()

models.Base.metadata.drop_all(bind=engine) # Borra todas las tablas definidas en Base.metadata
models.Base.metadata.create_all(bind=engine)  # Crea las tablas en la base de datos

# Define un modelo Pydantic para la validación de datos
class EmployeeBase(BaseModel):
    id: uuid.UUID
    name: str
    lastName: str | None = None
    phone: float
    email: float | None = None
    salary: float | None = None
    sede_id: uuid.UUID

class Sede(BaseModel):
    name: str
    address: str | None = None
    phone: str

# Crea una base de datos de ejemplo
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

#Para injecion de dependencias:
db_dependency = Annotated[Session, Depends(get_db)]

@app.post("/employees/", response_model=EmployeeBase, status_code=status.HTTP_201_CREATED)
async def create_employee(employee: EmployeeBase, db: db_dependency):
    db_employee = models.Employees(**employee.dict())
    db.add(db_employee)
    db.commit()
    db.refresh(db_employee)
    return db_employee

@app.get("/employees/{employee_id}", response_model=EmployeeBase)
async def read_employee(employee_id: uuid.UUID, db: db_dependency):
    db_employee = db.query(models.Employees).filter(models.Employees.id == employee_id).first()
    if db_employee is None:
        raise HTTPException(status_code=404, detail="Employee not found")
    return db_employee

@app.post("/sede/", response_model=Sede, status_code=status.HTTP_201_CREATED)
async def create_sede(sede: Sede, db: db_dependency):
    db_sede = models.Sede(**sede.dict())
    db.add(db_sede)
    db.commit()
    db.refresh(db_sede)
    return db_sede

@app.get("/sede/{sede_id}", response_model=Sede)
async def read_sede(sede_id: uuid.UUID, db: db_dependency):
    db_sede = db.query(models.Sede).filter(models.Sede.id == sede_id).first()
    if db_sede is None:
        raise HTTPException(status_code=404, detail="Sede not found")
    return db_sede