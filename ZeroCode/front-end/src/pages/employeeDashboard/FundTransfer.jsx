import React from "react";
import { FaUser, FaWallet, FaRupeeSign } from "react-icons/fa";
import Card from "react-bootstrap/Card";

export default function FundTransfer() {
  const formFields = [
    { icon: <FaUser />, label: "Recipient Name", type: "text", placeholder: "Enter recipient name" },
    { icon: <FaWallet />, label: "Recipient Account", type: "text", placeholder: "Enter account number" },
    { icon: <FaRupeeSign />, label: "Amount", type: "number", placeholder: "Enter amount" },
    { icon: <FaUser />, label: "Description", type: "text", placeholder: "Optional description" },
  ];

  return (
    <div className="container mt-5 p-4">
      <Card className="shadow rounded-4 p-4">
        <Card.Header className="bg-white border-0 d-flex align-items-center mb-4">
          <FaWallet className="me-2 text-primary fs-4" />
          <h4 className="mb-0">Fund Transfer</h4>
        </Card.Header>

        <form>
          <div className="row g-3">
            {formFields.map((field, idx) => (
              <div key={idx} className="col-md-6">
                <div className="d-flex align-items-center gap-3 p-2 border rounded-3 shadow-sm">
                  <div className="d-flex justify-content-center align-items-center text-primary" 
                       style={{ width: "40px", height: "40px" }}>
                    {field.icon}
                  </div>
                  <div className="w-100">
                    <label className="form-label small">{field.label}</label>
                    <input
                      type={field.type}
                      className="form-control shadow-none"
                      placeholder={field.placeholder}
                      required={field.type !== "text" || field.label !== "Description"}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-4">
            <button type="submit" className="btn btn-primary px-5 py-2 fw-semibold">
              Transfer
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
}
