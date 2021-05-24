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


def test_get_all_users(test_app):
    response = test_app.get("/users")
    assert response.status_code == 200
    assert len(response.json()) > 0


def test_create_new_user(test_app):
    user_data = json.dumps({
        "username": "TestUsername1",
        "height": 180,
        "weight": 75,
        "foot_size": 300,
        "first_name": "TestFirstName",
        "last_name": "TestLastName",
        "gender": "Male",
        "birthday": "1990-01-01",
        "phone": "0481111111",
        "email": "test1@gmail.com",
        "din": 1,
        "is_enabled": 1,
        "skill_level_id": 1,
        "user_type_id": 1,
        "password": "TestPassword1",
        "address_list": [
            {
                "state": "VIC",
                "city": "Melbourne",
                "postcode": "3053",
                "address_line": "Test address line 1",
                "user_id": 0,
                "order_id": 0
            }
        ]
    })
    response = test_app.post("/users", data=user_data)
    assert response.status_code == 201
    assert response.json()["username"] == "TestUsername1"


def test_filter_users(test_app):
    sql_query = "user1"
    response = test_app.get("/users/filter?query={query}".format(query=sql_query))
    assert response.status_code == 200
    assert len(response.json()) > 0
    assert response.json()[0]["username"] == "user1"


def test_get_user_by_id(test_app):
    response = test_app.get("/users/filter?user_id=1")
    assert response.status_code == 200
    assert len(response.json()) > 0
    assert response.json()[0]["username"] == "user1"


def test_update_user(test_app):
    user_data = json.dumps({
        "username": "TestUsername2",
        "height": 180,
        "weight": 75,
        "foot_size": 300,
        "first_name": "TestFirstName",
        "last_name": "TestLastName",
        "gender": "Male",
        "birthday": "1990-01-01",
        "phone": "0481111111",
        "email": "test2@gmail.com",
        "din": 1,
        "is_enabled": 1,
        "skill_level_id": 1,
        "user_type_id": 1,
        "password": "TestPassword2",
        "address_list": [
            {
                "state": "VIC",
                "city": "Melbourne",
                "postcode": "3053",
                "address_line": "Test address line 2",
                "user_id": 0,
                "order_id": 0
            }
        ]
    })

    response = test_app.post("/users", data=user_data)
    assert response.status_code == 201
    assert response.json()["username"] == "TestUsername2"

    user_id_created = str(response.json()["id"])

    updated_user_data = json.dumps({
        "username": "TestUsername2",
        "height": 180,
        "weight": 90,
        "foot_size": 300,
        "first_name": "TestFirstName",
        "last_name": "TestLastName",
        "gender": "Male",
        "birthday": "1990-01-01",
        "phone": "0482222222",
        "email": "test2@gmail.com",
        "din": 2,
        "is_enabled": 1,
        "skill_level_id": 1,
        "user_type_id": 1,
    })

    put_response = test_app.put("/users/{user_id}".format(user_id=user_id_created),
                                data=updated_user_data)
    assert put_response.status_code == 202


def test_create_a_user_that_username_or_email_exists(test_app):
    user_data = json.dumps({
        "username": "TestUsername3",
        "height": 180,
        "weight": 75,
        "foot_size": 300,
        "first_name": "TestFirstName",
        "last_name": "TestLastName",
        "gender": "Male",
        "birthday": "1990-01-01",
        "phone": "0481111111",
        "email": "test3@gmail.com",
        "din": 1,
        "is_enabled": 1,
        "skill_level_id": 1,
        "user_type_id": 1,
        "password": "TestPassword3",
        "address_list": [
            {
                "state": "VIC",
                "city": "Melbourne",
                "postcode": "3053",
                "address_line": "Test address line 3",
                "user_id": 0,
                "order_id": 0
            }
        ]
    })
    response = test_app.post("/users", data=user_data)
    assert response.status_code == 201
    assert response.json()["username"] == "TestUsername3"

    duplicated_username_user_data = json.dumps({
        "username": "TestUsername3",
        "height": 180,
        "weight": 75,
        "foot_size": 300,
        "first_name": "TestFirstName",
        "last_name": "TestLastName",
        "gender": "Male",
        "birthday": "1990-01-01",
        "phone": "0481111111",
        "email": "test4@gmail.com",
        "din": 1,
        "is_enabled": 1,
        "skill_level_id": 1,
        "user_type_id": 1,
        "password": "TestPassword4",
        "address_list": [
            {
                "state": "VIC",
                "city": "Melbourne",
                "postcode": "3053",
                "address_line": "Test address line 4",
                "user_id": 0,
                "order_id": 0
            }
        ]
    })

    response = test_app.post("/users", data=duplicated_username_user_data)
    assert response.status_code == 409

    duplicated_email_user_data = json.dumps({
        "username": "TestUsername5",
        "height": 180,
        "weight": 75,
        "foot_size": 300,
        "first_name": "TestFirstName",
        "last_name": "TestLastName",
        "gender": "Male",
        "birthday": "1990-01-01",
        "phone": "0481111111",
        "email": "test3@gmail.com",
        "din": 1,
        "is_enabled": 1,
        "skill_level_id": 1,
        "user_type_id": 1,
        "password": "TestPassword5",
        "address_list": [
            {
                "state": "VIC",
                "city": "Melbourne",
                "postcode": "3053",
                "address_line": "Test address line 5",
                "user_id": 0,
                "order_id": 0
            }
        ]
    })

    response = test_app.post("/users", data=duplicated_email_user_data)
    assert response.status_code == 409
