import { createContext, useContext, useState } from "react";
import { runWhatIf } from "../api";

const WhatIfContext = createContext(null);

export function WhatIfProvider({ children }) {
  const [scenario, setScenario] = useState({
    income_change_pct: 0,
    days_unable_to_work: 0,
    unexpected_expense: 0
  });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  async function simulate(userId = 1) {
    setLoading(true);
    try {
      setResult(await runWhatIf(userId, scenario));
    } finally {
      setLoading(false);
    }
  }

  return (
    <WhatIfContext.Provider value={{ scenario, setScenario, result, simulate, loading }}>
      {children}
    </WhatIfContext.Provider>
  );
}

export function useWhatIf() {
  return useContext(WhatIfContext);
}
