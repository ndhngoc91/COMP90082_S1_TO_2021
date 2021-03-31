
import logging
from app.Resource.SessionResource import SessionResource
from flask import Blueprint, request, jsonify, session
from requests.sessions import Session
from app.Util import AuthUtil as authUtil
from app.Resource.UserResource import UserResource
from app.Service import UserService as user_service
from app.Model.User import User

logger = logging.getLogger(__name__)
logging.basicConfig(level=logging.DEBUG)

# Configure Flask application
user = Blueprint('user', __name__)

# Initialise database resource objects
user_resource = UserResource()
session_resource = SessionResource()

# Set routes
@user.route('/api/login', methods=['POST'])
def login_post():
    if authUtil.validate_login_session():
        result = {
            'status': "success",
            "message": "LOGIN_EXIST",
            'data': {
                "session_id": session.get('login_session')
            }
        }
        return jsonify(result)

    data = request.get_json(silent=True)
    user = User(data)
    return jsonify(user_service.validate(user.username, user.password))


@user.route('/api/logout', methods=['GET'])
def logout():
    login_session = session.get('login_session')
    if authUtil.validate_login_session():
        session_resource.delete_session(login_session)
        session.pop('login_session ', None)
        session.pop('session_id ', None)
        session.pop('org_id', None)
        logger.info("Session has been deleted")
        result = {'status': "success", "message": "LOGOUT_SUCCESS"}
        return jsonify(result)

    result = {'status': "failure", "message": "LOGOUT_FAILURE"}
    return jsonify(result)
