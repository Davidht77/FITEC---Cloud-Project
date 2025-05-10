
import random
import uuid
import csv
import boto3
from faker import Faker
from sqlalchemy.orm import sessionmaker
from models import Employees, Sede, RoleEnum
from database import SessionLocal, engine
from dotenv import load_dotenv
import os


load_dotenv()  


URL_DATABASE = os.getenv("URL_DATABASE")  # Conexión a la base de datos
AWS_ACCESS_KEY_ID = os.getenv("AWS_ACCESS_KEY_ID")  # Clave de acceso a AWS
AWS_SECRET_ACCESS_KEY = os.getenv("AWS_SECRET_ACCESS_KEY")  # Clave secreta de AWS
AWS_SESSION_TOKEN = os.getenv("AWS_SESSION_TOKEN")  # Token de sesión temporal de AWS


fake = Faker()


session = SessionLocal()  

s3_client = boto3.client('s3', 
                         aws_access_key_id=AWS_ACCESS_KEY_ID, 
                         aws_secret_access_key=AWS_SECRET_ACCESS_KEY, 
                         aws_session_token=AWS_SESSION_TOKEN)  # Usamos el token temporal aquí

# Nombre del bucket de S3
BUCKET_NAME = 'your-bucket-name'  # **MODIFICA AQUÍ CON TU NOMBRE DE BUCKET EN S3**

# Función para generar empleados
def generate_employees(n=20000):
    print("Generando empleados...")
    employees_data = []  # Almacenaremos los datos de los empleados aquí
    for _ in range(n):
        employee = Employees(
            name=fake.first_name(),
            lastName=fake.last_name(),
            age=random.randint(18, 65),
            phone=fake.phone_number(),
            email=fake.email(),
            salary=random.randint(1500, 3500),
            role=random.choice([role.value for role in RoleEnum]),
            sedeId=uuid.uuid4(),  # Relación con una sede generada aleatoriamente
        )
        session.add(employee)
        employees_data.append({
            'name': employee.name,
            'lastName': employee.lastName,
            'age': employee.age,
            'phone': employee.phone,
            'email': employee.email,
            'salary': employee.salary,
            'role': employee.role,
            'sedeId': str(employee.sedeId),
        })
    session.commit()


    save_to_csv(employees_data, 'employees.csv')

  
    upload_to_s3('employees.csv')

    print("Empleados generados y guardados en 'employees.csv'.")

# Función para generar sedes
def generate_sedes(n=2000):
    print("Generando sedes...")
    sedes_data = [] 
    for _ in range(n):
        sede = Sede(
            name=fake.company(),
            address=fake.address(),
            phone=fake.phone_number(),
        )
        session.add(sede)
        sedes_data.append({
            'name': sede.name,
            'address': sede.address,
            'phone': sede.phone,
        })
    session.commit()

    
    save_to_csv(sedes_data, 'sedes.csv')

   
    upload_to_s3('sedes.csv')

    print("Sedes generadas y guardadas en 'sedes.csv'.")


def save_to_csv(data, filename):
    keys = data[0].keys()  
    with open(filename, mode='w', newline='', encoding='utf-8') as file:
        writer = csv.DictWriter(file, fieldnames=keys)
        writer.writeheader()  # Escribir el encabezado
        writer.writerows(data)  # Escribir los datos


def upload_to_s3(file_name):
    try:
        s3_client.upload_file(file_name, BUCKET_NAME, file_name)
        print(f"Archivo {file_name} subido correctamente a S3.")
    except Exception as e:
        print(f"Error al subir el archivo a S3: {e}")


generate_sedes()  # Genera 2,000 sedes
generate_employees()  # Genera 20,000 empleados


session.close()

print("Generación de datos completada.")