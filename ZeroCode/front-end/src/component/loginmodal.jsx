import React, { useState } from "react";
import { FaUser, FaLock } from "react-icons/fa"; // optional icons
import axios from "axios";

const LoginModal = () => {
  const [activeTab, setActiveTab] = useState("customer");
  const [formData, setFormData] = useState({
    customer: { userId: "", password: "" },
    employee: { employeeId: "", password: "" },
    admin: { username: "", password: "" },
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (role, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [role]: { ...prev[role], [field]: value },
    }));
  };

  const handleSubmit = async (role) => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.post("/api/auth/login", {
        role,
        ...formData[role],
      });

      console.log("Login Success:", response.data);
      
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const tabConfig = {
    customer: {
      bg: "#e6f7ff",
      fields: [
        { id: "userId", label: "User ID", type: "text", icon: <FaUser /> },
        { id: "password", label: "Password", type: "password", icon: <FaLock /> },
      ],
    },
    employee: {
      bg: "#fff7e6",
      fields: [
        { id: "employeeId", label: "Employee ID", type: "text", icon: <FaUser /> },
        { id: "password", label: "Password", type: "password", icon: <FaLock /> },
      ],
    },
    admin: {
      bg: "#fce4ec",
      fields: [
        { id: "username", label: "Username", type: "text", icon: <FaUser /> },
        { id: "password", label: "Password", type: "password", icon: <FaLock /> },
      ],
    },
  };

  return (
    <div className="modal fade" id="loginModal" tabIndex="-1" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content shadow-lg border-0 rounded-4 overflow-hidden">

          {/* Header */}
          <div className="modal-header border-0 bg-light">
            <h5 className="modal-title fw-bold text-primary">Login</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
          </div>

          {/* Body */}
          <div className="modal-body p-4" style={{ backgroundColor: tabConfig[activeTab].bg }}>
            
            {/* Tabs */}
            <ul className="nav nav-pills mb-4 justify-content-center">
              {Object.keys(tabConfig).map((role) => (
                <li className="nav-item" key={role}>
                  <button
                    className={`nav-link px-4 ${activeTab === role ? "active fw-semibold" : ""}`}
                    onClick={() => setActiveTab(role)}
                  >
                    {role.charAt(0).toUpperCase() + role.slice(1)}
                  </button>
                </li>
              ))}
            </ul>

            {/* Error Alert */}
            {error && (
              <div className="alert alert-danger py-2 text-center">{error}</div>
            )}

            {/* Dynamic Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit(activeTab);
              }}
            >
              {tabConfig[activeTab].fields.map((field) => (
                <div className="mb-3" key={field.id}>
                  <label htmlFor={`${activeTab}-${field.id}`} className="form-label">
                    {field.label}
                  </label>
                  <div className="input-group">
                    <span className="input-group-text">{field.icon}</span>
                    <input
                      type={field.type}
                      className="form-control"
                      id={`${activeTab}-${field.id}`}
                      placeholder={`Enter ${field.label}`}
                      value={formData[activeTab][field.id]}
                      onChange={(e) => handleChange(activeTab, field.id, e.target.value)}
                      required
                    />
                  </div>
                </div>
              ))}

              {/* Footer */}
              <div className="d-flex justify-content-between align-items-center mt-4">
                <a href="#" className="small text-primary text-decoration-none">Forgot Password?</a>
                <div>
                  <button
                    type="button"
                    className="btn btn-light me-2"
                    data-bs-dismiss="modal"
                    disabled={loading}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary px-4"
                    disabled={loading}
                  >
                    {loading ? "Logging in..." : "Login"}
                  </button>
                </div>
              </div>
            </form>

          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
