from functools import lru_cache
from typing import List

from pydantic import AnyHttpUrl, BaseSettings


class Settings(BaseSettings):
    """Settings class has the configuration. Reads from environment variables."""

    # Base Settings
    AP1_V1_STR: str = "/api/v1"
    PROJECT_NAME: str = "Diabetes-Awareness-Backend"
    BACK_END_CORS_ORIGINS: List[AnyHttpUrl] = []

    # Database
    MONGODB_CONNECTION_STRING: str

    # Security
    JWT_SECRET_KEY: str
    JWT_REFRESH_SECRET_KEY: str
    ALGORITHM = "HS256"
    TOKEN_EXPIRATION_TIME: int = 15  # 15 Minutes
    REFRESH_TOKEN_EXPIRE_TIME: int = 60 * 25 * 5  # 5 Days

    class Config:
        env_file = ".env"


@lru_cache()
def get_settings() -> Settings:
    """Gets the application settings."""
    return Settings()
