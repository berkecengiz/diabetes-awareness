from fastapi import APIRouter, status, Depends, HTTPException

from src.api.dependencies.dependencies import get_current_user
from src.schemas.LearningSchema import LearningIn, LearningOut
from src.services.LearningService import LearningService
from src.models.User import User

learning = APIRouter()


@learning.get(
    "/",
    summary="Get all the learning",
    response_model=LearningOut,
    status_code=status.HTTP_200_OK,
)
async def get_all_learnings(user: User = Depends(get_current_user)):
    if not user:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Could not validate credentials",
        )

    return await LearningService.get_learnings()


@learning.get(
    "/{title}",
    summary="Get learning by title",
    response_model=LearningOut,
    status_code=status.HTTP_200_OK,
)
async def get_learning_by_title(
    title: str,
    user: User = Depends(get_current_user),
):
    if not user:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Could not validate credentials",
        )

    return await LearningService.get_learning_by_title(title)


@learning.post(
    "/add",
    summary="Add new learning module",
    response_model=LearningOut,
    status_code=status.HTTP_201_CREATED,
)
async def add_new_learning(
    data: LearningIn,
):

    return await LearningService.create_new_learning(data)


@learning.put(
    "/{title}",
    summary="Update learning status",
    response_model=LearningOut,
    status_code=status.HTTP_200_OK,
)
async def update_learning_status(
    title: str,
    status: bool,
    user: User = Depends(get_current_user),
):

    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_NOT_FOUND,
            detail="Could not validate credentials",
        )

    return await LearningService.update_learning_status(title, status)
