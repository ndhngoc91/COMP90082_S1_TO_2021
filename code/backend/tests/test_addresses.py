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


def test_get_addresses_by_user_id(test_app):
    response = test_app.get("/addresses?user_id=1")
    assert response.status_code == 200
    assert len(response.json()) > 0
    assert response.json()[0]["user_id"] == 1


def test_create_update_and_delete_address(test_app):
    address_data = json.dumps({
        "state": "NSW",
        "city": "Sydney",
        "postcode": "2000",
        "address_line": "Test address line 1",
        "user_id": 1,
        "order_id": 0
    })

    response = test_app.post("/addresses", data=address_data)
    assert response.status_code == 201
    assert response.json()["city"] == "Sydney"

    address_id_created = str(response.json()["id"])

    updated_address_data = json.dumps({
        "state": "NSW",
        "city": "Newcastle",
        "postcode": "2267",
        "address_line": "Test address line 2",
        "user_id": 1,
        "order_id": 0
    })
    put_response = test_app.put("/addresses/{address_id}".format(address_id=address_id_created),
                                data=updated_address_data)
    assert put_response.status_code == 202
    assert put_response.json() == 'UPDATED'

    delete_response = test_app.delete("/addresses/{address_id}".format(address_id=address_id_created))
    assert delete_response.status_code == 204


def test_delete_an_address_that_does_not_exit(test_app):
    invalid_address_id = str(0)
    delete_response = test_app.delete("/addresses/{address_id}".format(address_id=invalid_address_id))
    assert delete_response.status_code == 204
