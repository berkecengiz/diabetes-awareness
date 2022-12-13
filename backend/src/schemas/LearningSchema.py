from datetime import datetime

from pydantic import BaseModel, Field


class LearningIn(BaseModel):
    title: str = Field(..., title="Title", max_length=55, min_length=1)
    description: str = Field(..., title="Description")
    category: str = Field(..., title="Suggestion category", max_length=20, min_length=1)
    status: bool = Field(..., title="Completion status")
    imageUrl: str = Field(..., title="Image URL")

    points_worth: int = Field(..., title="Completion points worth")


class LearningOut(BaseModel):
    title: str
    description: str
    category: str
    status: bool
    imageUrl: str
    points_worth: int


class LearningUpdate(BaseModel):
    title: str
    status: bool


class LearningUpdateOut(BaseModel):
    title: str
    status: str

    updated_at: datetime
