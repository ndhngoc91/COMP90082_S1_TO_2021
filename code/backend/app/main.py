from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from api.routers import auth
from api.routers import categories
from api.routers import customer_codes
from api.routers import customers
from api.routers import orders
from api.routers import packages
from api.routers import products
from api.routers import squizz

tags_metadata = [
    {
        "name": "Customers",
        "description": "Operations with customers, including the **customer information** and **customer address**.",
    },
]

app = FastAPI(
    title="Retail / Hire Web App",
    description="This is the backend of Retail / Hire Web App for Rocky Valley," \
                " based on Squizz eCommerce Platform.",
    version="1.0.0",
    openapi_tags=tags_metadata,
)

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
