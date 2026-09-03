from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from ..database import get_db
from ..schemas import WhatIfRequest
from ..services.financial_engine import build_dashboard

router = APIRouter(prefix="/api/what-if", tags=["what-if"])

@router.post("/{user_id}")
def what_if(user_id: int, request: WhatIfRequest, db: Session = Depends(get_db)):
    dashboard = build_dashboard(db, user_id)
    base = dashboard["user"]["balance"]
    forecast_income = sum(x["predicted"] for x in dashboard["forecast"])

    # Approximate expense forecast from the dashboard's safety metrics.
    baseline = base + forecast_income - dashboard["safety_floor"]
    adjusted_income = forecast_income * (1 + request.income_change_pct / 100)
    work_loss = adjusted_income * min(request.days_unable_to_work / 7, 1)
    projected = max(-100000, baseline + adjusted_income - forecast_income - work_loss - request.unexpected_expense)

    baseline_risk = dashboard["stress_probability"]
    scenario_risk = min(99, max(1, baseline_risk + (request.unexpected_expense / 100) + max(0, -request.income_change_pct) * 0.7 + request.days_unable_to_work * 4))

    if scenario_risk >= 70:
        recommendation = "Protect liquidity: postpone discretionary spending and avoid unnecessary new debt."
    elif projected < dashboard["safety_floor"]:
        recommendation = "Increase the emergency buffer before making non-essential purchases."
    else:
        recommendation = "Scenario remains within the current safety range."

    return {
        "baseline_balance": round(base, 2),
        "projected_balance": round(projected, 2),
        "baseline_risk": round(baseline_risk, 1),
        "scenario_risk": round(scenario_risk, 1),
        "impact": round(projected - base, 2),
        "recommendation": recommendation,
    }
