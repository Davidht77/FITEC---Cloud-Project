import random
import uuid
import csv
import boto3
from faker import Faker
import pandas as pd
import mysql.connector
from sqlalchemy.orm import sessionmaker
from models import Employees, Sede, RoleEnum
from database import SessionLocal, engine


db_connection = mysql.connector.connect(
    host='<PRIVATE_IP>',  
    user='username',  
    password='password',  
    database='database_name' 
)

cursor = db_connection.cursor()


fake = Faker()


s3_client = boto3.client('s3', aws_access_key_id='your-access-key-id',
                         aws_secret_access_key='your-secret-access-key', 
                         aws_session_token='your-session-token')


BUCKET_NAME = 'your-bucket-name'  # primeor crear el S3


def generate_employees(n=20000):
    print("Generando empleados...")
    employees_data = [] 
    for _ in range(n):
        employee = {
            'name': fake.first_name(),
            'last_name': fake.last_name(),
            'age': random.randint(18, 65),
            'phone': fake.phone_number(),
            'email': fake.email(),
            'salary': random.randint(1500, 3500),
            'role': random.choice(['Trainer', 'Nutricionist', 'Administrator']),
        }
        employees_data.append(employee)


    df_employees = pd.DataFrame(employees_data)

  
    df_employees.to_csv('employees.csv', index=False)

    # Insertar los empleados en la base de datos MySQL
    for index, row in df_employees.iterrows():
        cursor.execute("""
            INSERT INTO employees (name, last_name, age, phone, email, salary, role)
            VALUES (%s, %s, %s, %s, %s, %s, %s)
        """, (row['name'], row['last_name'], row['age'], row['phone'], row['email'], row['salary'], row['role']))

    db_connection.commit()  
    print(f"{n} empleados generados e inyectados en la base de datos.")

    # Subir el archivo CSV de empleados a S3
    upload_to_s3('employees.csv')

def generate_sedes(n=2000):
    print("Generando sedes...")
    sedes_data = [] 
    for _ in range(n):
        sede = {
            'name': fake.company(),
            'address': fake.address(),
            'phone': fake.phone_number(),
        }
        sedes_data.append(sede)

 
    df_sedes = pd.DataFrame(sedes_data)
    df_sedes.to_csv('sedes.csv', index=False)

   
    for index, row in df_sedes.iterrows():
        cursor.execute("""
            INSERT INTO sede (name, address, phone)
            VALUES (%s, %s, %s)
        """, (row['name'], row['address'], row['phone']))

    db_connection.commit()  
    print(f"{n} sedes generadas e inyectadas en la base de datos.")

    
    upload_to_s3('sedes.csv')

# Función para cargar archivos CSV a S3
def upload_to_s3(file_name):
    try:
        s3_client.upload_file(file_name, BUCKET_NAME, file_name)
        print(f"Archivo {file_name} subido correctamente a S3.")
    except Exception as e:
        print(f"Error al subir el archivo a S3: {e}")


generate_sedes()  
generate_employees()  

cursor.close()
db_connection.close()

print("Generación de datos completada.")