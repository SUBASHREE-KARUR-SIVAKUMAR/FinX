from datetime import date, timedelta
import random

class AccountAggregatorMock:
    """Synthetic AA-like interface for the hackathon. Never handles real credentials."""

    def fetch_transactions(self, user_id: int):
        today = date.today()
        categories = ["Food", "Fuel", "Bills", "Transport", "Discretionary"]
        rows = []
        for i in range(30):
            d = today - timedelta(days=29-i)
            rows.append({
                "date": d.isoformat(),
                "amount": round(random.uniform(120, 650), 2),
                "type": "expense",
                "category": random.choice(categories),
                "source": "AA_MOCK",
            })
        return rows
