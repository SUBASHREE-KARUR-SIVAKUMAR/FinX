import React, { useState, useEffect } from 'react';

const SafetyCircle = () => {
  const [pool, setPool] = useState(0);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    // Make sure this matches your backend port (8001)
    fetch('http://127.0.0.1:8001/community-status')
      .then(res => res.json())
      .then(data => setPool(data.total_pool))
      .catch(err => console.log("Backend not reached yet"));
  }, []);

  const handleApply = () => {
    setStatus("Requesting...");
    // Mocking the payout request
    setTimeout(() => {
      setStatus("✅ Request Sent! Your circle is reviewing.");
    }, 1500);
  };

  return (
    <div>
      <h3>🤝 Community Safety Circle</h3>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <div>
          <p style={{margin: 0, color: '#828282'}}>Collective Pool</p>
          <div className="metric-value" style={{fontSize: '1.5rem'}}>₹{pool.toLocaleString()}</div>
        </div>
        <div style={{textAlign: 'right'}}>
          <p style={{margin: 0, color: '#828282'}}>Members</p>
          <div style={{fontWeight: 700}}>42 Active</div>
        </div>
      </div>
      
      {status ? (
        <div style={{marginTop: '20px', color: '#27ae60', fontWeight: 'bold'}}>{status}</div>
      ) : (
        <button 
          className="primary-btn" 
          style={{width: '100%', marginTop: '20px', background: '#f2f2f2', color: '#333'}}
          onClick={handleApply}
        >
          Apply for Emergency Fund
        </button>
      )}
    </div>
  );
};

export default SafetyCircle;
