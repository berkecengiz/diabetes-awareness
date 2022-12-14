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

    blood_sugar: Optional[int]
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
    weight: int
    blood_sugar: Optional[int]

    points_collected: int
    current_level: int

    created_at: datetime
    updated_at: datetime


class PatientUpdateIn(BaseModel):
    city: Optional[str]
    contact_number: Optional[str]
    weight: Optional[int]
    blood_sugar: Optional[int]
    emergency_contact_number: Optional[str]

    doctor_name: Optional[str]
    doctor_email: Optional[str]


class PatientDetailsIn(BaseModel):
    smoking: int = Field(..., description="Patient smoking level")
    alcohol: int = Field(..., description="Patient salt intake level")
    sugar: int = Field(..., description="Patient salt intake level")
    salt: int = Field(..., description="Patient salt intake level")
    activity: int = Field(..., description="Patient activity level")
    bread: int = Field(..., description="Patient bread intake")


class PatientDetailsOut(BaseModel):
    smoking: Optional[int]
    alcohol: Optional[int]
    sugar: Optional[int]
    salt: Optional[int]
    activity: Optional[int]
    bread: Optional[int]
