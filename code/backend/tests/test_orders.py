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


def test_get_all_orders(test_app):
    response = test_app.get("/orders")
    assert response.status_code == 200
    assert len(response.json()) > 0


def test_create_new_order(test_app):
    order_data = json.dumps({
        "user_id": 1,
        "start_date": "2021-05-28",
        "end_date": "2021-05-28",
        "description": "string",
        "order_details": [
            {
                "package_id": 1,
                "trail_id": 1,
                "package_cost": 0,
                "extras": [
                    {
                        "id": 1,
                        "cost": 0
                    }
                ],
                "recipient": {
                    "first_name": "string",
                    "last_name": "string",
                    "dob": "2021-05-28",
                    "height": 180,
                    "weight": 70,
                    "foot_size": 12,
                    "skill_level_id": 1
                }
            }
        ]
    })
    response = test_app.post("/orders", data=order_data)
    assert response.status_code == 201


def test_filter_orders(test_app):
    sql_query = "ruby"
    response = test_app.get(
        "/orders/filter?query={query}".format(query=sql_query))
    assert response.status_code == 200
    assert len(response.json()) > 0
    assert response.json()[0]["customer_first_name"] == "Ruby"


def test_details_of_one_order(test_app):
    order_id = 15
    response = test_app.get(
        "/orders/{order_id}/order-details".format(order_id=order_id))
    assert response.status_code == 200
    assert response.json()["order"]["id"] == order_id


def test_cancel_order(test_app):
    order_id = 15
    response = test_app.put(
        "/orders/{order_id}/cancel".format(order_id=order_id))
    assert response.status_code == 202
    assert len(response.json()) > 0
    
    cancelled_order = next((order for order in response.json() if order["id"] == order_id), None)
    assert cancelled_order != None
    assert cancelled_order["status"] == "Cancelled"
