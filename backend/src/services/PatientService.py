from typing import Optional
from uuid import UUID
from src.models.Patient import PatientHabits

from src.models.Patient import Patient
from src.models.User import User
from src.schemas.PatientSchema import PatientIn, PatientUpdateIn

# The number of points needed to level up at each level
POINTS_NEEDED_TO_LEVEL_UP = [
    100,
    250,
    500,
    1000,
    2500,
    5000,
    10000,
    25000,
    50000,
    100000,
]


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
        patient_id: UUID,
        points: int,
    ) -> Patient:
        patient = await Patient.find_one(Patient.patient_id == patient_id)

        if not patient:
            return

        patient.points_collected += points

        # Check if the patient has earned enough points to level up
        if patient.points_collected >= POINTS_NEEDED_TO_LEVEL_UP:
            patient.current_level += 1

        return patient

    @staticmethod
    async def create_patient_habits(
        patient: Patient,
        habits: PatientHabits,
    ) -> bool:
        new_habits = PatientHabits(**habits.dict())
        await new_habits.insert()

        patient.patient_habits = new_habits
        await patient.save()
        return True

    @staticmethod
    async def update_patient_habits(
        patient: Patient,
        habits: PatientHabits,
    ) -> bool:
        existing_habits = patient.patient_habits

        for field, value in habits.dict().items():
            existing_habits[field] = value

        await existing_habits.save()
        return True
