from typing import List

from src.models.Suggestion import Suggestion
from src.models.Patient import Patient
from src.schemas.SuggestionSchema import SuggestionIn
from src.services.PatientService import PatientService


class SuggestionService:
    @staticmethod
    async def create_new_suggestion(
        data: SuggestionIn,
    ) -> Suggestion:
        new_suggestion = Suggestion(**data.dict())
        return await new_suggestion.insert()

    @staticmethod
    async def get_suggestions() -> List[Suggestion]:
        suggestions = await Suggestion.find_all().to_list()
        return suggestions

    @staticmethod
    async def get_suggestion_by_title(title: str) -> Suggestion:
        suggestion = await Suggestion.find_one(Suggestion.title == title)
        return suggestion

    @staticmethod
    async def update_suggestion_status(
        title: str,
        status: bool,
        patient_id,
    ) -> Suggestion:
        suggestion = await Suggestion.find_one(Suggestion.title == title)
        suggestion.status = status

        if status:
            PatientService.add_awareness_points(patient_id, suggestion.points_worth)

        await suggestion.save()
        return suggestion

    @staticmethod
    async def save_image(
        suggestion: Suggestion,
        imageUrl: str,
    ) -> bool:
        suggestion = await Suggestion.find_one(Suggestion.title == suggestion.title)
        suggestion.imageUrl = imageUrl

        await suggestion.save()
        return suggestion
