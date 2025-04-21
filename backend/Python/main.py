from fastapi import FastAPI # type: ignore

# Crea una instancia de la aplicación FastAPI
app = FastAPI()

# Define un endpoint (ruta)
@app.get("/")
def read_root():
    return {"Hello": "World"}

# Define otro endpoint simple
@app.get("/items/{item_id}")
def read_item(item_id: int):
    return {"item_id": item_id}
