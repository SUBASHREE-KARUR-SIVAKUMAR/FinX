import { useWhatIf } from "../context/WhatIfContext";

export default function WhatIfSimulator() {
  const { scenario, setScenario, result, simulate, loading } = useWhatIf();

  return (
    <section className="panel">
      <div className="section-heading">
        <div>
          <div className="eyebrow">FINANCIAL DIGITAL TWIN</div>
          <h2>What if?</h2>
        </div>
        <span className="pill">Scenario simulator</span>
      </div>

      <div className="controls">
        <label>
          Income change
          <input type="range" min="-50" max="30" step="5"
            value={scenario.income_change_pct}
            onChange={e => setScenario({...scenario, income_change_pct: Number(e.target.value)})}/>
          <strong>{scenario.income_change_pct}%</strong>
        </label>

        <label>
          Days unable to work
          <input type="range" min="0" max="7"
            value={scenario.days_unable_to_work}
            onChange={e => setScenario({...scenario, days_unable_to_work: Number(e.target.value)})}/>
          <strong>{scenario.days_unable_to_work} days</strong>
        </label>

        <label>
          Unexpected expense
          <input type="number" min="0"
            value={scenario.unexpected_expense}
            onChange={e => setScenario({...scenario, unexpected_expense: Number(e.target.value)})}/>
        </label>

        <button onClick={() => simulate(1)} disabled={loading}>
          {loading ? "Simulating..." : "Run scenario"}
        </button>
      </div>

      {result && (
        <div className="scenario-result">
          <div><span>Projected balance</span><strong>₹{result.projected_balance.toLocaleString("en-IN")}</strong></div>
          <div><span>Stress risk</span><strong>{result.scenario_risk}%</strong></div>
          <div><span>Impact</span><strong>₹{result.impact.toLocaleString("en-IN")}</strong></div>
          <p>{result.recommendation}</p>
        </div>
      )}
    </section>
  );
}
