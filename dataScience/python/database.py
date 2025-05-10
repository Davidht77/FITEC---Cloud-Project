import os
from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

# Cargar las variables de entorno desde el archivo .env
load_dotenv()

# Obtener la URL de la base de datos desde la variable de entorno
URL_DATABASE = os.getenv("URL_DATABASE")  # Carga la URL de la base de datos desde .env

# Crear el motor de la base de datos
engine = create_engine(URL_DATABASE, pool_size=10, max_overflow=20)

# Crear la sesión de SQLAlchemy
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base para las clases de SQLAlchemy
Base = declarative_base()

# Crear las tablas si no existen
Base.metadata.create_all(bind=engine) 