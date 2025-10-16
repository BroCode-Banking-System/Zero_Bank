// WithdrawalHistory.jsx
import React from "react";
import Card from "react-bootstrap/Card";

export default function WithdrawalHistory() {
  const withdrawals = [
    { date: "2025-09-03", amount: "₹2,000", mode: "ATM" },
    { date: "2025-08-25", amount: "₹1,500", mode: "Online" },
    { date: "2025-08-10", amount: "₹3,000", mode: "Bank" },
  ];

  return (
    <div className="container mt-5 p-3">
    <Card className="shadow rounded-4 p-3 py-5">
      <Card.Header className="bg-primary text-white rounded-top-4 mb-3">
        <h4 className="mb-0">Withdrawal History</h4>
      </Card.Header>
      <div className="table-responsive">
        <table className="table table-striped mb-0">
          <thead>
            <tr>
              <th>Date</th>
              <th>Amount</th>
              <th>Mode</th>
            </tr>
          </thead>
          <tbody>
            {withdrawals.map((item, idx) => (
              <tr key={idx}>
                <td>{item.date}</td>
                <td>{item.amount}</td>
                <td>{item.mode}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  </div>
  );
}
