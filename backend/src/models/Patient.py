from datetime import datetime
from typing import List, Optional
from uuid import UUID

from beanie import Document, Indexed, Insert, Link, Replace, before_event
from pydantic import EmailStr, Field

from src.models.Suggestion import Suggestion
from src.models.User import User


class Patient(Document):
    user: Link[User]

    patient_id: UUID = Field(unique=True)

    name: Indexed(str)
    surname: Indexed(str)
    age: Indexed(int)
    sex: Indexed(str)

    blood_group: Indexed(str)

    city: Indexed(str)
    contact_number: Indexed(str, unique=True)

    height: Indexed(int)
    weight: Indexed(int)
    smoking_habits: Indexed(str)
    alcohol_consumption: Indexed(str)
    activity_level: Indexed(str)

    emergency_contact_number: Optional[str] = Field(default=None)
    doctor_name: Optional[str] = Field(default=None)
    doctor_email: Optional[EmailStr] = Field(default=None)

    type_of_diabetes: Indexed(str) = Field(default=None)

    points_collected: int = None
    current_level: int = None

    suggestions: Optional[List[Link[Suggestion]]]

    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    @before_event([Replace, Insert])
    def update_update_at(self):
        self.updated_at = datetime.utcnow()

    class Settings:
        name = "patient"
