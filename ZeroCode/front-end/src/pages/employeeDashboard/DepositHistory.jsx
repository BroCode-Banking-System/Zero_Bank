import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import { Button } from "react-bootstrap";

export default function DepositHistory() {
  const [deposits, setDeposits] = useState([
    { date: "2025-09-01", amount: "₹10,000", mode: "Cash", status: "Pending" },
    { date: "2025-08-15", amount: "₹5,000", mode: "Cheque", status: "Confirmed" },
    { date: "2025-07-30", amount: "₹7,500", mode: "Online", status: "Pending" },
  ]);

  const handleConfirm = (index) => {
    const updatedDeposits = [...deposits];
    updatedDeposits[index].status = "Confirmed";
    setDeposits(updatedDeposits);
  };

  return (
    <div className="container mt-5 p-4">
      <Card className="shadow rounded-4">
        <Card.Header className="bg-white border-0 d-flex align-items-center justify-content-between p-3">
          <h4 className="mb-0">Deposit History</h4>
        </Card.Header>

        <div className="table-responsive p-3">
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
              {deposits.map((deposit, idx) => (
                <tr key={idx} className={deposit.status === "Pending" ? "table-warning" : ""}>
                  <td>{deposit.date}</td>
                  <td>{deposit.amount}</td>
                  <td>{deposit.mode}</td>
                  <td>
                    <span className={`badge ${deposit.status === "Confirmed" ? "bg-success" : "bg-warning text-dark"}`}>
                      {deposit.status}
                    </span>
                  </td>
                  <td>
                    {deposit.status === "Pending" && (
                      <Button size="sm" variant="primary" onClick={() => handleConfirm(idx)}>
                        Confirm
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
