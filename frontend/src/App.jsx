import React from 'react';
import './styles.css';
import SafetyCircle from "./components/SafetyCircle";
 // Make sure the file is in the same folder (src)

function App() {
  
  // Logic for the Forecast Button
  const handleViewForecast = () => {
    alert("Analyzing your Financial Digital Twin... 📈\n\nYour resilience is looking strong! We predict high surge pricing in your area this weekend.");
  };

  return (
    <div className="dashboard-container">
      {/* Header Section */}
      <header style={{ textAlign: 'center', marginBottom: '40px', paddingTop: '20px' }}>
        <h1 style={{ color: '#1a2b4b', margin: '0', fontSize: '2.5rem' }}>FinX Dashboard</h1>
        <p style={{ color: '#828282', marginTop: '5px', fontSize: '1.1rem' }}>
          Proactive Financial Resilience for Gig Workers
        </p>
      </header>

      {/* Main Dashboard Grid */}
      <div className="dashboard-grid">
        
        {/* Card 1: Safe-to-Spend */}
        <div className="card">
          <div style={{ marginBottom: '15px' }}>
            <span className="status-badge status-stable">Stable Weather</span>
          </div>
          <h3 style={{ margin: '0', fontSize: '1.1rem', color: '#828282' }}>Safe-to-Spend Today</h3>
          <div className="metric-value">₹1,840</div>
          <p style={{ fontSize: '0.9rem', color: '#828282', lineHeight: '1.4' }}>
            This is your spending limit after accounting for rent, fuel, and a 20% safety buffer.
          </p>
        </div>

        {/* Card 2: Community Safety Circle (The new feature!) */}
        <div className="card">
          <SafetyCircle />
        </div>

        {/* Card 3: Risk Forecast */}
        <div className="card">
          <h3 style={{ margin: '0', fontSize: '1.1rem', color: '#828282' }}>7-Day Stress Forecast</h3>
          <div className="metric-value" style={{ color: '#eb5757' }}>12% Risk</div>
          <p style={{ fontSize: '0.9rem', color: '#828282', lineHeight: '1.4' }}>
            Low probability of financial distress. Your income volatility is currently within safe limits.
          </p>
          <button 
            className="primary-btn" 
            style={{ width: '100%', marginTop: '10px' }} 
            onClick={handleViewForecast}
          >
            View Detailed Forecast
          </button>
        </div>

      </div>

      {/* Footer / Branding */}
      <footer style={{ textAlign: 'center', marginTop: '60px', color: '#bdc3c7', fontSize: '0.8rem' }}>
        FinX Intelligence Layer • Hackathon MVP 2026
      </footer>
    </div>
  );
}

export default App;
