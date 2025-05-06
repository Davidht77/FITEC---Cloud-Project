from fastapi import FastAPI, HTTPException, Depends, status # type: ignore
from pydantic import BaseModel # type: ignore
from typing import Annotated # type: ignore
import models
from models import RoleEnum
from database import SessionLocal, engine # type: ignore
from sqlalchemy.orm import Session # type: ignore
import uuid
from datetime import datetime

# Por ahora funciona. No olvidar seguir los pasos en el Google Docs para correrlo

# Crea una instancia de la aplicación FastAPI
app = FastAPI()

models.Base.metadata.drop_all(bind=engine) # Borra todas las tablas definidas en Base.metadata
models.Base.metadata.create_all(bind=engine)  # Crea las tablas en la base de datos

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

@app.delete("/employees/{employee_id}", status_code=status.HTTP_200_OK)
async def delete_employee(employee_id: uuid.UUID, db: db_dependency):
    db_employee = db.query(models.Employees).filter(models.Employees.id == employee_id).first()
    if db_employee is None:
        raise HTTPException(status_code=404, detail="Employee not found")
    db.delete(db_employee)
    db.commit()
    return {"message": "Employee deleted successfully"}

@app.post("/sede/", response_model=SedeBase, status_code=status.HTTP_201_CREATED)
async def create_sede(sede: SedeBase, db: db_dependency):
    db_sede = models.Sede(**sede.dict())
    db.add(db_sede)
    db.commit()
    db.refresh(db_sede)
    return db_sede

@app.get("/sede/{sede_id}", response_model=SedeBase)
async def read_sede(sede_id: uuid.UUID, db: db_dependency):
    db_sede = db.query(models.Sede).filter(models.Sede.id == sede_id).first()
    if db_sede is None:
        raise HTTPException(status_code=404, detail="Sede not found")
    return db_sede

@app.delete("/sede/{sede_id}", status_code=status.HTTP_200_OK)
async def delete_employee(sede_id: uuid.UUID, db: db_dependency):
    db_sede = db.query(models.Sede).filter(models.Sede.id == sede_id).first()
    if db_sede is None:
        raise HTTPException(status_code=404, detail="Sede not found")
    db.delete(db_sede)
    db.commit()
    return {"message": "Sede deleted successfully"}

@app.get("/hola")
async def hello():
    return "Hola"


