from fastapi import Depends
from fastapi.security import OAuth2PasswordBearer
from . import token

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")  # link to the login API


def get_current_user(data: str = Depends(oauth2_scheme)):
    return token.verify_token(data)
