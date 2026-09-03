from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    app_name: str = "Financial Autopilot API"
    database_url: str = "sqlite:///./financial_autopilot.db"
    cors_origin: str = "http://localhost:5173"

settings = Settings()
