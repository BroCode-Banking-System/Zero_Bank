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
    amount: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  // Get sender account number (logged-in user)
  const senderAccNo = localStorage.getItem("username");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Fetch recipient details when user leaves input field
  const handleAccountBlur = async () => {
    const acc = formData.recipientAccount.trim();
    if (!acc) return;
    if (acc === senderAccNo) {
      setFormData((prev) => ({ ...prev, recipientName: "" }));
      return setMessage({
        type: "danger",
        text: "You cannot transfer funds to your own account.",
      });
    }

    try {
      const res = await axios.get(`http://localhost:8000/api/accounts/${acc}`);

      if (res.data && res.data.account) {
        setFormData((prev) => ({
          ...prev,
          recipientName: res.data.account.name,
        }));
      } else {
        setFormData((prev) => ({ ...prev, recipientName: "" }));
        setMessage({
          type: "danger",
          text: "Account not found or inactive.",
        });
      }
    } catch (err) {
      console.error(err);
      setMessage({
        type: "danger",
        text: "Error fetching account details",
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: "", text: "" });

    if (!senderAccNo) {
      return setMessage({
        type: "danger",
        text: "Session expired. Please log in again.",
      });
    }

    // Validation
    if (!formData.recipientName || !formData.recipientAccount || !formData.amount) {
      return setMessage({ type: "danger", text: "Please fill all required fields." });
    }

    if (formData.amount <= 0) {
      return setMessage({ type: "danger", text: "Amount must be greater than 0." });
    }

    try {
      setLoading(true);

      const response = await axios.post("http://localhost:8000/api/transactions/transfer", {
        senderAccNo,
        ...formData,
      });

      setMessage({ type: "success", text: response.data.message });

      setFormData({
        recipientName: "",
        recipientAccount: "",
        amount: "",
        description: "",
       // type: "debit",
      });
    } catch (error) {
      const errMsg = error.response?.data?.message || "Something went wrong!";
      setMessage({ type: "danger", text: errMsg });
    } finally {
      setLoading(false);
    }
  };

  const formFields = [
    {
      icon: <FaWallet />,
      name: "recipientAccount",
      label: "Recipient Account*",
      type: "text",
      placeholder: "Enter account number",
    },
    {
      icon: <FaUser />,
      name: "recipientName",
      label: "Recipient Name",
      type: "text",
      placeholder: "Auto-filled",
      disabled: true,
    },
    {
      icon: <FaRupeeSign />,
      name: "amount",
      label: "Amount*",
      type: "number",
      placeholder: "Enter amount",
    },
    {
      icon: <FaUser />,
      name: "description",
      label: "Description",
      type: "text",
      placeholder: "Optional description",
    },
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
                  <div className="text-dark d-flex justify-content-center align-items-center" style={{ width: "35px", height: "35px" }}>
                    {field.icon}
                  </div>
                  <div className="w-100">
                    <label className="form-label small">{field.label}</label>
                    <input
                      type={field.type}
                      name={field.name}
                      placeholder={field.placeholder}
                      className="form-control"
                      value={formData[field.name]}
                      onChange={handleChange}
                      disabled={field.disabled}
                      onBlur={field.name === "recipientAccount" ? handleAccountBlur : undefined}
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
