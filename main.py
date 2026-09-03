from fastapi import FastAPI
from pydantic import BaseModel
from typing import List, Optional
import random
import math

app = FastAPI(title="FinX - Financial Stress API")


class StressRequest(BaseModel):
	current_balance: float
	upcoming_expenses: List[float] = []
	predicted_gig_income: float = 0.0
	volatility: Optional[float] = 0.25


def calculate_stress_score(
	current_balance: float, upcoming_expenses: List[float], predicted_gig_income: float, volatility: float = 0.25
):
	total_expenses = sum(upcoming_expenses)
	net_after = current_balance + predicted_gig_income - total_expenses

	# Liquidity: how much buffer remains relative to expenses
	liquidity = net_after / (total_expenses + 1)

	# Map liquidity to a 0..1 stress contribution using a logistic curve
	# higher liquidity -> lower stress contribution
	score_liq = 1 / (1 + math.exp((liquidity - 1.0) * 1.5))

	# Volatility penalty (0..1)
	vol_penalty = min(max(volatility, 0.0), 1.0)

	# Combine factors: liquidity has larger weight, volatility adds baseline risk
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
def stress_score(req: StressRequest):
	"""Calculate a Financial Stress Score for the provided inputs."""
	return calculate_stress_score(
		req.current_balance, req.upcoming_expenses, req.predicted_gig_income, req.volatility
	)


def simulate_what_if_scenarios(
	current_balance: float, upcoming_expenses: List[float], base_income: float, n: int = 100, volatility: float = 0.25
):
	"""Mock simulation: produce `n` what-if income scenarios by sampling income volatility.

	Each scenario perturbs `base_income` by a Gaussian multiplier with mean 1 and stdev `volatility`.
	Returns detailed per-scenario results plus a small summary.
	"""
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
	"""Endpoint to run the 100 (or `n`) mock what-if scenarios."""
	return simulate_what_if_scenarios(req.current_balance, req.upcoming_expenses, req.predicted_gig_income, n=n, volatility=req.volatility)


if __name__ == "__main__":
	import uvicorn

	uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)

