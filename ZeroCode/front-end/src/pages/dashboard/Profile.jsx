import { FaUser, FaEnvelope, FaPhone, FaBirthdayCake, FaVenusMars, FaIdCard, FaAddressCard } from "react-icons/fa";
import { Link } from "react-router-dom";
import image from "../../assets/img/profile.png";

export default function Profile() {
  const profileDetails = [
    { icon: <FaUser />, label: "Name", value: "John Doe", bg: "bg-primary" },
    { icon: <FaEnvelope />, label: "Email", value: "john@example.com", bg: "bg-success" },
    { icon: <FaPhone />, label: "Phone", value: "+91 9876543210", bg: "bg-warning" },
    { icon: <FaBirthdayCake />, label: "DOB", value: "01 Jan 1990", bg: "bg-info" },
    { icon: <FaVenusMars />, label: "Gender", value: "Male", bg: "bg-danger" },
    { icon: <FaIdCard />, label: "Aadhaar", value: "3376 5432 1045", bg: "bg-secondary" },
    { icon: <FaIdCard />, label: "PAN", value: "ABCD1234E", bg: "bg-dark" },
    { icon: <FaAddressCard />, label: "Address", value: "Kolkata, India", bg: "bg-primary" },
  ];

  return (
    <div className="container mt-5">
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
              <div className={`d-flex align-items-center p-3 rounded shadow-sm ${item.bg} text-white`}>
                <div className="me-3 p-3 rounded-circle bg-white text-dark d-flex justify-content-center align-items-center">
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
      </div>
      <div className="text-center mt-4">
        {/* <button to="/dashboard/settings" className="btn btn-primary px-4">Change Password</button> */}
        <Link to="/dashboard/settings" className="btn btn-primary px-4">
          Change Password
        </Link>
      </div>
    </div>
  );
}
