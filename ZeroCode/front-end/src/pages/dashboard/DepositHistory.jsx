export default function DepositHistory() {
  return (
    <div>
      <h2>Deposit History</h2>
      <p>List of all deposits made to your account.</p>

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
            <td>2025-09-01</td>
            <td>₹10,000</td>
            <td>Cash</td>
          </tr>
          <tr>
            <td>2025-08-15</td>
            <td>₹5,000</td>
            <td>Cheque</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
