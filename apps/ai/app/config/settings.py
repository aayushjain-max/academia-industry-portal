from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    ENVIRONMENT: str = "development"
    OPENAI_API_KEY: str = "placeholder-key"
    EMBEDDING_MODEL: str = "text-embedding-3-small"
    REDIS_URL: str = "redis://localhost:6379/0"

    class Config:
        env_file = ".env"
        extra = "ignore"

settings = Settings()
