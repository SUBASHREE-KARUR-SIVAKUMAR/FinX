import React from 'react';

const WeeklyReport = ({ data }) => {
  return (
    <div className="card" style={{ marginTop: '20px' }}>
      <h4>Weekly Expense Pattern</h4>
      <ul>
        {data.map((entry, index) => (
          <li key={index}>
            <strong>{entry.date}</strong>: Essentials - ₹{entry.essentials}, Non-Essentials - ₹{entry.nonEssentials}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WeeklyReport;
