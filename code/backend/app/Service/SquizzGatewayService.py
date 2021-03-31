import logging
import requests
import time
from typing import Tuple, Optional

from app.Model.Customer import Customer
from app.Model.OrderDetail import OrderDetail
from app.Model.Organization import Organization
from app.Model.Product import Product
from app.Model.Category import Category
from app.Model.Price import Price


logger = logging.getLogger(__name__)
logging.basicConfig(level=logging.DEBUG)


class SquizzGatewayService:
    """
    This class represents a connection, or session, to the SQUIZZ Platform API
    """

    def __init__(self, base_url: str, org_id: str, api_org_key: str, api_org_pw: str, supplier_org_id: str):
        self.base_url = base_url
        self.org_id = org_id
        self.api_org_key = api_org_key
        self.api_org_pw = api_org_pw
        self.supplier_org_id = supplier_org_id
        self.requests = requests.Session()

    # Web Service Endpoint: Create Organisation API Session
    def create_session(self) -> Tuple[str, str]:
        header = {"Content-Type": "application/x-www-form-urlencoded"}
        parameter = {"org_id": self.org_id, "api_org_key": self.api_org_key, "api_org_pw": self.api_org_pw, "create_session": "Y" }
        try:
            data = self.requests.post(self.base_url + "/org/create_session", data = parameter, headers=header).json()    
            if data["result"] == "SUCCESS" and data["result_code"] == "SERVER_SUCCESS":
                logger.info("Created a session in SQUIZZ")
                return data["session_id"], "LOGIN_SUCCESS"
            else:
                logger.debug('cannot create a session in squizz'+ data["result_code"])
                return None, data["result_code"]
        
        except Exception as e:
            logger.debug("Could not create organisation API session. %s", e)
            return None, "SERVER_ERROR_UNKNOWN"

    # Web Service Endpoint: Destroy Organisation API Session
    def destroy_session(self, session_id: str) -> bool:
        if session_id is None:
            return False
        data = self.requests.get(self.base_url + "/org/destroy_session/" + session_id).json()
        if data["result"] == "SUCCESS":
            logger.info(f"Session with ID {session_id} destroyed")
            return True
        else:
            logger.debug("Could not destroy organisation API session")
            return False

    # Web Service Endpoint: Validate Organisation API Session
    def validate_session(self, session_id: str) -> bool:
        if session_id is None:
            return False
        data = self.requests.get(self.base_url + "/org/validate_session/" + session_id).json()
        if data["result"] == "SUCCESS":
            if data["session_valid"] == "Y":
                return True
            else:
                return False
        else:
            logger.debug("Could not validate organisation API session")
            return False

    # Web Service Endpoint: Retrieve Organisation Data
    def retrieve_organisation_data(self, data_type: int, customer_code='TESTDEBTOR') -> Tuple[bool, Optional[list]]:
        assert(data_type == 3 or data_type == 8 or data_type == 37)

        session_id, _ = self.create_session()
        params = {
            "session_id": session_id,
            "supplier_org_id": self.supplier_org_id,
            "data_type_id": data_type,
            "customer_account_code": customer_code  # Default customer account code is TESTDEBTOR
        }
        
        response = self.requests.get("https://api.squizz.com/rest/1/org/retrieve_esd/" + session_id, params=params).json()
        if response["resultStatus"] == 1:
            if data_type == 3:
                data = [Product(entry) for entry in response['dataRecords']]
            elif data_type == 8:
                data = [Category(entry) for entry in response['dataRecords']]
            else:
                data = [Price(entry) for entry in response['dataRecords']]
            return True, data

        return False, None

    """
    Post order to SQUIZZ
    """
    def submit_order(self, org: Organization, customer: Customer, order_details_list: [OrderDetail]):
        session_id, _ = self.create_session()
        header = {"Content-Type": "application/json"}
        purchase_url = (f"https://api.squizz.com/rest/1/org/procure_purchase_order_from_supplier/{session_id}\
        ?supplier_org_id={org.supplierOrgId}&customer_account_code={customer.customer_code}")

        uuid = int(time.time() * 1000000)
        data_record = {
            "keyPurchaseOrderID": uuid,
            "supplierAccountCode": org.accountCode,
            "lines": [
                {'lineType': detail.lineType, 'productCode': detail.productCode, 'quantity': detail.quantity}
                for detail in order_details_list
            ]
        }

        post_body = {
            "version": 1.3,
            "resultStatus": "1",
            "message": "The purchase order data has been successfully obtained.",
            "dataTransferMode": "COMPLETE",
            "totalDataRecords": 1,
            "configs": {},
            "dataRecords": [data_record]
        }
        # print(post_body)

        data = self.requests.post(purchase_url, json=post_body, headers=header).json()
        # print(data)
        lines_data = data['dataRecords'][0]['lines'].copy()

        # return the result code and line data of purchase, line data contains tax info.
        return data["result_code"], lines_data
