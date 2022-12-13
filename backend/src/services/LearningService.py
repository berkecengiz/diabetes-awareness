from typing import List
from src.services.PatientService import PatientService

from src.models.Learning import Learning
from src.schemas.LearningSchema import LearningIn


class LearningService:
    @staticmethod
    async def create_new_learning(
        data: LearningIn,
    ) -> Learning:
        new_learning = Learning(**data.dict())
        return await new_learning.insert()

    @staticmethod
    async def get_learnings() -> List[Learning]:
        learnings = await Learning.find_all().to_list()
        return learnings

    @staticmethod
    async def get_learning_by_title(title: str) -> Learning:
        learning = await Learning.find_one(Learning.title == title)
        return learning

    @staticmethod
    async def update_learning_status(
        title: str,
        status: bool,
        patient_id,
    ) -> Learning:
        learning = await Learning.find_one(Learning.title == title)
        learning.status = status

        PatientService.add_awareness_points(patient_id, learning.points_worth)

        await learning.save()
        return learning

    @staticmethod
    async def save_image(
        learning: Learning,
        imageUrl: str,
    ) -> bool:
        learning = await Learning.find_one(Learning.title == learning.title)
        learning.imageUrl = imageUrl

        await learning.save()
        return learning
