import Card from "react-bootstrap/Card";

export default function AdminDepositHistory() {
  const deposits = [
    { id: 1, customer: "John Doe", account: "1234 5678 9012", date: "2025-09-01", amount: "₹10,000", mode: "Cash", branch: "Kolkata Main" },
    { id: 2, customer: "Jane Smith", account: "9876 5432 1012", date: "2025-08-15", amount: "₹5,000", mode: "Cheque", branch: "Delhi Branch" },
    { id: 3, customer: "Robert Lee", account: "1122 3344 5566", date: "2025-07-30", amount: "₹7,500", mode: "Online", branch: "Mumbai Branch" },
    { id: 4, customer: "Alice Brown", account: "9988 7766 5544", date: "2025-09-05", amount: "₹12,000", mode: "Cash", branch: "Kolkata Main" },
  ];

  return (
    <div className="container mt-4">
      <Card className="shadow rounded-4 p-3">
        <Card.Header className="bg-primary text-white rounded-top-4 d-flex align-items-center mb-3">
          <h4 className="mb-0">Deposit History - Admin View</h4>
        </Card.Header>

        <div className="table-responsive">
          <table className="table table-striped mb-0">
            <thead>
              <tr>
                <th>Customer</th>
                <th>Account</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Mode</th>
                <th>Branch</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {deposits.map((deposit) => (
                <tr key={deposit.id}>
                  <td>{deposit.customer}</td>
                  <td>{deposit.account}</td>
                  <td>{deposit.date}</td>
                  <td>{deposit.amount}</td>
                  <td>{deposit.mode}</td>
                  <td>{deposit.branch}</td>
                  <td className={deposit.mode === "Cash" ? "text-success" : "text-primary"}>Completed</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
