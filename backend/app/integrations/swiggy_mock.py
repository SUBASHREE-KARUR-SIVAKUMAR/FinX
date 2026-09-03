from datetime import date, timedelta
import random

class SwiggyGigMock:
    """Mock gig-platform adapter. Replace with an authorized integration later."""

    def fetch_earnings(self, user_id: int):
        today = date.today()
        return [
            {
                "date": (today - timedelta(days=i)).isoformat(),
                "amount": round(random.uniform(550, 1500), 2),
                "type": "income",
                "category": "Gig earnings",
                "source": "SWIGGY_MOCK",
            }
            for i in range(14, -1, -1)
        ]
