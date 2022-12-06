from typing import Optional
from uuid import UUID

from pydantic import BaseModel, EmailStr, Field


class UserIn(BaseModel):
    email: EmailStr = Field(..., description="User e-mail")
    username: str = Field(..., min_length=6, max_lenght=24, description="Username")
    password: str = Field(..., min_length=9, max_length=36, description="Password")


class UserOut(BaseModel):
    user_id: UUID
    username: str
    email: EmailStr


class UserUpdate(BaseModel):
    email: Optional[EmailStr] = None
