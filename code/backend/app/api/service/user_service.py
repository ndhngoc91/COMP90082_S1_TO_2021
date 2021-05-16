import datetime
import json
from typing import Optional
from fastapi import HTTPException
from starlette import status
from sqlalchemy.orm import Session
from app.api import token, schemas, models
from app.api.repository import user_repo, session_repo
from app.api.util import auth_util


def get_all_users(db: Session):
    return user_repo.get_all_users(db=db)


def get_user_by_id(user_id: int, db: Session):
    return user_repo.get_user_by_id(user_id=user_id, db=db)


def filter_users(query: Optional[str], db: Session):
    return user_repo.filter_users(query=query, db=db)


def create_new_user(request: schemas.UserWithAddresses, db: Session):
    return user_repo.create_new_user(request=request, db=db)


def validate(username: str, password: str, db: Session) -> dict:
    user = user_repo.authenticate(username=username, password=password, db=db)
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Credentials are not valid")

    is_user_enabled = user_repo.is_enable(username=username, db=db)
    if not is_user_enabled:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Account is disabled")

    connection = auth_util.build_connection(org_id="11EA64D91C6E8F70A23EB6800B5BCB6D")  # temporarily hardcoded
    session_id, status_code = connection.create_session()
    session_repo.create_new_session(
        schemas.Session(
            session_id=session_id,
            date=datetime.datetime.now(),
            user_id=user.id,
            organization_id=1  # temporarily hardcoded
        ),
        db=db
    )

    if status_code == "LOGIN_SUCCESS":
        access_token = token.create_access_token(data={"username": user.username,
                                                       "org_id": "11EA64D91C6E8F70A23EB6800B5BCB6D",
                                                       "session_id": session_id})
        user.access_token = access_token
        user.token_type = "Bearer"
        return user
    else:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Failed to connect to Squizz")


def update_user(user_id: int, request: schemas.UserWithoutPassword, db: Session):
    return user_repo.update_user(user_id=user_id, request=request, db=db)
