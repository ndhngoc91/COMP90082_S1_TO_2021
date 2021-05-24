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


def test_login(test_app):
    login_data = {
        "username": "user1",
        "password": "squizz"
    }
    response = test_app.post("/auth/login", data=login_data)
    assert response.status_code == 200
    assert response.json()["username"] == "user1"


def test_login_with_wrong_passowrd(test_app):
    invalid_login_data = {
        "username": "user1",
        "password": "squizz1"
    }
    response = test_app.post("/auth/login", data=invalid_login_data)
    assert response.status_code == 404
