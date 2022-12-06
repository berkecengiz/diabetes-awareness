import datetime
from typing import Optional
from uuid import UUID, uuid4

from beanie import Document, Indexed
from pydantic import EmailStr, Field


class User(Document):
    user_id: UUID = Field(default_factory=uuid4)
    username: Indexed(str, unique=True)
    email: Indexed(EmailStr, unique=True)
    hashed_password: str
    isActive: Optional[bool] = True

    def __repr__(self) -> str:
        return f"<User {self.username}>"

    def __str__(self) -> str:
        return self.username

    def __hash__(self) -> int:
        return hash(self.username)

    def __eq__(self, other: object) -> bool:
        if isinstance(other, User):
            return self.username == other.username
        return False

    @property
    def create(self) -> datetime:
        return self.id.generation_time

    @classmethod
    async def find_by_username(self, username: str) -> "User":
        return await self.find_one(self.username == username)

    @classmethod
    async def find_by_id(self, id: str) -> "User":
        return await self.find_one(self.user_id == id)

    class Settings:
        name = "users"
