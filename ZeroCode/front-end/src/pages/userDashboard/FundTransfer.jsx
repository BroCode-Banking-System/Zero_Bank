// FundTransfer.jsx
import React from "react";
import { FaUser, FaWallet, FaRupeeSign } from "react-icons/fa";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

export default function FundTransfer() {
  const formFields = [
    { icon: <FaUser />, label: "Recipient Name", type: "text", placeholder: "Enter recipient name" },
    { icon: <FaWallet />, label: "Recipient Account", type: "text", placeholder: "Enter account number" },
    { icon: <FaRupeeSign />, label: "Amount", type: "number", placeholder: "Enter amount" },
    { icon: <FaUser />, label: "Description", type: "text", placeholder: "Optional description" },
  ];

  return (
    <div className="container mt-5 p-3">
    <Card className="shadow rounded-4 p-3">
      <Card.Header className="bg-primary text-white rounded-top-4 d-flex align-items-center mb-3">
        <FaWallet className="me-2" />
        <h4 className="mb-0">Fund Transfer</h4>
      </Card.Header>

      <form>
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
                    className="form-control"
                    placeholder={field.placeholder}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-4">
          <Button type="submit" variant="primary" className="px-4">Transfer</Button>
        </div>
      </form>
    </Card>
  </div>
  );
}
