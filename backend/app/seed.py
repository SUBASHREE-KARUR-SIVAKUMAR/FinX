from datetime import date, timedelta
from pathlib import Path
import csv
from .database import Base, engine, SessionLocal
from .models import User, Transaction, Obligation

BASE = Path(__file__).resolve().parents[2]
CSV_PATH = BASE / "data" / "sample_transactions.csv"

def seed():
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()
    try:
        if db.query(User).count():
            return
        user = User(
            name="Demo Worker",
            occupation="Delivery Partner",
            current_balance=5000,
            emergency_buffer=1500,
        )
        db.add(user)
        db.commit()
        db.refresh(user)

        with open(CSV_PATH, newline="", encoding="utf-8") as f:
            for row in csv.DictReader(f):
                db.add(Transaction(
                    user_id=user.id,
                    txn_date=date.fromisoformat(row["date"]),
                    amount=float(row["amount"]),
                    transaction_type=row["type"],
                    category=row["category"],
                    source=row["source"],
                ))

        today = date.today()
        db.add_all([
            Obligation(user_id=user.id, due_date=today + timedelta(days=2), amount=1200, category="Rent", essential=1),
            Obligation(user_id=user.id, due_date=today + timedelta(days=4), amount=500, category="Phone + Internet", essential=1),
            Obligation(user_id=user.id, due_date=today + timedelta(days=6), amount=700, category="Existing commitment", essential=1),
        ])
        db.commit()
    finally:
        db.close()

if __name__ == "__main__":
    seed()
    print("Database seeded.")
