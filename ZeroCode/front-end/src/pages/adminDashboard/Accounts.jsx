import Card from "react-bootstrap/Card";
import { FaUser, FaRegCreditCard, FaUniversity, FaCheckCircle, FaTimesCircle } from "react-icons/fa";

export default function AdminAccounts() {
  const accounts = [
    { id: 1, name: "John Doe", accountNumber: "1234 5678 9012", type: "Savings", balance: "₹1,25,000", status: "Active" },
    { id: 2, name: "Jane Smith", accountNumber: "9876 5432 1012", type: "Current", balance: "₹2,50,500", status: "Pending" },
    { id: 3, name: "Robert Lee", accountNumber: "1122 3344 5566", type: "Savings", balance: "₹75,000", status: "Inactive" },
    { id: 4, name: "Alice Brown", accountNumber: "9988 7766 5544", type: "Fixed Deposit", balance: "₹50,000", status: "Active" },
  ];

  return (
    <div className="container mt-4">
      <h3 className="mb-3 fw-bold">All Customer Accounts</h3>
      <div className="row g-3">
        {accounts.map(acc => (
          <div key={acc.id} className="col-md-6 col-lg-4">
            <Card className="shadow-sm rounded-4">
              <Card.Header className="bg-primary text-white d-flex align-items-center gap-2">
                <FaUser />
                <span>{acc.name}</span>
              </Card.Header>
              <Card.Body>
                <p><FaRegCreditCard className="me-2" /> <strong>Account:</strong> {acc.accountNumber}</p>
                <p><FaUniversity className="me-2" /> <strong>Type:</strong> {acc.type}</p>
                <p><FaRegCreditCard className="me-2" /> <strong>Balance:</strong> {acc.balance}</p>
                <p className="d-flex align-items-center">
                  <strong>Status:</strong>
                  {acc.status === "Active" && <FaCheckCircle className="ms-2 text-success" />}
                  {acc.status === "Inactive" && <FaTimesCircle className="ms-2 text-danger" />}
                  {acc.status === "Pending" && <span className="ms-2 text-warning">{acc.status}</span>}
                </p>
              </Card.Body>
              <Card.Footer className="d-flex justify-content-between">
                <button className="btn btn-sm btn-success">Approve</button>
                <button className="btn btn-sm btn-danger">Freeze</button>
              </Card.Footer>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
