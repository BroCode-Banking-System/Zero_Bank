// front-end/src/pages/userDashboard/DepositHistory.jsx
import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import axios from "axios";

export default function DepositHistory() {
  const [deposits, setDeposits] = useState([]);

  const userId = localStorage.getItem("userId"); 

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/transactions/deposits/${userId}`)
      .then(res => setDeposits(res.data))
      .catch(() => setError("Account not found: " + userId));
  }, [userId]);

  return (
    <div className="container mt-5 p-3">
      <Card className="shadow rounded-4 p-3 py-5">
        <Card.Header className="bg-primary text-white rounded-top-4 mb-3">
          <h4 className="mb-0">Deposit History</h4>
        </Card.Header>

        <div className="table-responsive">
          <table className="table table-striped mb-0">
            <thead>
              <tr>
                <th>Date</th>
                <th>Amount</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {deposits.map((item) => (
                <tr key={item._id}>
                  <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                  <td>₹{item.amount}</td>
                  <td>{item.description || "Online"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
