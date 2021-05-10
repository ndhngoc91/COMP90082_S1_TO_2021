FROM tiangolo/uvicorn-gunicorn-fastapi:python3.8

WORKDIR /usr/src/backend

ADD requirements.txt .

COPY /app .

RUN pip install -r requirements.txt

CMD ["uvicorn", "app.main:app", "--reload", "--host", "0.0.0.0", "--port", "8000"]
