import React, { useState } from 'react';
import './styles.css';
import SafetyCircle from "./components/SafetyCircle";

function App() {
  const [showDetails, setShowDetails] = useState(false);
  const [activeTab, setActiveTab] = useState('resilience');
  
  // --- Lifestyle & Commitments State with Deadlines ---
  const [commitments, setCommitments] = useState([
    { id: 1, name: 'Room Rent', amount: 2000, category: 'Must-Pay', dueDate: '2026-09-30' },
    { id: 2, name: 'Bike EMI', amount: 1500, category: 'Must-Pay', dueDate: '2026-09-15' },
  ]);

  // --- Future Goals State with Deadlines ---
  const [goals, setGoals] = useState([
    { id: 1, name: 'New Laptop', target: 45000, saved: 1200, dueDate: '2026-12-25' }
  ]);

  // --- Spending History ---
  const [expenses, setExpenses] = useState([
    { id: 1, date: '2026-09-01', amount: 450, category: 'Must-Haves' },
    { id: 2, date: '2026-09-02', amount: 200, category: 'Fun Stuff' },
  ]);

  const [newAmount, setNewAmount] = useState('');
  const [newCategory, setNewCategory] = useState('Must-Haves');
  const [newItemName, setNewItemName] = useState('');
  const [newItemAmount, setNewItemAmount] = useState('');
  const [newItemDate, setNewItemDate] = useState('');

  // --- Dynamic Logic ---
  const totalFixedMonthly = commitments.reduce((sum, item) => sum + item.amount, 0);
  const isGoodEarningDay = true; 
  const suggestedSaving = isGoodEarningDay ? 450 : 0;

  // Helper to calculate days left
  const getDaysLeft = (dateStr) => {
    const today = new Date('2026-09-03'); // Current date
    const target = new Date(dateStr);
    const diffTime = target - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const handleAddCommitment = () => {
    if (!newItemName || !newItemAmount || !newItemDate) {
      alert("Hey! Don't forget to fill in the name, amount, and the date! 😊");
      return;
    }
    
    const newItem = {
      id: Date.now(),
      name: newItemName,
      amount: parseFloat(newItemAmount),
      category: 'Must-Pay',
      dueDate: newItemDate
    };
    
    setCommitments([...commitments, newItem]);
    setNewItemName('');
    setNewItemAmount('');
    setNewItemDate('');
    alert(`Got it, Subashree! Added ${newItemName} to your list. I'll keep an eye on that deadline for you! 🛡️`);
  };

  const addExpense = () => {
    if (!newAmount) return;
    const newEntry = {
      id: Date.now(),
      date: new Date().toISOString().split('T')[0],
      amount: parseFloat(newAmount),
      category: newCategory
    };
    setExpenses([newEntry, ...expenses]);
    setNewAmount('');
  };

  return (
    <div className="dashboard-container">
      {/* Top Bar - Community Friends */}
      <nav className="top-nav">
        <div className="community-pill">
          <span>🤝 Friends' Pool: <strong>₹15,450</strong></span>
          <span style={{ color: 'var(--text-muted)' }}>|</span>
          <span>42 Active</span>
        </div>
      </nav>

      <header style={{ textAlign: 'center', marginBottom: '40px', paddingTop: '60px' }}>
        <h1 style={{ color: 'var(--primary)', margin: '0', fontSize: '2.5rem', fontWeight: '800' }}>Hey Subashree! 👋</h1>
        <p style={{ color: 'var(--text-muted)', marginTop: '5px', fontSize: '1.1rem' }}>I'm keeping an eye on your deadlines so you can focus on your day!</p>
      </header>

      <div className="dashboard-grid">
        {/* Card 1: Real Spendable Cash */}
        <div className="card">
          <span className="status-badge status-stable">Smooth Sailing ⛵</span>
          <h3 style={{ margin: '0', fontSize: '1rem', color: 'var(--text-muted)' }}>Money You Can Spend Today</h3>
          <div className="metric-value">₹1,840</div>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            After setting aside <strong>₹{totalFixedMonthly}</strong> for your upcoming bills.
          </p>
        </div>

        {/* Card 2: THE HERO - Dynamic Rainy Day Buffer */}
        <div className="card buffer-card">
          <span className="recommendation-label">💡 Buddy's Recommendation</span>
          <h3 style={{ margin: '0', fontSize: '1rem' }}>Rainy Day Savings</h3>
          <div className="metric-value" style={{ color: 'var(--success)' }}>₹{suggestedSaving}</div>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: '1.4' }}>
            {isGoodEarningDay 
              ? "You're earning great today! Let's put aside ₹450. It'll help you hit those goals faster!" 
              : "Slow work day. No pressure to save! Focus on your essentials today."}
          </p>
        </div>

        {/* Card 3: 1-Week Prediction */}
        <div className="card">
          <h3>1-Week Prediction</h3>
          <div className="metric-value" style={{ color: 'var(--danger)' }}>12% Risk</div>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Very low chance of running out of cash. You're doing great!</p>
          <button className="primary-btn" style={{ width: '100%', marginTop: '10px' }} onClick={() => setShowDetails(true)}>
            Show My Money Secrets
          </button>
        </div>
      </div>

      {/* NEW: Lifestyle & Goals Section with Dates */}
      <div className="card" style={{ marginTop: '24px' }}>
        <h3>My Life & Dreams 🎯</h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Tell me about your rent, loans, or things you're saving for, and when they're due!</p>
        <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap', marginBottom: '20px' }}>
          <input 
            type="text" placeholder="What is it? (e.g. Laptop, Rent)" 
            style={{ flex: 2 }} value={newItemName} onChange={(e) => setNewItemName(e.target.value)}
          />
          <input 
            type="number" placeholder="Amount (₹)" 
            style={{ flex: 1 }} value={newItemAmount} onChange={(e) => setNewItemAmount(e.target.value)}
          />
          <input 
            type="date" 
            style={{ flex: 1 }} value={newItemDate} onChange={(e) => setNewItemDate(e.target.value)}
          />
          <button className="primary-btn" onClick={handleAddCommitment}>Prioritize This</button>
        </div>
        <div className="insight-grid">
          {commitments.map(c => (
            <div key={c.id} className="insight-box" style={{borderColor: 'var(--danger)'}}>
              <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <span style={{fontSize: '0.7rem'}}>FIXED BILL</span>
                <span style={{fontSize: '0.7rem', color: 'var(--danger)', fontWeight: 'bold'}}>{getDaysLeft(c.dueDate)} days left</span>
              </div>
              <div style={{fontWeight: 'bold'}}>{c.name}</div>
              <div>₹{c.amount}</div>
            </div>
          ))}
          {goals.map(g => (
            <div key={g.id} className="insight-box" style={{borderColor: 'var(--primary)'}}>
              <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <span style={{fontSize: '0.7rem'}}>FUTURE GOAL</span>
                <span style={{fontSize: '0.7rem', color: 'var(--primary)', fontWeight: 'bold'}}>{getDaysLeft(g.dueDate)} days left</span>
              </div>
              <div style={{fontWeight: 'bold'}}>{g.name}</div>
              <div>₹{g.target}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Log Spending Section */}
      <div className="card" style={{ marginTop: '24px' }}>
        <h3>Log Your Spending 📝</h3>
        <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
          <input 
            type="number" placeholder="Amount (₹)" 
            value={newAmount} onChange={(e) => setNewAmount(e.target.value)}
            style={{ flex: 1 }} 
          />
          <select value={newCategory} onChange={(e) => setNewCategory(e.target.value)} style={{ flex: 1 }}>
            <option>Must-Haves</option>
            <option>Fun Stuff</option>
            <option>Rent/Loan</option>
          </select>
          <button className="primary-btn" onClick={addExpense}>Save Spending</button>
        </div>
      </div>

      {/* Detailed Insights Section */}
      {showDetails && (
        <div className="card fade-in" style={{ marginTop: '40px' }}>
          <div className="tabs-header">
            <button className={`tab-btn ${activeTab === 'resilience' ? 'active' : ''}`} onClick={() => setActiveTab('resilience')}>Savings Check</button>
            <button className={`tab-btn ${activeTab === 'forecast' ? 'active' : ''}`} onClick={() => setActiveTab('forecast')}>Next Week's Guess</button>
          </div>

          <div className="tab-content" style={{ padding: '20px 0' }}>
            {activeTab === 'resilience' && (
              <div className="insight-grid">
                <div className="insight-box">
                  <h4>Rent/EMI Locked</h4>
                  <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>₹{totalFixedMonthly}</div>
                </div>
                <div className="insight-box">
                  <h4>Bad Day Fund</h4>
                  <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>₹400</div>
                </div>
                <div className="insight-box success">
                  <h4>Money Score</h4>
                  <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--success)' }}>88/100</div>
                </div>
              </div>
            )}

            {activeTab === 'forecast' && (
              <div className="fade-in">
                <h4>📅 AI Spending Guess</h4>
                <p>Subashree, based on your patterns, you'll likely need <strong>₹3,200</strong> for Must-Haves next week.</p>
                <div className="save-where" style={{ border: '1px solid var(--primary)' }}>
                  🤖 <strong>Buddy's Note:</strong> I see your <strong>Bike EMI</strong> is due in {getDaysLeft('2026-09-15')} days! Let's try to keep the "Fun Stuff" spending under ₹200 this weekend so you're all set for that payment.
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <footer style={{ textAlign: 'center', marginTop: '60px', color: 'var(--text-muted)', fontSize: '0.8rem' }}>
        FinX Buddy • Hackathon MVP 2026
      </footer>
    </div>
  );
}

export default App;
