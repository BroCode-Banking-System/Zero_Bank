export default function WithdrawalHistory() {
  return (
    <div>
      <h2>Withdrawal History</h2>
      <p>List of all withdrawals from your account.</p>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>Date</th>
            <th>Amount</th>
            <th>Mode</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>2025-09-03</td>
            <td>₹2,000</td>
            <td>ATM</td>
          </tr>
          <tr>
            <td>2025-08-25</td>
            <td>₹1,500</td>
            <td>Online</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
