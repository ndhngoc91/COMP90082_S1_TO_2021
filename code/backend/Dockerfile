FROM tiangolo/uvicorn-gunicorn-fastapi:python3.8

COPY ./ /app

EXPOSE 80

RUN pip install -r requirements.txt

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "80"]
