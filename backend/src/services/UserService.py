from typing import Optional
from uuid import UUID

import pymongo

from src.core.security import get_password, verify_password
from src.models.User import User
from src.schemas.UserSchema import UserIn, UserUpdate


class UserService:
    @staticmethod
    async def create_user(user: UserIn):
        user_in = User(
            username=user.username,
            email=user.email,
            hashed_password=get_password(user.password),
        )

        await user_in.save()
        return user_in

    @staticmethod
    async def authenticate(username: str, password: str) -> Optional[User]:
        user = await UserService.get_user_by_username(username)
        if not user:
            return None
        if not verify_password(password, hashed_pass=user.hashed_password):
            return None

        return user

    @staticmethod
    async def get_user_by_username(username: str) -> Optional[User]:
        user = await User.find_one(User.username == username)
        return user

    @staticmethod
    async def get_user_by_id(id: UUID) -> Optional[User]:
        user = await User.find_one(User.user_id == id)
        return user

    @staticmethod
    async def update_user(id: UUID, data: UserUpdate) -> User:
        user = await User.find_one(User.user_id == id)
        if not user:
            raise pymongo.errors.OperationFailure("User not found")

        await user.update({"$set": data.dict(exclude_unset=True)})
        return user
