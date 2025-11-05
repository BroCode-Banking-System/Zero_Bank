// front-end/src/pages/adminDashboard/DepositHistory.jsx
import { useState } from "react";
import Card from "react-bootstrap/Card";
import { Form } from "react-bootstrap";

export default function AdminDepositHistory() {
  const [searchTerm, setSearchTerm] = useState("");

  const deposits = [
    { id: 1, customer: "John Doe", account: "1234 5678 9012", accountType: "Savings", branch: "Kolkata Main", status: "Open" },
    { id: 2, customer: "Jane Smith", account: "9876 5432 1012", accountType: "Current", branch: "Delhi Branch", status: "Closed" },
    { id: 3, customer: "Robert Lee", account: "1122 3344 5566", accountType: "Savings", branch: "Mumbai Branch", status: "Open" },
    { id: 4, customer: "Alice Brown", account: "9988 7766 5544", accountType: "Current", branch: "Kolkata Main", status: "Closed" },
  ];

  // Filter deposits by account number (ignores spaces and case)
  const filteredDeposits = deposits.filter((deposit) =>
    deposit.account.replace(/\s+/g, "").includes(searchTerm.replace(/\s+/g, ""))
  );

  return (
    <div className="container mt-4">
      <Card className="shadow rounded-4 p-3">
        <Card.Header className="bg-primary text-white rounded-top-4 d-flex align-items-center justify-content-between mb-3">
          <h4 className="mb-0">Withdrawal History - Admin View</h4>

          {/* Search Box */}
          <Form className="d-flex" style={{ maxWidth: "300px" }}>
            <Form.Control
              type="text"
              placeholder="Search by Account No."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="rounded-3"
            />
          </Form>
        </Card.Header>

        <div className="table-responsive">
          <table className="table table-striped mb-0">
            <thead>
              <tr>
                <th>Customer</th>
                <th>Account</th>
                <th>Account Type</th>
                <th>Branch</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredDeposits.length > 0 ? (
                filteredDeposits.map((deposit) => (
                  <tr key={deposit.id}>
                    <td>{deposit.customer}</td>
                    <td>{deposit.account}</td>
                    <td>{deposit.accountType}</td>
                    <td>{deposit.branch}</td>
                    <td className={deposit.status === "Open" ? "text-success" : deposit.status === "Closed" ? "text-warning" : "text-danger"}>
                    {deposit.status}
                  </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center text-muted py-3">
                    No deposits found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
