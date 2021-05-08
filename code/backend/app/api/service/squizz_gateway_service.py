import logging
import requests
import time
from typing import Tuple, Optional

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
    def create_session(self) -> Tuple[any, str]:
        header = {"Content-Type": "application/x-www-form-urlencoded"}
        parameter = {
            "org_id": self.org_id,
            "api_org_key": self.api_org_key,
            "api_org_pw": self.api_org_pw,
            "create_session": "Y"
        }
        try:
            data = self.requests.post(self.base_url + "/org/create_session", data=parameter, headers=header).json()
            if data["result"] == "SUCCESS" and data["result_code"] == "SERVER_SUCCESS":
                logger.info("Created a session in SQUIZZ")
                return data["session_id"], "LOGIN_SUCCESS"
            else:
                logger.debug('cannot create a session in squizz' + data["result_code"])
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
