from datetime import datetime
from typing import Optional
from uuid import UUID

from pydantic import BaseModel, Field


class PatientIn(BaseModel):
    name: str = Field(..., description="Patient name", min_length=1, max_length=55)
    surname: str = Field(
        ..., description="Patient surname", min_length=1, max_length=55
    )
    age: int = Field(..., description="Patient age")
    sex: str = Field(..., description="Patient Sex")

    blood_group: str = Field(..., description="Patient blood group")
    city: str = Field(..., description="Patient current city")
    contact_number: str = Field(..., description="Patient contact number")
    height: int = Field(..., description="Patient height")
    weight: int = Field(..., desciption="Patient weight")
    smoking_habits: str = Field(..., description="Patient smoking habits")
    alcohol_consumption: str = Field(
        ..., description="Patient alcohol consumtion level"
    )
    activity_level: str = Field(..., description="Patient activity level")

    emergency_contact_number: Optional[str]
    doctor_name: Optional[str]
    doctor_email: Optional[str]

    type_of_diabetes: Optional[str]
    points_collected: Optional[int] = 0
    current_level: Optional[int] = 0


class PatientOut(BaseModel):
    patient_id: UUID
    name: str
    surname: str
    age: str
    sex: str
    city: str
    weight: str
    smoking_habits: str
    alcohol_consumption: str
    activity_level: str

    points_collected: int
    current_level: int

    created_at: datetime
    updated_at: datetime


class PatientUpdateIn(BaseModel):
    city: Optional[str]
    contact_number: Optional[str]
    weight: Optional[int]
    smoking_habits: Optional[str]
    alcohol_consumption: Optional[str]
    activity_level: Optional[str]

    emergency_contact_number: Optional[str]

    doctor_name: Optional[str]
    doctor_email: Optional[str]
