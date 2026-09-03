import { useEffect, useState } from "react";
import { getDashboard } from "./api";
import MetricCard from "./components/MetricCard";
import FinancialWeather from "./components/FinancialWeather";
import IncomeChart from "./components/IncomeChart";
import WhatIfSimulator from "./components/WhatIfSimulator";

function money(value) {
  return `₹${Number(value).toLocaleString("en-IN", { maximumFractionDigits: 0 })}`;
}

export default function App() {
  const [dashboard, setDashboard] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    getDashboard(1).then(setDashboard).catch(() => setError("Start the FastAPI backend and seed the demo database."));
  }, []);

  if (error) return <main className="app"><div className="error">{error}</div></main>;
  if (!dashboard) return <main className="app"><div className="loading">Loading Financial Autopilot...</div></main>;

  return (
    <main className="app">
      <header className="topbar">
        <div>
          <div className="brand">FINANCIAL AUTOPILOT</div>
          <h1>Your money, one week ahead.</h1>
          <p>Predictive financial resilience for irregular-income workers.</p>
        </div>
        <div className="user-chip">{dashboard.user.occupation}</div>
      </header>

      <section className="metrics">
        <MetricCard label="Current balance" value={money(dashboard.user.balance)} helper="Live demo balance" />
        <MetricCard label="Safe to spend" value={money(dashboard.safe_to_spend)} helper="After safety floor + commitments" />
        <MetricCard label="Safety floor" value={money(dashboard.safety_floor)} helper="Minimum recommended liquidity" />
        <MetricCard label="Resilience score" value={`${dashboard.resilience_score}/100`} helper="Higher is better" />
      </section>

      <FinancialWeather weather={dashboard.weather} probability={dashboard.stress_probability} />

      <section className="grid">
        <div className="panel">
          <div className="section-heading">
            <div><div className="eyebrow">NEXT 7 DAYS</div><h2>Income forecast</h2></div>
          </div>
          <IncomeChart forecast={dashboard.forecast} />
        </div>

        <div className="panel recommendation">
          <div className="eyebrow">AI FINANCIAL ACTION</div>
          <div className="action">{dashboard.recommendation.action}</div>
          <h2>{dashboard.recommendation.title}</h2>
          <p>{dashboard.recommendation.message}</p>
          <div className="explain">The recommendation is based on projected cash flow, commitments, safety buffer and short-term stress risk.</div>
        </div>
      </section>

      <WhatIfSimulator />

      <footer>
        Hackathon prototype • Synthetic data • No real banking or lending decisions
      </footer>
    </main>
  );
}
