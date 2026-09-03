from datetime import date
from pydantic import BaseModel, Field

class ForecastPoint(BaseModel):
    date: date
    predicted: float

class DashboardResponse(BaseModel):
    user: dict
    safe_to_spend: float
    safety_floor: float
    resilience_score: int
    stress_probability: float
    weather: str
    forecast: list[ForecastPoint]
    recommendation: dict

class WhatIfRequest(BaseModel):
    income_change_pct: float = Field(default=0, ge=-100, le=500)
    days_unable_to_work: int = Field(default=0, ge=0, le=30)
    unexpected_expense: float = Field(default=0, ge=0, le=100000)

class WhatIfResponse(BaseModel):
    baseline_balance: float
    projected_balance: float
    baseline_risk: float
    scenario_risk: float
    impact: float
    recommendation: str
