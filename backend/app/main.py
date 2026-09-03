from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .config import settings
from .database import Base, engine
from .api.dashboard import router as dashboard_router
from .api.forecast import router as forecast_router
from .api.scenarios import router as scenarios_router
from .api.recommendations import router as recommendations_router

Base.metadata.create_all(bind=engine)

app = FastAPI(title=settings.app_name, version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.cors_origin, "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(dashboard_router)
app.include_router(forecast_router)
app.include_router(scenarios_router)
app.include_router(recommendations_router)

@app.get("/")
def root():
    return {"message": "Financial Autopilot API", "docs": "/docs"}

@app.get("/health")
def health():
    return {"status": "ok"}
