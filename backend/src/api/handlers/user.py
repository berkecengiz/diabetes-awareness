from typing import Any

import pymongo
from fastapi import APIRouter, Body, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from jose import jwt
from pydantic import ValidationError

from src.api.dependencies.dependencies import get_current_user
from src.core.config import get_settings
from src.core.security import create_access_token, create_refresh_token
from src.models.User import User
from src.schemas.TokenSchema import TokenPayload, TokenSchema
from src.schemas.UserSchema import UserIn, UserOut
from src.services.UserService import UserService

settings = get_settings()
user = APIRouter()


@user.post(
    "/register",
    summary="Create new user",
    response_model=UserOut,
    status_code=status.HTTP_201_CREATED,
)
async def sign_up(data: UserIn):
    try:
        return await UserService.create_user(data)
    except pymongo.errors.DuplicateKeyError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User with username or email already exist.",
        )


@user.post(
    "/login",
    summary="Create access and refresh tokens for user",
    response_model=TokenSchema,
    status_code=status.HTTP_200_OK,
)
async def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
) -> Any:
    user = await UserService.authenticate(
        username=form_data.username, password=form_data.password
    )
    if not user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Incorrect email or password",
        )

    return {
        "access_token": create_access_token(user.user_id),
        "refresh_token": create_refresh_token(user.user_id),
    }


@user.get(
    "/me",
    response_model=UserOut,
    status_code=status.HTTP_200_OK,
)
async def get_me(user: User = Depends(get_current_user)):
    return user


@user.post(
    "/refresh",
    summary="Refresh token",
    response_model=TokenSchema,
)
async def refresh_token(
    refresh_token: str = Body(...),
):
    try:
        payload = jwt.decode(
            refresh_token,
            settings.JWT_REFRESH_SECRET_KEY,
            algorithms=[settings.ALGORITHM],
        )
        token_data = TokenPayload(**payload)
    except (jwt.JWTError, ValidationError):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Invalid token",
            headers={"WWW-Authenticate": "Bearer"},
        )
    user = await UserService.get_user_by_id(token_data.sub)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Invalid token for user",
        )
    return {
        "access_token": create_access_token(user.user_id),
        "refresh_token": create_refresh_token(user.user_id),
    }
