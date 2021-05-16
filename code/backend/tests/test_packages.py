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


def test_get_all_packages(test_app):
    response = test_app.get("/packages")
    assert response.status_code == 200
    assert len(response.json()) > 0

def test_get_packages_by_query(test_app):
    sql_query = "Beginner Package - Adult" # Search by keywords in package names
    response = test_app.get("/packages/filter?query={query}".format(query=sql_query))
    assert response.status_code == 200
    assert len(response.json()) > 1
    assert response.json()[0]["name"] == sql_query

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

def test_create_and_delete_a_package(test_app):
    # Create a package
    package_data = json.dumps({
        "name": "Test Package 1",
        "description": "Test Package 1 has some descriptions",
        "category_id": 1,
        "age_group_id": 1,
        "skill_level_id": 1
    })
    response = test_app.post("/packages", data=package_data)
    assert response.status_code == 201
    assert response.json()["name"] == "Test Package 1"

    # Delete a package
    package_id_created = str(response.json()["id"])
    delete_response = test_app.delete("/packages/{package_id}".format(package_id=package_id_created))
    assert delete_response.status_code == 204

def test_create_an_invalid_package(test_app):
    invalid_package_data = json.dumps({
        "name": "Test Package 1",
        "description": "Test Package 1 has some descriptions",
        "category_id": None, # Should never be NULL
        "age_group_id": 1,
        "skill_level_id": 1
    })
    response = test_app.post("/packages", data=invalid_package_data)
    assert response.status_code == 422

def test_delete_a_package_that_does_not_exist(test_app):
    invalid_package_id = str(0) # package_id starts with 1
    delete_response = test_app.delete("/packages/{package_id}".format(package_id=invalid_package_id))
    assert delete_response.status_code == 204

def test_update_a_package(test_app):
    # Create a package
    package_data = json.dumps({
        "name": "Test Package 1",
        "description": "Test Package 1 has some descriptions",
        "category_id": 1,
        "age_group_id": 1,
        "skill_level_id": 1
    })
    post_response = test_app.post("/packages", data=package_data)
    assert post_response.status_code == 201
    assert post_response.json()["name"] == "Test Package 1"

    package_id_created = str(post_response.json()["id"])

    # Update the package
    updated_package_data = json.dumps({
        "name": "Test Package 2",
        "description": "Test Package 2 has some descriptions",
        "category_id": 1,
        "age_group_id": 2,
        "skill_level_id": 1
    })
    put_response = test_app.put("/packages/{package_id}".format(package_id=package_id_created),
                             data=updated_package_data)
    assert put_response.status_code == 202
    assert put_response.json() == 'UPDATED'

    # Delete the package
    delete_response = test_app.delete("/packages/{package_id}".format(package_id=package_id_created))
    assert delete_response.status_code == 204

def test_update_a_package_that_does_not_exist(test_app):
    updated_package_data = json.dumps({
        "name": "Test Package 3",
        "description": "Test Package 3 has some descriptions",
        "category_id": 1,
        "age_group_id": 3,
        "skill_level_id": 1
    })
    put_response = test_app.put("/packages/{package_id}".format(package_id="0"),
                                data=updated_package_data)
    assert put_response.status_code == 404
