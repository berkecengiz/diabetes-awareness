from fastapi import APIRouter, status, Depends, HTTPException

from src.api.dependencies.dependencies import get_current_user
from src.models.User import User
from src.schemas.SuggestionSchema import SuggestionIn, SuggestionOut
from src.services.SuggestionService import SuggestionService

suggestions = APIRouter()


@suggestions.get(
    "/",
    summary="Get all the suggestions",
    status_code=status.HTTP_200_OK,
)
async def get_suggestions(user: User = Depends(get_current_user)):
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_NOT_FOUND,
            detail="Could not validate credentials",
        )
    return await SuggestionService.get_suggestions()


@suggestions.get(
    "/{title}",
    summary="Get suggestion by title",
    status_code=status.HTTP_200_OK,
)
async def get_suggestion_by_title(
    title: str,
    user: User = Depends(get_current_user),
):
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_NOT_FOUND,
            detail="Could not validate credentials",
        )
    return await SuggestionService.get_suggestion_by_title(title)


@suggestions.post(
    "/add",
    summary="Add new suggestion",
    response_model=SuggestionOut,
    status_code=status.HTTP_200_OK,
)
async def add_new_suggestion(data: SuggestionIn):
    return await SuggestionService.create_new_suggestion(data)


@suggestions.put(
    "/{title}",
    summary="Update suggestion status",
    status_code=status.HTTP_200_OK,
)
async def update_suggestion_status(
    title: str,
    status: bool,
    user: User = Depends(get_current_user),
):

    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_NOT_FOUND,
            detail="Could not validate credentials",
        )
    return await SuggestionService.update_suggestion_status(title, status)
