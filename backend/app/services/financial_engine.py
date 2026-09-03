from datetime import date, timedelta
from sqlalchemy.orm import Session
from ..models import User, Transaction, Obligation
from .forecasting import forecast_series
from .recommendation_engine import make_recommendation

def build_dashboard(db: Session, user_id: int = 1):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise ValueError("User not found")

    txns = db.query(Transaction).filter(Transaction.user_id == user_id).all()
    obligations = db.query(Obligation).filter(Obligation.user_id == user_id).all()

    income = [{"date": t.txn_date, "amount": t.amount} for t in txns if t.transaction_type == "income"]
    expenses = [{"date": t.txn_date, "amount": t.amount} for t in txns if t.transaction_type == "expense"]

    income_fc = forecast_series(income, 7)
    expense_fc = forecast_series(expenses, 7)

    expected_income = sum(x["predicted"] for x in income_fc)
    expected_expenses = sum(x["predicted"] for x in expense_fc)
    upcoming = sum(o.amount for o in obligations if o.due_date <= date.today() + timedelta(days=7))
    safety_floor = round(max(user.emergency_buffer, upcoming * 0.5, 1000), 2)

    projected_balance = user.current_balance + expected_income - expected_expenses - upcoming
    safe_to_spend = max(0, round(user.current_balance + expected_income - expected_expenses - upcoming - safety_floor, 2))

    volatility = _income_volatility(income)
    coverage_days = user.emergency_buffer / max(expected_expenses / 7, 1)
    stress_probability = min(95, max(5, round(
        45 + volatility * 35 + (1 if projected_balance < safety_floor else -1) * 20 - min(coverage_days, 10) * 1.5
    , 1)))

    weather = "Stable" if stress_probability < 40 else "Caution" if stress_probability < 70 else "Financial Storm"
    resilience = max(0, min(100, round(100 - stress_probability + min(coverage_days * 2, 20))))

    rec = make_recommendation(
        safe_to_spend,
        stress_probability,
        user.emergency_buffer,
        max(0, upcoming + expected_expenses - expected_income),
    )

    return {
        "user": {
            "id": user.id,
            "name": user.name,
            "occupation": user.occupation,
            "balance": round(user.current_balance, 2),
            "emergency_buffer": round(user.emergency_buffer, 2),
        },
        "safe_to_spend": safe_to_spend,
        "safety_floor": safety_floor,
        "resilience_score": resilience,
        "stress_probability": stress_probability,
        "weather": weather,
        "forecast": income_fc,
        "recommendation": rec,
    }

def _income_volatility(rows):
    if len(rows) < 3:
        return 0.3
    import statistics
    vals = [r["amount"] for r in rows]
    mean = statistics.mean(vals) or 1
    return min(1.0, statistics.pstdev(vals) / mean)
