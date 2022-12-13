from datetime import datetime
from typing import List, Optional
from uuid import UUID

from beanie import Document, Indexed, Insert, Link, Replace, before_event
from pydantic import EmailStr, Field

from src.models.Suggestion import Suggestion
from src.models.User import User


class PatientHabits(Document):
    alcohol: Indexed(int)
    sugar: Indexed(int)
    salt: Indexed(int)
    smoking: Indexed(int)
    coffee: Indexed(int)
    activity: Indexed(int)


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

    activity_level: Optional[str]

    blood_sugar: Optional[int]

    emergency_contact_number: Optional[str] = Field(default=None)
    doctor_name: Optional[str] = Field(default=None)
    doctor_email: Optional[EmailStr] = Field(default=None)

    type_of_diabetes: Indexed(str) = Field(default=None)

    points_collected: int = 0
    current_level: int = 0

    suggestions: Optional[Link[List[Suggestion]]]
    patient_habits: Optional[Link[PatientHabits]]

    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    @before_event([Replace, Insert])
    def update_update_at(self):
        self.updated_at = datetime.utcnow()

    class Settings:
        name = "patient"

    class Config:
        arbitrary_types_allowed = True
