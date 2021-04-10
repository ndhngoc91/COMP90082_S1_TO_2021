from app.Util import AuthUtil as authUtil
from flask import session
from app.Resource.UserResource import UserResource
from app.Resource.SessionResource import SessionResource
import logging

logger = logging.getLogger(__name__)
logging.basicConfig(level=logging.DEBUG)


def validate(username: str, password: str) -> dict:
    try:
        user_resource = UserResource()
        org_id = user_resource.validate_username_password(username, password)
    except AttributeError:
        return {'status': "failure", 'data': {"session_id": None}, "message": "LOGIN_WRONG"}

    if org_id is None:
        # wrong username or password
        return {'status': "failure", 'data': {"session_id": None}, "message": "LOGIN_WRONG"}

    session['org_id'] = org_id
    print(org_id)
    connection = authUtil.build_connection()
    session_id, status_code = connection.create_session()
    print(session_id)
    print(status_code)
    if status_code == "LOGIN_SUCCESS":
        session.permanent = True
        session['seesion_id'] = session_id
        session['login_session'] = session_id
        session_resource = SessionResource()
        session_resource.store_session(username, session_id, org_id)
        logger.info(f"Created a new login session with ID: {session_id}")
        return {'status': "success", 'data': {"session_id": session_id}, "message": "LOGIN_SUCCESS"}

    else:
        return {'status': "failure", 'data': {"session_id": None}, "message": status_code}
