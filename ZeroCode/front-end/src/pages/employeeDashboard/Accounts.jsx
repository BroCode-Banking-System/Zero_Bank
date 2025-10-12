import Card from "react-bootstrap/Card";
import { FaRegCreditCard, FaUniversity, FaCoins, FaMapMarkerAlt, FaCodeBranch, FaCalendarAlt, FaCheckCircle } from "react-icons/fa";

export default function Accounts() {
  const accountDetails = [
    { icon: <FaRegCreditCard />, label: "Account Number", value: "1234 5678 9012", bg: "bg-primary text-white" },
    { icon: <FaUniversity />, label: "Account Type", value: "Savings Account", bg: "bg-success text-white" },
    { icon: <FaCoins />, label: "Balance", value: "₹ 1,25,000.50", bg: "bg-warning text-dark" },
    { icon: <FaMapMarkerAlt />, label: "Branch", value: "Kolkata Main Branch", bg: "bg-info text-white" },
    { icon: <FaCodeBranch />, label: "IFSC Code", value: "BANK0001234", bg: "bg-secondary text-white" },
    { icon: <FaCalendarAlt />, label: "Opening Date", value: "15th Jan 2020", bg: "bg-danger text-white" },
    { icon: <FaCheckCircle />, label: "Status", value: "Active", bg: "bg-dark text-white" },
  ];

  return (
    <div className="container mt-4">
      <Card className="shadow rounded-4 p-3">
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
      </Card>
    </div>
  );
}
