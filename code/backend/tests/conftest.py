import pytest
from starlette.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from app.main import app


@pytest.fixture(scope="module")
def test_app():
    client = TestClient(app)
    yield client


# you DO NOT need to modify these configs. The test cases are currently running with your local database
TEST_HOST = "localhost:3306"
TEST_USER = "root"
TEST_PASSWORD = "rootpasswordgiven"
TEST_DB_NAME = "squizz_app"

SQLALCHEMY_DATABASE_URL = f"mysql+pymysql://{TEST_USER}:{TEST_PASSWORD}@{TEST_HOST}/{TEST_DB_NAME}"
engine = create_engine(SQLALCHEMY_DATABASE_URL)
session_local = sessionmaker(autocommit=False, autoflush=False, bind=engine)


@pytest.fixture(scope="module")
def test_db():
    test_db = session_local()
    try:
        yield test_db
    finally:
        test_db.close()
