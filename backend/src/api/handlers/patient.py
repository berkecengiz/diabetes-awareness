from uuid import UUID

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
