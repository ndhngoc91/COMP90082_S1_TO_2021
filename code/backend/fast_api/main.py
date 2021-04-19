from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routers import auth
from app.routers import categories
from app.routers import customer_codes
from app.routers import customers
from app.routers import orders
from app.routers import packages
from app.routers import products
from app.routers import squizz

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:3000",
    "http://127.0.0.1:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(categories.router)
app.include_router(customer_codes.router)
app.include_router(customers.router)
app.include_router(orders.router)
app.include_router(packages.router)
app.include_router(products.router)
app.include_router(squizz.router)
