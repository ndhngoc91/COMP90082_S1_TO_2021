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
def sample_category():
    return json.dumps({
        "name": "New Package",
        "description": "New Package",
        "what_is_included": "New Package",
        "available": "New Package"
    })

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


def test_get_all_categories(test_app):
    response = test_app.get("categories")
    assert response.status_code == 200
    assert len(response.json()) == 4

def test_list_category_details(test_app):
    response = test_app.get("categories?days=2&category_id=4")
    assert response.status_code == 200
    assert len(response.json()) == 4


