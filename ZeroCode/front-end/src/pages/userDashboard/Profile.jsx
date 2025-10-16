// Profile.jsx
import React from "react";
import { FaUser, FaEnvelope, FaPhone, FaBirthdayCake, FaVenusMars, FaIdCard, FaAddressCard } from "react-icons/fa";
import { Link } from "react-router-dom";
//import image from "../../assets/img/profile.png";
import image from "../../assets/img/director3.jpg";

export default function Profile() {
  const profileDetails = [
    { icon: <FaUser />, label: "Name", value: "John Doe" },
    { icon: <FaEnvelope />, label: "Email", value: "john@example.com" },
    { icon: <FaPhone />, label: "Phone", value: "+91 9876543210" },
    { icon: <FaBirthdayCake />, label: "DOB", value: "01 Jan 1990" },
    { icon: <FaVenusMars />, label: "Gender", value: "Male" },
    { icon: <FaIdCard />, label: "Aadhaar", value: "3376 5432 1045" },
    { icon: <FaIdCard />, label: "PAN", value: "ABCD1234E" },
    { icon: <FaAddressCard />, label: "Address", value: "Kolkata, India" },
  ];

  return (
    <div className="container mt-5 py-5">
      <div className="card shadow-lg position-relative p-4">
        {/* Profile Image */}
        <img
          src={image}
          alt="Profile"
          className="rounded-circle border border-white shadow position-absolute"
          style={{ width: "100px", height: "100px", top: "-50px", right: "20px", objectFit: "cover" }}
        />

        <h2 className="card-title mb-4">Customer Profile</h2>

        <div className="row g-3">
          {profileDetails.map((item, idx) => (
            <div key={idx} className="col-md-6">
              <div className="d-flex align-items-center p-3 rounded shadow-sm border">
                <div className="me-3 p-3 rounded-circle bg-light text-dark d-flex justify-content-center align-items-center">
                  {item.icon}
                </div>
                <div>
                  <div className="small text-muted">{item.label}</div>
                  <div className="fw-bold">{item.value}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="text-center mt-4">
        <Link to="/userDashboard/settings" className="btn btn-primary px-4">
          Change Password & Security
        </Link>
      </div>
    </div>
  );
}
