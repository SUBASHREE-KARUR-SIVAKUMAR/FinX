from fastapi import FastAPI
from pydantic import BaseModel
from typing import List, Optional
import random
import math
# 1. New Import for Memcode
from memcode import MemCode 

app = FastAPI(title="FinX - Financial Stress API")

# 2. Initialize Memcode (Use a placeholder key for now)
# In a real app, you'd get this from the Memcode dashboard
mc = MemCode(api_key="YOUR_MEMCODE_API_KEY")

class StressRequest(BaseModel):
    user_id: str = "user_123" # Added user_id to track memory
    current_balance: float
    upcoming_expenses: List[float] = []
    predicted_gig_income: float = 0.0
    volatility: Optional[float] = 0.25


def calculate_stress_score(
    current_balance: float, upcoming_expenses: List[float], predicted_gig_income: float, volatility: float = 0.25
):
    total_expenses = sum(upcoming_expenses)
    net_after = current_balance + predicted_gig_income - total_expenses

    liquidity = net_after / (total_expenses + 1)
    score_liq = 1 / (1 + math.exp((liquidity - 1.0) * 1.5))
    vol_penalty = min(max(volatility, 0.0), 1.0)

    raw = 0.7 * score_liq + 0.3 * vol_penalty
    stress = int(max(0, min(100, round(raw * 100))))

    return {
        "stress_score": stress,
        "net_after": round(net_after, 2),
        "total_expenses": round(total_expenses, 2),
        "liquidity": round(liquidity, 3),
        "volatility": vol_penalty,
    }


@app.post("/stress-score")
async def stress_score(req: StressRequest):
    """Calculate Stress Score and 'Remember' it using Memcode."""
    result = calculate_stress_score(
        req.current_balance, req.upcoming_expenses, req.predicted_gig_income, req.volatility
    )
    
    # 3. MEMORY FEATURE: Store this stress event in Memcode
    # This allows the AI to track if the user's stress is trending up or down.
    status = "High" if result["stress_score"] > 70 else "Stable"
    memory_fact = f"User stress was {result['stress_score']}% ({status}) with a balance of {req.current_balance}."
    
    try:
        # We 'upsert' a memory for this specific user
        mc.upsert(id=req.user_id, content=memory_fact)
    except Exception as e:
        print(f"Memcode error (likely missing key): {e}")

    return result


def simulate_what_if_scenarios(
    current_balance: float, upcoming_expenses: List[float], base_income: float, n: int = 100, volatility: float = 0.25
):
    scenarios = []
    total_expenses = sum(upcoming_expenses)

    for i in range(n):
        multiplier = random.gauss(1.0, volatility)
        income = max(0.0, base_income * multiplier)
        net_after = current_balance + income - total_expenses
        score = calculate_stress_score(current_balance, upcoming_expenses, income, volatility)["stress_score"]

        scenarios.append({
            "id": i + 1,
            "income": round(income, 2),
            "net_after": round(net_after, 2),
            "stress_score": score,
        })

    incomes = [s["income"] for s in scenarios]
    avg_income = round(sum(incomes) / len(incomes), 2)
    pct_negative = round(sum(1 for s in scenarios if s["net_after"] < 0) / len(scenarios), 2)

    return {"scenarios": scenarios, "average_income": avg_income, "pct_negative_net": pct_negative}


@app.post("/what-if")
def what_if(req: StressRequest, n: int = 100):
    return simulate_what_if_scenarios(req.current_balance, req.upcoming_expenses, req.predicted_gig_income, n=n, volatility=req.volatility)


# 4. NEW: Get AI Insights based on Memory
@app.get("/ai-advice/{user_id}")
async def get_ai_advice(user_id: str):
    """Retrieve memories from Memcode to provide personalized AI advice."""
    try:
        memories = mc.search(query="financial stress history", id=user_id)
        # In a real app, you'd pass these memories to an LLM like GPT-4
        return {"user_id": user_id, "past_memories": memories, "ai_nudge": "Based on your history, you tend to feel stressed on Fridays. Try saving ₹200 today!"}
    except:
        return {"message": "No memory found yet. Start by calculating a stress score!"}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
