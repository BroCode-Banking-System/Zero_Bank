// AccountDetails.jsx
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
  FaDownload, 
  FaEdit 
} from "react-icons/fa";

export default function AccountDetails() {
  const accountDetails = [
    { icon: <FaRegCreditCard />, label: "Account Number", value: "1234 5678 9012" },
    { icon: <FaUniversity />, label: "Account Type", value: "Savings Account" },
    { icon: <FaCoins />, label: "Balance", value: "₹1,25,000.50" },
    { icon: <FaMapMarkerAlt />, label: "Branch", value: "Kolkata Main Branch" },
    { icon: <FaCodeBranch />, label: "IFSC Code", value: "BANK0001234" },
    { icon: <FaCalendarAlt />, label: "Opening Date", value: "15th Jan 2020" },
    { icon: <FaCheckCircle />, label: "Status", value: "Active" },
  ];

  return (
    <div className="container mt-4 p-4">
      
      {/* Account Information Card */}
      <Card className="shadow rounded-4 p-3 mb-4">
        <Card.Header className="bg-primary text-white rounded-top-4 d-flex align-items-center mb-3">
          <FaRegCreditCard className="me-2" />
          <h4 className="mb-0">Account Information</h4>
        </Card.Header>

        <div className="row g-3">
          {accountDetails.map((item, idx) => (
            <div key={idx} className="col-md-6">
              <div className={`d-flex align-items-center gap-3 p-3 rounded-3 ${item.bg} shadow-sm`}>
                <div className="bg-white text-dark rounded-circle d-flex justify-content-center align-items-center" style={{ width: "35px", height: "35px" }}>
                  {item.icon}
                </div>
                <div>
                  <div className="small">{item.label}</div>
                  <div className="fw-bold">{item.value}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="mt-4 d-flex gap-3">
          <Button variant="success" className="d-flex align-items-center gap-2">
            <FaDownload /> Download Statement
          </Button>
          <Button variant="warning" className="d-flex align-items-center gap-2">
            <FaEdit /> Update Info
          </Button>
        </div>
      </Card>

      {/* Optional: Personal Information Update Form */}
      <Card className="shadow rounded-4 p-3">
        <Card.Header className="bg-info text-white rounded-top-4 d-flex align-items-center mb-3">
          <h5 className="mb-0">Personal Information</h5>
        </Card.Header>
        <form className="row g-3">
          <div className="col-md-6">
            <label className="form-label">Full Name</label>
            <input type="text" className="form-control" defaultValue="John Doe" />
          </div>
          <div className="col-md-6">
            <label className="form-label">Email</label>
            <input type="email" className="form-control" defaultValue="john.doe@example.com" />
          </div>
          <div className="col-md-6">
            <label className="form-label">Phone</label>
            <input type="text" className="form-control" defaultValue="+91 9876543210" />
          </div>
          <div className="col-md-6">
            <label className="form-label">Address</label>
            <input type="text" className="form-control" defaultValue="123, Park Street, Kolkata" />
          </div>
          <div className="col-12">
            <Button type="submit" variant="primary">Update Information</Button>
          </div>
        </form>
      </Card>

    </div>
  );
}
