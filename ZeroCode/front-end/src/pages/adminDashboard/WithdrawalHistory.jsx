import Card from "react-bootstrap/Card";

export default function AdminWithdrawalHistory() {
  const withdrawals = [
    { id: 1, customer: "John Doe", account: "1234 5678 9012", date: "2025-09-03", amount: "₹2,000", mode: "ATM", branch: "Kolkata Main", status: "Completed" },
    { id: 2, customer: "Jane Smith", account: "9876 5432 1012", date: "2025-08-25", amount: "₹1,500", mode: "Online", branch: "Delhi Branch", status: "Completed" },
    { id: 3, customer: "Robert Lee", account: "1122 3344 5566", date: "2025-08-10", amount: "₹3,000", mode: "Bank", branch: "Mumbai Branch", status: "Pending" },
    { id: 4, customer: "Alice Brown", account: "9988 7766 5544", date: "2025-09-05", amount: "₹5,000", mode: "ATM", branch: "Kolkata Main", status: "Completed" },
  ];

  return (
    <div className="container mt-4">
      <Card className="shadow rounded-4 p-3">
        <Card.Header className="bg-primary text-white rounded-top-4 d-flex align-items-center mb-3">
          <h4 className="mb-0">Withdrawal History - Admin View</h4>
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
              {withdrawals.map((item) => (
                <tr key={item.id}>
                  <td>{item.customer}</td>
                  <td>{item.account}</td>
                  <td>{item.date}</td>
                  <td>{item.amount}</td>
                  <td>{item.mode}</td>
                  <td>{item.branch}</td>
                  <td className={item.status === "Completed" ? "text-success" : item.status === "Pending" ? "text-warning" : "text-danger"}>
                    {item.status}
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
