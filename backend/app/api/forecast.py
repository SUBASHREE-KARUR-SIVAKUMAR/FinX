from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from ..database import get_db
from ..models import Transaction
from ..services.forecasting import forecast_series

router = APIRouter(prefix="/api/forecast", tags=["forecast"])

@router.get("/{user_id}")
def forecast(user_id: int, db: Session = Depends(get_db)):
    rows = db.query(Transaction).filter(
        Transaction.user_id == user_id,
        Transaction.transaction_type == "income"
    ).all()
    return forecast_series([{"date": x.txn_date, "amount": x.amount} for x in rows], 7)
