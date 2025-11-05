// front-end/src/pages/adminDashboard/FundTransfer.jsx
import { useState } from "react";
import axios from "axios";
import { FaWallet, FaRupeeSign } from "react-icons/fa";
import Card from "react-bootstrap/Card";

export default function AdminFundTransfer() {
  const [formData, setFormData] = useState({
    userId: "", // optional for admin — depends on your logic
    accountId: "",
    amount: "",
    description: "",
    transactionType: "transfer",
    transferType: "internal",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8000/api/transactions", formData);
      alert(res.data.message);
    } catch (err) {
      alert("Error creating transaction");
    }
  };

  return (
    <div className="container mt-4">
      <Card className="shadow rounded-4 p-3">
        <Card.Header className="bg-primary text-white rounded-top-4 d-flex align-items-center mb-3">
          <FaWallet className="me-2" />
          <h4 className="mb-0">Administrator Fund Transfer</h4>
        </Card.Header>

        <form onSubmit={handleSubmit}>
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label small">Amount</label>
              <div className="input-group">
                <span className="input-group-text"><FaRupeeSign /></span>
                <input
                  type="number"
                  className="form-control"
                  name="amount"
                  placeholder="Enter amount"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="col-md-6">
              <label className="form-label small">Description</label>
              <input
                type="text"
                className="form-control"
                name="description"
                placeholder="Optional description"
                onChange={handleChange}
              />
            </div>

            <div className="col-md-6">
              <label className="form-label small">Transfer Type</label>
              <select name="transferType" className="form-select" onChange={handleChange}>
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
