from fastapi import APIRouter

from src.api.handlers.learning import learning
from src.api.handlers.patient import patient
from src.api.handlers.suggestion import suggestions
from src.api.handlers.user import user

router = APIRouter()

router.include_router(user, prefix="/users", tags=["users"])
router.include_router(patient, prefix="/patient", tags=["patient"])
router.include_router(suggestions, prefix="/suggestions", tags=["suggestions"])
router.include_router(learning, prefix="/learning", tags=["learning"])
