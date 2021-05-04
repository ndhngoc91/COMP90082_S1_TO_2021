from fastapi import HTTPException
from starlette import status

from app.api import token
from app.api.resource.session_resource import SessionResource
from app.api.resource.user_resource import UserResource
import logging

from app.api.util import auth_util

logger = logging.getLogger(__name__)
logging.basicConfig(level=logging.DEBUG)


def validate(username: str, password: str) -> dict:
    try:
        user_resource = UserResource()
        org_id = user_resource.validate_username_password(username, password)
    except AttributeError:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Credentials is not valid")

    if org_id is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Org Id Not Found")

    connection = auth_util.build_connection(org_id=org_id)
    session_id, status_code = connection.create_session()
    session_resource = SessionResource()
    session_resource.store_session(username, session_id, org_id)
    if status_code == "LOGIN_SUCCESS":
        access_token = token.create_access_token(data={"username": username,
                                                       "org_id": org_id,
                                                       "session_id": session_id})
        return {"access_token": access_token, "token_type": "bearer"}
    else:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Failed to connect to Squizz")
