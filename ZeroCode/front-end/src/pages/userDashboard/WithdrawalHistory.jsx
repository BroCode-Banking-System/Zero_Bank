import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import axios from "axios";

export default function WithdrawalHistory() {
  const [withdrawals, setWithdrawals] = useState([]);

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/transactions/withdrawals/${userId}`)
      .then(res => setWithdrawals(res.data))
      .catch(err => console.error(err));
  }, [userId]);

  return (
    <div className="container mt-5 p-3">
      <Card className="shadow rounded-4 p-3 py-5">
        <Card.Header className="bg-primary text-white rounded-top-4 mb-3">
          <h4 className="mb-0">Withdrawal History </h4>
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
              {withdrawals.map((item) => (
                <tr key={item._id}>
                  <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                  <td>₹{item.amount}</td>
                  <td>{item.description || "ATM"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
