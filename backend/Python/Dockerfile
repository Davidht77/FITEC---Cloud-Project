FROM python:3.11

WORKDIR /app

COPY ./app /app
COPY .env .env

RUN pip install --no-cache-dir -r requirements.txt

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]