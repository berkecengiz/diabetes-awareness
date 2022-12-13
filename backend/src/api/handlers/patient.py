from uuid import UUID
from src.models.Patient import PatientHabits

from fastapi import APIRouter, Depends, status, HTTPException

from src.api.dependencies.dependencies import get_current_user
from src.models.Patient import Patient
from src.models.User import User
from src.schemas.PatientSchema import PatientIn, PatientOut, PatientUpdateIn
from src.services.PatientService import PatientService

patient = APIRouter()


@patient.post(
    "/create-profile",
    summary="Create patient profile for current user",
    response_model=Patient,
    status_code=status.HTTP_201_CREATED,
)
async def create_new_patient(
    data: PatientIn,
    user: User = Depends(get_current_user),
):
    return await PatientService.create_new_patient(user, data)


@patient.put(
    "/update-profile",
    summary="Update patient profile of current user",
    response_model=PatientOut,
)
async def update_patient_profile(
    data: PatientUpdateIn,
    user: User = Depends(get_current_user),
):
    return await PatientService.update_patient_profile(user, data)


@patient.get(
    "/me",
    summary="Get patient profile for current user",
    response_model=PatientOut,
)
async def get_patient_profile(
    user: User = Depends(get_current_user),
):
    return await PatientService.get_patient_profile(user)


@patient.get(
    "/{patient_id}",
    summary="Get patient by patient ID",
    response_model=PatientOut,
)
async def get_patient_by_id(
    patient_id: UUID,
    user: User = Depends(get_current_user),
):
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_NOT_FOUND,
            detail="Could not validate credentials",
        )

    return await PatientService.get_patient_by_id(patient_id)


@patient.post(
    "/create-habits",
    summary="Create patient habits for current user",
    response_model=PatientHabits,
    status_code=status.HTTP_201_CREATED,
)
async def create_patient_habits(
    habits: PatientHabits,
    user: User = Depends(get_current_user),
):
    # Find the patient object for the current user
    patient = await Patient.find_one(Patient.patient_id == user.user_id)
    if not patient:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Patient not found",
        )

    # Create the patient habits
    success = await PatientService.create_patient_habits(patient, habits)
    if not success:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Error creating patient habits",
        )


@patient.put(
    "/update-habits",
    summary="Update patient habits for current user",
    response_model=bool,
)
async def update_patient_habits(
    habits: PatientHabits,
    user: User = Depends(get_current_user),
):
    patient = await Patient.find_one(Patient.patient_id == user.user_id)
    if not patient:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Patient not found",
        )

    success = await PatientService.update_patient_habits(patient, habits)
    if not success:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Error updating patient habits",
        )

    return success


@patient.get(
    "/habits",
    summary="Get patient habits for current user",
    response_model=PatientHabits,
)
async def get_patient_habits(
    user: User = Depends(get_current_user),
):
    # Find the patient object for the current user
    patient = await Patient.find_one(Patient.patient_id == user.user_id)
    if not patient:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Patient not found",
        )

    # Get the patient habits
    habits = await PatientService.get_patient_habits(patient)
    if not habits:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Patient habits not found",
        )

    return habits
