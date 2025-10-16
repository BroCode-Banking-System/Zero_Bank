import React from "react";
import Card from "react-bootstrap/Card";
import { Button } from "react-bootstrap";

export default function WithdrawalHistory() {
  const withdrawals = [
    { date: "2025-09-03", amount: "₹2,000", mode: "ATM", status: "Pending" },
    { date: "2025-08-25", amount: "₹1,500", mode: "Online", status: "Processed" },
    { date: "2025-08-10", amount: "₹3,000", mode: "Bank", status: "Pending" },
  ];

  const handleProcess = (index) => {
    alert(`Processing withdrawal of ${withdrawals[index].amount} on ${withdrawals[index].date}`);
    // Here you can add your API call to process withdrawal
  };

  return (
    <div className="container mt-5 p-4">
      <Card className="shadow rounded-4 p-4">
        <Card.Header className="bg-white border-0 mb-4 d-flex align-items-center">
          <h4 className="mb-0 text-primary">Withdrawal History</h4>
        </Card.Header>

        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-light">
              <tr>
                <th>Date</th>
                <th>Amount</th>
                <th>Mode</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {withdrawals.map((item, idx) => (
                <tr key={idx}>
                  <td>{item.date}</td>
                  <td>{item.amount}</td>
                  <td>{item.mode}</td>
                  <td>
                    <span
                      className={`badge ${
                        item.status === "Pending" ? "bg-warning text-dark" : "bg-success"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td>
                    {item.status === "Pending" ? (
                      <Button
                        size="sm"
                        variant="primary"
                        onClick={() => handleProcess(idx)}
                      >
                        Process
                      </Button>
                    ) : (
                      <Button size="sm" variant="secondary" disabled>
                        Done
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
