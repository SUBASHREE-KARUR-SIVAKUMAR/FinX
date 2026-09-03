# Financial Autopilot

> **Predicting financial stress before it becomes financial crisis.**

Financial Autopilot is a hackathon MVP for gig and informal workers with irregular income. It creates a lightweight **Financial Digital Twin** from consented/mock account and gig-platform data, forecasts near-term income and expenses, calculates a dynamic safety floor and safe-to-spend amount, runs what-if scenarios, and produces explainable recommendations: **SAVE, SPEND, POSTPONE, or CREDIT**.

## Why this is different

Existing products already address parts of the gig-worker problem: earned-wage access, payouts, savings, insurance and cash-flow-based credit. Financial Autopilot is positioned as an **intelligence layer** across those services.

**Traditional:** "Your balance is ₹5,000."

**Financial Autopilot:** "Your balance is ₹5,000, but based on expected income, essential expenses and upcoming commitments, only ₹650 is safely spendable today."

The product optimizes for **financial resilience**, not loan volume.

## MVP features

- Financial Digital Twin
- 7-day income forecast using Prophet
- 7-day expense forecast
- Dynamic safety floor
- Safe-to-spend calculation
- Financial Weather: Stable / Caution / Financial Storm
- What-if simulator through React Context
- Explainable financial action recommendation
- Mock Account Aggregator (AA) bank-data feed
- Mock Swiggy gig-earnings integration
- FastAPI backend
- React + Chart.js dashboard
- SQLite database for the prototype

## Architecture

```text
                ┌─────────────────────────┐
                │ React Dashboard         │
                │ Chart.js + Context      │
                └────────────┬────────────┘
                             │ REST
                             ▼
                ┌─────────────────────────┐
                │ FastAPI API             │
                │ /dashboard              │
                │ /forecast               │
                │ /what-if                │
                │ /recommendation         │
                └───────┬─────────┬───────┘
                        │         │
              ┌─────────▼───┐ ┌──▼──────────────┐
              │ Financial   │ │ Data Adapters   │
              │ Intelligence│ │ AA Mock         │
              │ Engine      │ │ Swiggy Mock     │
              └──────┬──────┘ └─────────────────┘
                     │
          ┌──────────▼──────────┐
          │ Prophet Forecasting │
          │ + Rules Engine      │
          └──────────┬──────────┘
                     │
                ┌────▼─────┐
                │ SQLite   │
                └──────────┘
```

## Tech stack

### Frontend
- React.js
- Vite
- Chart.js + react-chartjs-2
- React Context API
- CSS

### Backend
- Python
- FastAPI
- Pydantic
- SQLAlchemy
- SQLite
- Prophet

### Integrations
- **Account Aggregator:** mock adapter for hackathon/demo use
- **Gig platform:** Swiggy-style mock adapter. No real Swiggy credentials or production API calls are included.

> Note: the modern package is `prophet`. The original library was commonly called `fbprophet`; for a new environment, use `prophet`.

## Project structure

```text
financial-autopilot/
├── README.md
├── LICENSE
├── .gitignore
├── docker-compose.yml
├── backend/
│   ├── requirements.txt
│   └── app/
│       ├── main.py
│       ├── config.py
│       ├── database.py
│       ├── models.py
│       ├── schemas.py
│       ├── seed.py
│       ├── api/
│       │   ├── dashboard.py
│       │   ├── forecast.py
│       │   ├── scenarios.py
│       │   └── recommendations.py
│       ├── services/
│       │   ├── financial_engine.py
│       │   ├── forecasting.py
│       │   └── recommendation_engine.py
│       └── integrations/
│           ├── aa_mock.py
│           └── swiggy_mock.py
├── frontend/
│   ├── package.json
│   ├── vite.config.js
│   └── src/
│       ├── main.jsx
│       ├── App.jsx
│       ├── api.js
│       ├── context/
│       │   └── WhatIfContext.jsx
│       ├── components/
│       │   ├── MetricCard.jsx
│       │   ├── FinancialWeather.jsx
│       │   ├── IncomeChart.jsx
│       │   ├── CashFlowChart.jsx
│       │   └── WhatIfSimulator.jsx
│       └── styles.css
├── data/
│   └── sample_transactions.csv
└── docs/
    ├── architecture.md
    ├── database-schema.md
    ├── api.md
    ├── ml-logic.md
    └── demo-script.md
```

## Run locally

### 1. Backend

```bash
cd backend
python -m venv .venv
# Windows:
.venv\Scripts\activate
# macOS/Linux:
source .venv/bin/activate

pip install -r requirements.txt
python -m app.seed
uvicorn app.main:app --reload --port 8000
```

API: `http://localhost:8000`

Swagger docs: `http://localhost:8000/docs`

### 2. Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend: `http://localhost:5173`

## Demo flow

1. Open dashboard.
2. Show current balance and safe-to-spend.
3. Show income/expense forecast.
4. Show Financial Weather.
5. Open What-if Simulator.
6. Change income by `-30%`.
7. Show the new projected balance and risk.
8. Explain why the system recommends saving/postponing rather than immediately borrowing.

## Important hackathon boundary

This repository uses **synthetic/mock financial data**. It does not connect to a user's real bank account, issue loans, move money, or make regulated credit decisions. A production version would require appropriate consent, security, regulated-provider integrations, compliance review, model validation, fairness testing and human oversight.

## Future scope

- Real AA ecosystem integration through an authorized Financial Information Provider/Account Aggregator flow
- Multiple gig-platform adapters
- More robust time-series forecasting
- Income anomaly detection
- Personalized emergency-buffer optimization
- Explainable risk scoring
- Privacy-preserving analytics
- Model monitoring and fairness evaluation
