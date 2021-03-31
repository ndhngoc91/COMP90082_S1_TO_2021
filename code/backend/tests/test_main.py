import json
import requests
from datetime import datetime

s = requests.Session()
squizz_sessions = []
base_url = "http://127.0.0.1:5000/"
null = None


def test_login():
    url = 'api/login'
    headers = {"Content-Type": "application/json"}

    data = {"username": "user1", "password": "123456789"}
    response = s.post(base_url + url, data=json.dumps(data), headers=headers)
    json_response = json.loads(response.text)
    assert json_response['status'] == "failure"

    data = {"username": "user1", "password": "squizz"}
    response = s.post(base_url + url, data=json.dumps(data), headers=headers)
    json_response = json.loads(response.text)
    assert json_response['status'] == "success"
    content = json_response['data']
    squizz_sessions.append(content['session_id'])
    # print(json_response['session_id'])


def test_barcode_search():
    if len(squizz_sessions) == 0:
        test_login()
    url = 'api/barcode'
    para = '?sessionKey=' + squizz_sessions[0] + '&barcode=933044000895'
    response = s.get(base_url + url + para)
    json_response = json.loads(response.text)
    assert json_response['status'] == "success"
    para1 = '?sessionKey=' + squizz_sessions[0] + '&barcode=123'
    response = s.get(base_url + url + para1)
    json_response = json.loads(response.text)
    assert json_response['status'] == "error"


# CANT USE THIS AS IT STORES DATA IN DATABASE
def test_product():
    if len(squizz_sessions) == 0:
        test_login()
    base_url = "http://127.0.0.1:5000/"
    url = 'api/product'
    para = '?sessionKey=' + squizz_sessions[0] + '&productCode=00089'
    response = s.get(base_url + url + para)
    json_response = json.loads(response.text)
    assert json_response['status'] == "success"
    para = '?sessionKey=' + squizz_sessions[0] + '&productCode=-1'
    response = s.get(base_url + url + para)
    json_response = json.loads(response.text)
    assert json_response['status'] == "error"


def test_history_order():
    if len(squizz_sessions) == 0:
        test_login()
    url = 'api/history'
    response = s.post(base_url + url)
    json_response = json.loads(response.text)
    assert json_response['status'] == "error"
    para = '?session_id=' + squizz_sessions[0]
    response = s.get(base_url + url + para)
    json_response = json.loads(response.text)
    assert json_response['status'] == "success"


# def test_submit_order():
#     if len(squizz_sessions) == 0:
#         test_login()
#     url = 'api/purchase'
#     headers = {"Content-Type": "application/json"}
#     order_details = [
#         {
#             "keyProductId": "21479231996639",
#             "productName": "test",
#             "quantity": "2",
#             "unitPrice": "1.38",
#             "totalPrice": "2.76",
#             "priceTotalIncTax": "0.00",
#             "priceTotalExTax": "0.00",
#             "productCode": "21479231996639",
#             "productId": "20",
#         }
#     ]
#     data = {'lines': order_details, 'sessionKey': squizz_sessions[0]}
#
#     response = s.post(base_url + url, data=json.dumps(data), headers=headers)
#     json_response = json.loads(response.text)
#     assert json_response['status'] == "error"
#     data = {'lines': order_details}
#     response = s.post(base_url + url, data=json.dumps(data), headers=headers)
#     json_response = json.loads(response.text)
#     assert json_response['status'] == "failure"
#
#     data = {}
#     response = s.post(base_url + url, data=json.dumps(data), headers=headers)
#     json_response = json.loads(response.text)
#     assert json_response['status'] == "failure"
#
#     data = {'sessionKey': squizz_sessions[0]}
#     response = s.post(base_url + url, data=json.dumps(data), headers=headers)
#     json_response = json.loads(response.text)
#     assert json_response['status'] == "failure"
#
#     order_details = [{
#         "barcode": "9326243001224",
#         "depth": 0,
#         "height": 0,
#         "id": 5,
#         "keyProductID": "21479231981826",
#         "lineType": "PRODUCT",
#         "price": 8.23,
#         "priceTotalExTax": 8.23,
#         "productCode": "01224",
#         "productName": "Tarpaulin 240cm x 300cm (8' x 10')",
#         "quantity": 1,
#         "stockLowQuantity": 0,
#         "stockQuantity": 0,
#         "totalPrice": 8.23,
#         "unitPrice": 8.23,
#         "volume": 0,
#         "weight": 0,
#         "width": 0}]
#     data = {'lines': order_details, 'sessionKey': squizz_sessions[0]}
#     response = s.post(base_url + url, data=json.dumps(data), headers=headers)
#     json_response = json.loads(response.text)
#     assert json_response['status'] == "success"


def test_logout():
    url = 'api/logout'
    response = s.get(base_url + url)
    json_response = json.loads(response.text)
    assert json_response['status'] == "success"
    squizz_sessions.pop()


def test_import_metadata():
    url = '/metadata/import'
    headers = {"Content-Type": "application/json"}
    data = {
        "Username": "user1",
        "Password": "squizz",
        "Products": [
            {
                "Code": "CFP-600-12",
                "ProductParameters": [{
                    "Key": "Name",
                    "Value": "CFP - 600/12 Swirl Diffusers  with  Low Profile Plenum 250 Spigot"
                }, {
                    "Key": "URL",
                    "Value": "http://www.holyoake.com"
                }, {
                    "Key": "Type Comments",
                    "Value": "Holyoake Swirl Diffuser CFP-600/12 c/w Low Profile Plenum."
                }, {
                    "Key": "Static Pressure Min",
                    "Value": "2 Pa"
                }, {
                    "Key": "Static Pressure Max",
                    "Value": "28 Pa"
                }, {
                    "Key": "Noise Level NC Min",
                    "Value": "5 NC"
                }, {
                    "Key": "Noise Level NC Max",
                    "Value": "32NC"
                }, {
                    "Key": "Model",
                    "Value": "CFP-600/12 Low Profile complete with low profile plenum."
                }, {
                    "Key": "Min Flow (Hvac Air Flow Liters Per Second)",
                    "Value": "25.000000000000"
                }, {
                    "Key": "Max Flow (Hvac Air Flow Liters Per Second)",
                    "Value": "200.000000000000"
                }, {
                    "Key": "Material Body",
                    "Value": "Holyoake-Aluminium"
                }, {
                    "Key": "Material - Face",
                    "Value": "Holyoake White"
                }, {
                    "Key": "Manufacturer",
                    "Value": "Holyoake"
                }, {
                    "Key": "d_r (Length Millimeters)",
                    "Value": "125.000000000000"
                }, {
                    "Key": "Inlet Spigot Diameter (Length Millimeters)",
                    "Value": "250.000000000000"
                }, {
                    "Key": "Plenum Box Height (Length Millimeters)",
                    "Value": "250.000000000000"
                }, {
                    "Key": "Holyoake Product Range",
                    "Value": "Holyoake Swirl Diffusers."
                }, {
                    "Key": "Flow Nom (Hvac Air Flow Liters Per Second)",
                    "Value": "112.500000000000"
                }, {
                    "Key": "Diffuser Width (Length Millimeters)",
                    "Value": "595.000000000000"
                }, {
                    "Key": "Plenum Box Width (Length Millimeters)",
                    "Value": "570.000000000000"
                }, {
                    "Key": "Description",
                    "Value": "Radial Swirl Diffusers, Ceiling Fixed Pattern shall be Holyoake Model CFP-600/12.  Ceiling Radial Swirl Diffusers shall be designed for use in Variable Air Volume (VAV) systems with Highly Turbulent Radial  Air Flow Pattern and shall be suitable for ceiling heights of 2.4 to 4m. Ceiling Radial Swirl Diffusers shall maintain a COANDA effect at reduced air volumes and provide uniform temperature gradients throughout the occupied space. Diffusers shall be finished in powder coat and fitted with accessories and dampers where indicated as manufactured by Holyoake"
                }]
            }

        ]
    }
    response = s.post(base_url + url, data=json.dumps(data), headers=headers)
    json_response = json.loads(response.text)
    assert json_response['status'] == "success"
    data = {
        "Username": "user1",
        "Password": "12345678",
        "Products": [
            {
                "Code": "CFP-600-12",
                "ProductParameters": [{
                    "Key": "Name",
                    "Value": "CFP - 600/12 Swirl Diffusers  with  Low Profile Plenum 250 Spigot"
                }]
            }

        ]
    }
    response = s.post(base_url + url, data=json.dumps(data), headers=headers)
    json_response = json.loads(response.text)
    assert json_response['status'] == "failure"
    data = {
        "Username": "user1",
        "Password": "squizz",
        "Products": [
            {
                "Code": "CFP-600-12777777",
                "ProductParameters": [{
                    "Key": "Name",
                    "Value": "CFP - 600/12 Swirl Diffusers  with  Low Profile Plenum 250 Spigot"
                }]
            }

        ]
    }
    response = s.post(base_url + url, data=json.dumps(data), headers=headers)
    json_response = json.loads(response.text)
    assert json_response['status'] == "partial success"


def test_import_model():
    url = '/threedmodel/import'
    headers = {"Content-Type": "application/json"}
    data = {"Username": "user1",
            "Password": "squizz",
            "Products": [{
                "Code": "CFP-600-20-LPP",
                "ProductParameters": null,
                "ModelURL": "https://s3-ap-southeast-2.amazonaws.com/awstest.project/3dModels/600_20_low Profile.glb"
            }]
            }
    response = s.post(base_url + url, data=json.dumps(data), headers=headers)
    json_response = json.loads(response.text)
    assert json_response['status'] == "success"
    data = {"Username": "user1",
            "Password": "123456789",
            "Products": [{
                "Code": "CFP-600-20-LPP",
                "ProductParameters": null,
                "ModelURL": "https://s3-ap-southeast-2.amazonaws.com/awstest.project/3dModels/600_20_low Profile.glb"
            }]
            }
    response = s.post(base_url + url, data=json.dumps(data), headers=headers)
    json_response = json.loads(response.text)
    assert json_response['status'] == "failure"
    data = {"Username": "user1",
            "Password": "squizz",
            "Products": [{
                "Code": "CFP-600-20-77777",
                "ProductParameters": null,
                "ModelURL": "https://s3-ap-southeast-2.amazonaws.com/awstest.project/3dModels/600_20_low Profile.glb"
            }]
            }
    response = s.post(base_url + url, data=json.dumps(data), headers=headers)
    json_response = json.loads(response.text)
    assert json_response['status'] == "partial success"


def test_get_metadata():
    if len(squizz_sessions) == 0:
        test_login()
    base_url = "http://127.0.0.1:5000"
    url = '/api/metadata/get'
    para = '?productCode=CFP-600-12-LPP-200'
    response = s.get(base_url + url + para)
    json_response = json.loads(response.text)
    assert json_response['found'] == True
    para = '?productCode=CFP-600-12-LPP'
    response = s.get(base_url + url + para)
    json_response = json.loads(response.text)
    assert json_response['found'] == False
