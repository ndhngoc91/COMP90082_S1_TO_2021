# implement test cases for the Product router
import pytest
import json


@pytest.fixture(autouse=True, scope="function")
def run_around_tests():
    setup()
    yield
    teardown()


def setup():
    pass


def teardown():
    pass


def test_get_all_products(test_app):
    response = test_app.get("/products")
    assert response.status_code == 200
    assert len(response.json()) > 0