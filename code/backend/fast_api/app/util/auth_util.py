from app import config, schemas
from app.service.squizz_gateway_service import SquizzGatewayService


def build_connection(org_id: str):
    base_url = config.BASE_URL
    api_org_key = config.API_ORG_KEY
    api_org_pw = config.API_ORG_PASSWORD
    supplier_org_id = config.SUPPLIER_ORG_ID

    return SquizzGatewayService(base_url,
                                org_id,
                                api_org_key,
                                api_org_pw,
                                supplier_org_id)
