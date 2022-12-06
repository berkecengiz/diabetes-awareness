from beanie import init_beanie
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from motor.motor_asyncio import AsyncIOMotorClient

from src.api.router import router
from src.core.config import get_settings
from src.models.Learning import Learning
from src.models.Patient import Patient
from src.models.Suggestion import Suggestion
from src.models.User import User

settings = get_settings()

app = FastAPI(
    title=settings.PROJECT_NAME,
    openapi_url=f"{settings.AP1_V1_STR}/openapi.json",
)

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
async def app_init():
    """Initilize application services"""
    mongo_client = AsyncIOMotorClient(
        settings.MONGODB_CONNECTION_STRING
    ).diabetes_awareness_db

    await init_beanie(
        database=mongo_client,
        document_models=[User, Patient, Suggestion, Learning],
    )


app.mount("/static", StaticFiles(directory="static"), name="static")
app.include_router(router, prefix=settings.AP1_V1_STR)
