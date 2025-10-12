import { FaUser, FaWallet, FaRupeeSign, FaBuilding } from "react-icons/fa";
import Card from "react-bootstrap/Card";

export default function AdminFundTransfer() {
  const accounts = [
    { id: 1, name: "John Doe", accountNumber: "1234 5678 9012" },
    { id: 2, name: "Jane Smith", accountNumber: "9876 5432 1012" },
    { id: 3, name: "Robert Lee", accountNumber: "1122 3344 5566" },
  ];

  return (
    <div className="container mt-4">
      <Card className="shadow rounded-4 p-3">
        <Card.Header className="bg-primary text-white rounded-top-4 d-flex align-items-center mb-3">
          <FaWallet className="me-2" />
          <h4 className="mb-0">Administrator Fund Transfer</h4>
        </Card.Header>

        <form>
          <div className="row g-3">
            {/* Source Account */}
            <div className="col-md-6">
              <label className="form-label small">Source Account</label>
              <select className="form-select">
                <option value="">Select source account</option>
                {accounts.map(acc => (
                  <option key={acc.id} value={acc.accountNumber}>
                    {acc.name} - {acc.accountNumber}
                  </option>
                ))}
              </select>
            </div>

            {/* Destination Account */}
            <div className="col-md-6">
              <label className="form-label small">Destination Account</label>
              <select className="form-select">
                <option value="">Select destination account</option>
                {accounts.map(acc => (
                  <option key={acc.id} value={acc.accountNumber}>
                    {acc.name} - {acc.accountNumber}
                  </option>
                ))}
              </select>
            </div>

            {/* Amount */}
            <div className="col-md-6">
              <label className="form-label small">Amount</label>
              <div className="input-group">
                <span className="input-group-text"><FaRupeeSign /></span>
                <input type="number" className="form-control" placeholder="Enter amount" />
              </div>
            </div>

            {/* Description */}
            <div className="col-md-6">
              <label className="form-label small">Description</label>
              <input type="text" className="form-control" placeholder="Optional description" />
            </div>

            {/* Transfer Type (Optional) */}
            <div className="col-md-6">
              <label className="form-label small">Transfer Type</label>
              <select className="form-select">
                <option value="internal">Internal Transfer</option>
                <option value="adjustment">Adjustment</option>
              </select>
            </div>
          </div>

          <div className="text-center mt-4">
            <button type="submit" className="btn btn-primary px-4">Execute Transfer</button>
          </div>
        </form>
      </Card>
    </div>
  );
}
