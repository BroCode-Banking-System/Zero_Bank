// src/components/FundTransfer.jsx
import React, { useState } from "react";
import { FaUser, FaWallet, FaRupeeSign } from "react-icons/fa";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import axios from "axios";
import Alert from "react-bootstrap/Alert";

export default function FundTransfer() {
  const [formData, setFormData] = useState({
    recipientName: "",
    recipientAccount: "",
    ifscCode: "",
    amount: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  // Mock sender ID (in real app, get this from logged-in user context or JWT)
  const senderId = localStorage.getItem("userId") || "672f91dc71c849a79b64d198";

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: "", text: "" });

    // Simple validation
    if (!formData.recipientName || !formData.recipientAccount || !formData.ifscCode || !formData.amount) {
      return setMessage({ type: "danger", text: "Please fill all required fields." });
    }

    try {
      setLoading(true);
      const response = await axios.post("http://localhost:8000/api/transactions/transfer", {
        senderId,
        ...formData,
      });

      setMessage({ type: "success", text: response.data.message });
      setFormData({ recipientName: "", recipientAccount: "", ifscCode: "", amount: "", description: "" });
    } catch (error) {
      const errMsg = error.response?.data?.message || "Something went wrong!";
      setMessage({ type: "danger", text: errMsg });
    } finally {
      setLoading(false);
    }
  };

  const formFields = [
    { icon: <FaUser />, name: "recipientName", label: "Recipient Name", type: "text", placeholder: "Enter recipient name" },
    { icon: <FaWallet />, name: "recipientAccount", label: "Recipient Account", type: "text", placeholder: "Enter account number" },
    { icon: <FaUser />, name: "ifscCode", label: "IFSC Code", type: "text", placeholder: "Enter IFSC code" },
    { icon: <FaRupeeSign />, name: "amount", label: "Amount", type: "number", placeholder: "Enter amount" },
    { icon: <FaUser />, name: "description", label: "Description", type: "text", placeholder: "Optional description" },
  ];

  return (
    <div className="container mt-5 p-3">
      <Card className="shadow rounded-4 p-3">
        <Card.Header className="bg-primary text-white rounded-top-4 d-flex align-items-center mb-3">
          <FaWallet className="me-2" />
          <h4 className="mb-0">Fund Transfer</h4>
        </Card.Header>

        {message.text && (
          <Alert variant={message.type} className="text-center">
            {message.text}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <div className="row g-3">
            {formFields.map((field, idx) => (
              <div key={idx} className="col-md-6">
                <div className="d-flex align-items-center gap-3 p-2">
                  <div
                    className="text-dark d-flex justify-content-center align-items-center"
                    style={{ width: "35px", height: "35px" }}
                  >
                    {field.icon}
                  </div>
                  <div className="w-100">
                    <label className="form-label small">{field.label}</label>
                    <input
                      name={field.name}
                      type={field.type}
                      className="form-control"
                      placeholder={field.placeholder}
                      value={formData[field.name]}
                      onChange={handleChange}
                      required={field.name !== "description"}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-4">
            <Button type="submit" variant="primary" className="px-4" disabled={loading}>
              {loading ? "Transferring..." : "Transfer"}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
