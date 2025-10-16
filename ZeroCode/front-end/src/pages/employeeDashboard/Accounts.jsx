// src/components/Accounts.jsx
import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import {
  FaRegCreditCard,
  FaUniversity,
  FaCoins,
  FaMapMarkerAlt,
  FaCodeBranch,
  FaCalendarAlt,
  FaCheckCircle,
  FaUserCheck,
  FaEdit,
  FaTimesCircle,
} from "react-icons/fa";

const accountDetails = [
  { icon: <FaRegCreditCard />, label: "Account Number", value: "1234 5678 9012" },
  { icon: <FaUniversity />, label: "Account Type", value: "Savings Account" },
  { icon: <FaCoins />, label: "Balance", value: "₹ 1,25,000.50" },
  { icon: <FaMapMarkerAlt />, label: "Branch", value: "Kolkata Main Branch" },
  { icon: <FaCodeBranch />, label: "IFSC Code", value: "BANK0001234" },
  { icon: <FaCalendarAlt />, label: "Opening Date", value: "15th Jan 2020" },
  { icon: <FaCheckCircle />, label: "Status", value: "Active" },
];

function AccountCard({ icon, label, value, bg }) {
  return (
    <div className="col-md-6">
      <div className={`d-flex align-items-center gap-3 p-3 rounded-3 ${bg} shadow-sm hover-shadow transition`}>
        <div
          className="bg-white text-dark rounded-circle d-flex justify-content-center align-items-center"
          style={{ width: "40px", height: "40px", fontSize: "1.2rem" }}
        >
          {icon}
        </div>
        <div>
          <div className="small">{label}</div>
          <div className="fw-bold">{value}</div>
        </div>
      </div>
    </div>
  );
}

export default function Accounts() {
  const handleVerifyKYC = () => {
    alert("KYC verification triggered!");
  };

  const handleUpdateInfo = () => {
    alert("Update info modal triggered!");
  };

  const handleCloseAccount = () => {
    alert("Close account request triggered!");
  };

  return (
    <div className="container mt-5 p-4">
      <Card className="shadow rounded-4 p-3">
        <Card.Header className="bg-primary text-white rounded-top-4 d-flex align-items-center mb-3">
          <FaRegCreditCard className="me-2" />
          <h4 className="mb-0">Account Information</h4>
        </Card.Header>

        <div className="row g-3 mb-3">
          {accountDetails.map((item, idx) => (
            <AccountCard key={idx} {...item} />
          ))}
        </div>

        <div className="d-flex justify-content-end gap-2 mt-3">
          <Button variant="success" onClick={handleVerifyKYC}>
            <FaUserCheck className="me-1" /> Verify KYC
          </Button>
          <Button variant="primary" onClick={handleUpdateInfo}>
            <FaEdit className="me-1" /> Update Info
          </Button>
          <Button variant="danger" onClick={handleCloseAccount}>
            <FaTimesCircle className="me-1" /> Close Account
          </Button>
        </div>
      </Card>
    </div>
  );
}
