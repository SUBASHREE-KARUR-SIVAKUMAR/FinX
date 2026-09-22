import React, { useState } from 'react';

const ExpenseTracker = () => {
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState('');

  const handleAddExpense = () => {
    // Logic to add expense and categorize it
    console.log(`Added ₹${amount} to ${category}`);
    setAmount(0);
    setCategory('');
  };

  return (
    <div className="card" style={{ marginTop: '20px' }}>
      <h4>Add Expense</h4>
      <input 
        type="number" 
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount" 
      />
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="">Select Category</option>
        <option value="essentials">Essentials</option>
        <option value="non-essentials">Non-Essentials</option>
      </select>
      <button onClick={handleAddExpense} className="primary-btn">Add Expense</button>
    </div>
  );
};

export default ExpenseTracker;
