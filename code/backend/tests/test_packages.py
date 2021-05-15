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


@pytest.fixture()
def sample_package():
    return json.dumps({
        "name": "string",
        "description": "string",
        "sellcode": "string",
        "category_id": 0,
        "age_group_id": 0,
        "skill_level_id": 0
    })

def test_get_all_packages(test_app):
    response = test_app.get("/packages")
    assert response.status_code == 200
    assert len(response.json()) > 0

def test_get_packages_by_category_id(test_app):
    response = test_app.get("/packages/filter?category_id=1")
    assert response.status_code == 200
    assert len(response.json()) > 0
    assert response.json()[0]["category_id"] == 1

def test_get_packages_by_skill_level_id(test_app):
    response = test_app.get("/packages/filter?skill_level_id=1")
    assert response.status_code == 200
    assert len(response.json()) > 0
    assert response.json()[0]["skill_level_id"] == 1

def test_get_packages_by_age_group_id(test_app):
    response = test_app.get("/packages/filter?age_group_id=1")
    assert response.status_code == 200
    assert len(response.json()) > 0
    assert response.json()[0]["age_group_id"] == 1

def test_get_packages_by_multiple_filters(test_app):
    response = test_app.get("/packages/filter?category_id=1&skill_level_id=1")
    assert response.status_code == 200
    assert len(response.json()) > 0
    assert response.json()[0]["category_id"] == 1
    assert response.json()[0]["skill_level_id"] == 1

    response = test_app.get("/packages/filter?category_id=1&skill_level_id=1&age_group_id=3")
    assert response.status_code == 200
    assert len(response.json()) > 0
    assert response.json()[0]["category_id"] == 1
    assert response.json()[0]["skill_level_id"] == 1
    assert response.json()[0]["age_group_id"] == 3

def test_get_packages_return_no_package(test_app):
    response = test_app.get("/packages/filter?category_id=0") # category_id starts with 1
    print(response.json())
    assert response.status_code == 200
    assert len(response.json()) == 0


def test_create_package(test_app, sample_package):
    response = test_app.post("/packages", data=sample_package)
    assert response.status_code == 201
    newly_created_id = response.json()["id"]
    test_app.delete_package(f"/packages/{newly_created_id}")


def test_delete_package(test_app, sample_package):
    response = test_app.post("/packages", data=sample_package)
    assert response.status_code == 201
    newly_created_id = response.json()["id"]
    delete_response = test_app.delete_package(f"/packages/{newly_created_id}")
    assert delete_response.status_code == 204
