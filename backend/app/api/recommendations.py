from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from ..database import get_db
from ..services.financial_engine import build_dashboard

router = APIRouter(prefix="/api/recommendation", tags=["recommendation"])

@router.get("/{user_id}")
def recommendation(user_id: int, db: Session = Depends(get_db)):
    return build_dashboard(db, user_id)["recommendation"]
