from datetime import datetime
from uuid import UUID, uuid4

from beanie import Document, Indexed, Insert, Replace, before_event
from pydantic import BaseModel, Field


class Suggestion(Document):
    suggestion_id: UUID = Field(default_factory=uuid4, unique=True)
    title: Indexed(str, unique=True)
    description: Indexed(str)
    category: Indexed(str)
    imageUrl: Indexed(str)

    status: bool
    points_worth: Indexed(int)

    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    @before_event([Replace, Insert])
    def update_update_at(self):
        self.updated_at = datetime.utcnow()

    class Settings:
        name = "suggestions"
