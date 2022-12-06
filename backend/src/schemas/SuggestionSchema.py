from datetime import datetime
from typing import Optional

from pydantic import BaseModel, Field


class SuggestionIn(BaseModel):
    title: str = Field(..., title="Title", max_length=55, min_length=1)
    description: str = Field(..., title="Description", max_length=55, min_length=1)
    category: str = Field(..., title="Suggestion category", max_length=20, min_length=1)
    status: bool = Field(..., title="Completion status")
    imageUrl: str = Field(..., title="Image URL")

    points_worth: int = Field(..., title="Completion points worth")


class SuggestionOut(BaseModel):
    title: str
    description: str
    category: str
    status: bool
    points_worth: int
    imageUrl: str

    created_at: datetime
    updated_at: datetime


class SuggestionUpdateIn(BaseModel):
    title: str
    description: str
    status: bool
    imageUrl: Optional[str]


class SuggestionUpdateOut(BaseModel):
    title: str
    status: str

    updated_at: datetime
