from sqlalchemy import Column, Integer, String, Float, Date, DateTime
from datetime import datetime
from .database import Base

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)
    occupation = Column(String, nullable=False)
    current_balance = Column(Float, default=0)
    emergency_buffer = Column(Float, default=0)
    created_at = Column(DateTime, default=datetime.utcnow)

class Transaction(Base):
    __tablename__ = "transactions"
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, nullable=False, index=True)
    txn_date = Column(Date, nullable=False)
    amount = Column(Float, nullable=False)
    transaction_type = Column(String, nullable=False)  # income / expense
    category = Column(String, nullable=False)
    source = Column(String, nullable=False)  # AA / gig_platform

class Obligation(Base):
    __tablename__ = "obligations"
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, nullable=False, index=True)
    due_date = Column(Date, nullable=False)
    amount = Column(Float, nullable=False)
    category = Column(String, nullable=False)
    essential = Column(Integer, default=1)
