from app import config
from flask import session
from app.resource.session_resource import SessionResource
from app.service.squizz_gateway_service import SquizzGatewayService


# -- Helper functions
def validate_login_session():
    """
    Determine whether or not the current user
    has an existing session within the database

    Args:
        None
    """
    login_session = session.get('login_session')
    org_id = session.get('org_id')

    session_resource = SessionResource()
    if session_resource.validate_session(login_session, org_id):
        return True
    return False


def build_connection():
    """
    Builds an returns an object that represents
    a connection to the SQUIZZ platform

    Args:
        None
    """
    # Retrieve organisation API key and password from the database
    org_id = "2CCC5A6E71AE1B8636C96FBF76DF94EE"

    base_url = config.BASE_URL
    api_org_key = config.API_ORG_KEY
    api_org_pw = config.API_ORG_PASSWORD
    supplier_org_id = config.SUPPLIER_ORG_ID

    return SquizzGatewayService(base_url,
                                org_id,
                                api_org_key,
                                api_org_pw,
                                supplier_org_id)
