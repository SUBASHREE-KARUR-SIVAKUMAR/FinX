# backend/app/api/scenarios.py

from fastapi import APIRouter, Depends
from pydantic import BaseModel

router = APIRouter()

class CommunityJoinRequest(BaseModel):
    user_id: str
    contribution_percent: float # User chooses 2% to 5%

# Mocking a global pool for the hackathon demo
COMMUNITY_POOL = 15450.00 # Example: total money collected from all workers

@router.get("/community-status")
def get_community_status():
    return {
        "total_pool": COMMUNITY_POOL,
        "active_members": 42,
        "your_weekly_contribution": "₹120 - ₹300"
    }

@router.post("/request-emergency-payout")
def request_payout(user_id: str, amount: float, reason: str):
    # Logic: In a real app, this would need community voting
    # For the demo, we'll approve it if it's under a certain threshold
    if amount < 5000:
        return {
            "status": "Approved",
            "message": f"Emergency fund of ₹{amount} is being transferred to your account for {reason}."
        }
    return {"status": "Pending", "message": "Your request is under review by the Circle."}
