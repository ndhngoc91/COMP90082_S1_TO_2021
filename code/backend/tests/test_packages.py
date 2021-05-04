import pytest
import json
from app.api.repository import package


@pytest.fixture(autouse=True, scope="function")
def run_around_tests():
    setup()
    yield
    teardown()


def setup():
    pass


def teardown():
    pass


@pytest.fixture()
def sample_package():
    return json.dumps({
        "name": "New Package",
        "description": "New Package",
        "what_is_included": "New Package",
        "available": "New Package"
    })


def test_get_all_packages(test_app):
    response = test_app.get("/packages")
    assert response.status_code == 200
    assert len(response.json()) > 0


def test_create_package(test_app, sample_package):
    response = test_app.post("/packages", data=sample_package)
    assert response.status_code == 201
    newly_created_id = response.json()["id"]
    test_app.delete(f"/packages/{newly_created_id}")


def test_delete_package(test_app, sample_package):
    response = test_app.post("/packages", data=sample_package)
    assert response.status_code == 201
    newly_created_id = response.json()["id"]
    delete_response = test_app.delete(f"/packages/{newly_created_id}")
    assert delete_response.status_code == 204
