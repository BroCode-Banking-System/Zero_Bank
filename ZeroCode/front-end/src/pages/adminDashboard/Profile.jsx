// profile.jsx
import { FaUser, FaEnvelope, FaPhone, FaBirthdayCake, FaVenusMars, FaIdCard, FaAddressCard } from "react-icons/fa";
import { Link } from "react-router-dom";
// import image from "../../assets/img/profile.png";
import image from "../../assets/img/director1.jpg";

export default function Profile() {
  const profileDetails = [
    { icon: <FaUser />, label: "Name", value: "John Doe", bg: "bg-light" },
    { icon: <FaEnvelope />, label: "Email", value: "john@example.com", bg: "bg-light" },
    { icon: <FaPhone />, label: "Phone", value: "+91 9876543210", bg: "bg-light" },
    { icon: <FaBirthdayCake />, label: "DOB", value: "01 Jan 1990", bg: "bg-light" },
    { icon: <FaVenusMars />, label: "Gender", value: "Male", bg: "bg-light" },
    { icon: <FaIdCard />, label: "Aadhaar", value: "3376 5432 1045", bg: "bg-light" },
    { icon: <FaIdCard />, label: "PAN", value: "ABCD1234E", bg: "bg-light" },
    { icon: <FaAddressCard />, label: "Address", value: "Kolkata, India", bg: "bg-light" },
  ];

  return (
    <div className="container mt-5 py-5" style={{ backgroundColor: "whitesmoke", minHeight: "100vh", paddingBottom: "50px" }}>
      <div className="card shadow-lg p-4 position-relative" style={{ backgroundColor: "#f5f5f5" }}>
        {/* Profile Image */}
        <img
          src={image}
          alt="Profile"
          className="rounded-circle border border-white shadow position-absolute"
          style={{ width: "100px", height: "100px", top: "-50px", right: "20px", objectFit: "cover" }}
        />

        <h2 className="card-title mb-4 text-dark">Admin Profile</h2>

        <div className="row g-3">
          {profileDetails.map((item, idx) => (
            <div key={idx} className="col-md-6">
              <div
                className={`d-flex align-items-center p-3 rounded shadow-sm ${item.bg}`}
                style={{ color: "#333", backgroundColor: "#ffffffcc" }}
              >
                <div
                  className="d-flex justify-content-center align-items-center rounded-circle me-3"
                  style={{ width: "50px", height: "50px", backgroundColor: "rgba(0,0,0,0.05)" }}
                >
                  <span className="fs-5">{item.icon}</span>
                </div>
                <div>
                  <div className="small">{item.label}</div>
                  <div className="fw-bold">{item.value}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-4">
          <Link to="/adminDashboard/settings" className="btn btn-primary px-4">
            Change Settings
          </Link>
        </div>
      </div>
    </div>
  );
}
