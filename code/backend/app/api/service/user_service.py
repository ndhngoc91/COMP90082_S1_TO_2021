import datetime
from fastapi import HTTPException
from starlette import status
from sqlalchemy.orm import Session
from app.api import token, schemas
from app.api.repository import user_repo, session_repo
from app.api.util import auth_util

import logging

logger = logging.getLogger(__name__)
logging.basicConfig(level=logging.DEBUG)


def get_all(db: Session):
    return user_repo.get_all(db=db)


def get_user_by_id(user_id: int, db: Session):
    return user_repo.get_one_by_id(user_id=user_id, db=db)


def create_user(request: schemas.UserWithAddresses, db: Session):
    return user_repo.create_user(request=request, db=db)


def check_username(username: str, db: Session):
    if user_repo.check_username(username=username, db=db):
        return
    raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail=f"Username already exists")


def validate(username: str, password: str, db: Session) -> dict:
    user = user_repo.authenticate(username=username, password=password, db=db)
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Credentials is not valid")

    if user.organization_str_id is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Org Id Not Found")

    connection = auth_util.build_connection(org_id=user.organization_str_id)
    session_id, status_code = connection.create_session()
    session_repo.create(
        schemas.Session(
            session_id=session_id,
            date=datetime.datetime.now(),
            user_id=user.id,
            organization_id=user.organization_id
        ),
        db=db
    )
    if status_code == "LOGIN_SUCCESS":
        access_token = token.create_access_token(data={"username": username,
                                                       "org_id": user.organization_str_id,
                                                       "session_id": session_id})
        return {"access_token": access_token, "token_type": "bearer"}
    else:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Failed to connect to Squizz")


def put(user_id: int, request: schemas.User, db: Session):
    return user_repo.put(user_id=user_id, request=request, db=db)
