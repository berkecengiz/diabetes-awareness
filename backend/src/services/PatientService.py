from typing import Optional
from uuid import UUID

from src.models.Patient import Patient
from src.models.User import User
from src.schemas.PatientSchema import PatientIn, PatientUpdateIn


class PatientService:
    @staticmethod
    async def get_patient_by_id(patient_id: UUID) -> Optional[Patient]:
        patient = await Patient.find_one(Patient.patient_id == patient_id)
        return patient

    @staticmethod
    async def create_new_patient(
        user: User,
        data: PatientIn,
    ) -> Patient:
        patient_id = user.user_id
        new_patient = Patient(**data.dict(), user=user, patient_id=patient_id)

        return await new_patient.insert()

    @staticmethod
    async def update_patient_profile(
        user: User,
        data: PatientUpdateIn,
    ) -> Patient:

        patient = await Patient.find_one(Patient.patient_id == user.user_id)
        await patient.update({"$set": data.dict(exclude_unset=True)})
        return patient

    @staticmethod
    async def get_patient_profile(
        user: User,
    ) -> Patient:
        user = await user.find_by_id(user.user_id)
        patient = await Patient.find_one(Patient.patient_id == user.user_id)
        return patient

    @staticmethod
    async def add_awareness_points(
        user: User,
        points: int,
    ) -> Patient:
        user = await user.find_by_id(user.user_id)
        patient = await Patient.find_one(Patient.patient_id == user.user_id)

        patient.current_points += points
        patient.save()

        return patient
