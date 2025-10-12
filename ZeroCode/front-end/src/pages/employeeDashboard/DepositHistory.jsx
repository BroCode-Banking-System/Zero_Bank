import Card from "react-bootstrap/Card";

export default function DepositHistory() {
  const deposits = [
    { date: "2025-09-01", amount: "₹10,000", mode: "Cash" },
    { date: "2025-08-15", amount: "₹5,000", mode: "Cheque" },
    { date: "2025-07-30", amount: "₹7,500", mode: "Online" },
  ];

  return (
    <div className="container mt-4">
      <Card className="shadow rounded-4 p-3">
        <Card.Header className="bg-primary text-white rounded-top-4 d-flex align-items-center mb-3">
          <h4 className="mb-0">Deposit History</h4>
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
              {deposits.map((deposit, idx) => (
                <tr key={idx}>
                  <td>{deposit.date}</td>
                  <td>{deposit.amount}</td>
                  <td>{deposit.mode}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
