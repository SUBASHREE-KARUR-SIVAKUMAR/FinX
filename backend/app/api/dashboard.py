from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..database import get_db
from ..services.financial_engine import build_dashboard

router = APIRouter(prefix="/api/dashboard", tags=["dashboard"])

@router.get("/{user_id}")
def dashboard(user_id: int, db: Session = Depends(get_db)):
    try:
        return build_dashboard(db, user_id)
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
