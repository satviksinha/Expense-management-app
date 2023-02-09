import React, { useState } from "react";

const expenses = [
  { id: 1, entity: "Restaurant", category: "Food", amount: 50, notes: "Dinner with friends" },
  { id: 2, entity: "Gas Station", category: "Transportation", amount: 30, notes: "Fill up for the week" },
  { id: 3, entity: "Grocery Store", category: "Food", amount: 60, notes: "Weekly shopping" },
  // ... more expenses
];

const categories = ["Food", "Transportation", "Entertainment", "Shopping", "Rent", "Utilities", "Health", "Insurance", "Travel", "Other"];

const ExpenseApp = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const handleCategorySelection = (event) => {
    setSelectedCategory(event.target.value);
  };

  return (
    <div>
      <h1>Expense Tracker</h1>
      <select onChange={handleCategorySelection}>
        <option value="All">All</option>
        {categories.map((category) => (
          <option key={category} value={category}>{category}</option>
        ))}
      </select>
      <table>
        <thead>
          <tr>
            <th>Entity</th>
            <th>Category</th>
            <th>Amount</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          {expenses.filter((expense) => selectedCategory === "All" || expense.category === selectedCategory)
            .map((expense) => (
              <tr key={expense.id}>
                <td>{expense.entity}</td>
                <td>{expense.category}</td>
                <td>{expense.amount}</td>
                <td>{expense.notes}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExpenseApp;
