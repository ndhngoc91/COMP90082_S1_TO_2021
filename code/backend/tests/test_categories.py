# implement test cases for the Categories router
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


def test_get_all_categories(test_app):
    response = test_app.get("/categories")
    assert response.status_code == 200
    assert len(response.json()) > 0