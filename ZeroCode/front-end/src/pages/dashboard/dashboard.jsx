
const Dashboard = () => {
  // Example data (replace with real data from backend)
  const accounts = [
    { id: 1, type: "Savings", balance: 12000.5 },
    { id: 2, type: "Checking", balance: 3500.75 },
  ];
  const transactions = [
    { id: 1, date: "2025-09-10", desc: "ATM Withdrawal", amount: -200 },
    { id: 2, date: "2025-09-09", desc: "Salary Deposit", amount: 2500 },
    { id: 3, date: "2025-09-08", desc: "Online Transfer", amount: -150 },
  ];

  return (
    <div className="dashboard-container">
      <h1 style={{ fontSize: 32, fontWeight: 700, color: "#2563eb", marginBottom: 24 }}>Dashboard</h1>
      {/* Account Summary */}
      <div className="dashboard-accounts">
        {accounts.map(acc => (
          <div key={acc.id} className="dashboard-account-card">
            <div style={{ fontSize: 18, color: "#374151", marginBottom: 8 }}>{acc.type} Account</div>
            <div style={{ fontSize: 28, fontWeight: 600, color: "#16a34a" }}>${acc.balance.toLocaleString()}</div>
          </div>
        ))}
      </div>
      {/* Recent Transactions */}
      <div className="dashboard-transactions">
        <h2 style={{ fontSize: 22, fontWeight: 600, color: "#2563eb", marginBottom: 16 }}>Recent Transactions</h2>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Description</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map(tx => (
              <tr key={tx.id}>
                <td>{tx.date}</td>
                <td>{tx.desc}</td>
                <td className={tx.amount < 0 ? "amount-negative" : "amount-positive"}>
                  {tx.amount < 0 ? "-" : "+"}${Math.abs(tx.amount).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
