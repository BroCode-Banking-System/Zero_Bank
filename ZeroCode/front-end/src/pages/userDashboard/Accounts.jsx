// front-end/src/pages/userDashboard/Accounts.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useParams } from "react-router-dom";
import {
  FaRegCreditCard,
  FaUniversity,
  FaCoins,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaCheckCircle,
  FaDownload
} from "react-icons/fa";

export default function AccountDetails() {
  const [account, setAccount] = useState(null);
  const [error, setError] = useState("");

  const email = localStorage.getItem("email");

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/accounts/email/${email}`)
      .then(res => setAccount(res.data))
      .catch(() => setError("Account not found: " + email));
  }, [email]);

  if (error) return <p className="text-danger text-center">{error}</p>;
  if (!account) return <p className="text-center">Loading account...</p>;

  const downloadStatement = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/api/accounts/${account.accNo}/statement`,
        { responseType: "blob" }
      );

      if (res.data.size === 0) {
        alert("No transactions found");
        return;
      }

      const blob = new Blob([res.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = `statement-${account.accNo}.pdf`;
      link.click();

      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
      alert("Failed to download account statement");
    }
  };

  const details = [
    { icon: <FaRegCreditCard />, label: "Full Name", value: account.fullName },
    { icon: <FaUniversity />, label: "Email", value: account.email },
    { icon: <FaCoins />, label: "Mobile", value: account.mobile },
    { icon: <FaRegCreditCard />, label: "Account Number", value: account.accNo },
    { icon: <FaUniversity />, label: "Account Type", value: account.accountType },
    { icon: <FaCoins />, label: "Balance", value: `₹${account.balance}` },
    { icon: <FaMapMarkerAlt />, label: "City", value: account.city },
    {
      icon: <FaCalendarAlt />,
      label: "Opening Date",
      value: new Date(account.createdAt).toDateString()
    },
    { icon: <FaCheckCircle />, label: "Status", value: account.status }
  ];

  return (
    <div className="container mt-4">
      <Card className="shadow p-3 rounded-4">
        <Card.Header className="bg-primary text-white">
          <h4>Account Information</h4>
        </Card.Header>

        <div className="row mt-3 g-3">
          {details.map((item, i) => (
            <div key={i} className="col-md-6">
              <div className="d-flex gap-3 p-3 shadow-sm rounded-3">
                <span className="fs-4 text-primary">{item.icon}</span>
                <div>
                  <small className="text-muted">{item.label}</small>
                  <div className="fw-bold">{item.value}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <Button
          variant="success"
          className="mt-4 d-flex w-50 align-items-center gap-2"
          onClick={downloadStatement}
        >
          <FaDownload /> Download Account Statement
        </Button>


      </Card>
    </div>
  );
}

