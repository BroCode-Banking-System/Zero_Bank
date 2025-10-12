import React, { useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginModal = () => {
  const [activeTab, setActiveTab] = useState("user");
  const [formData, setFormData] = useState({
    user: { userId: "", password: "" },
    employee: { employeeId: "", password: "" },
    admin: { username: "", password: "" },
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // handle input changes
  const handleChange = (role, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [role]: { ...prev[role], [field]: value },
    }));
  };

  // handle login
  const handleSubmit = async (role) => {
    setLoading(true);
    setError("");

    try {
      let payload = {};

      if (role === "admin") {
        payload = {
          username: formData.admin.username,
          password: formData.admin.password,
          role: "admin",
        };
      } else if (role === "employee") {
        payload = {
          username: formData.employee.employeeId,
          password: formData.employee.password,
          role: "employee",
        };
      } else {
        // user login
        payload = {
          username: formData.user.userId,
          password: formData.user.password,
          role: "user",
        };
      }

      const response = await axios.post(
        "http://localhost:8000/api/auth/login",
        payload
      );

      console.log("Login Success:", response.data);
      const userRole = response.data.user.role;

      // Redirect based on role
      if (userRole === "admin") navigate("/adminDashboard");
      else if (userRole === "employee") navigate("/employeeDashboard");
      else if (userRole === "user") navigate("/userDashboard");
      else navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  // consistent tab config
  const tabConfig = {
    user: {
      bg: "#f5f9ff",
      fields: [
        { id: "userId", label: "User ID", type: "text", icon: <FaUser /> },
        { id: "password", label: "Password", type: "password", icon: <FaLock /> },
      ],
    },
    employee: {
      bg: "#fff8ef",
      fields: [
        { id: "employeeId", label: "Employee ID", type: "text", icon: <FaUser /> },
        { id: "password", label: "Password", type: "password", icon: <FaLock /> },
      ],
    },
    admin: {
      bg: "#fef4f8",
      fields: [
        { id: "username", label: "Username", type: "text", icon: <FaUser /> },
        { id: "password", label: "Password", type: "password", icon: <FaLock /> },
      ],
    },
  };

  const currentTab = tabConfig[activeTab];

  return (
    <div className="modal fade" id="loginModal" tabIndex="-1" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content shadow-lg border-0 rounded-4 overflow-hidden">
          <div className="modal-header border-0 bg-light">
            <h5 className="modal-title fw-bold text-primary">Login</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
          </div>

          {/* Tab Body */}
          <div
            className="modal-body p-4"
            style={{ backgroundColor: currentTab.bg }}
          >
            {/* Tabs */}
            <ul className="nav nav-pills mb-4 justify-content-center">
              {Object.keys(tabConfig).map((role) => (
                <li className="nav-item" key={role}>
                  <button
                    className={`nav-link px-4 ${
                      activeTab === role ? "active fw-semibold" : ""
                    }`}
                    onClick={() => setActiveTab(role)}
                    disabled={loading}
                  >
                    {role === "user"
                      ? "User"
                      : role.charAt(0).toUpperCase() + role.slice(1)}
                  </button>
                </li>
              ))}
            </ul>

            {/* Error Alert */}
            {error && <div className="alert alert-danger py-2 text-center">{error}</div>}

            {/* Login Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit(activeTab);
              }}
            >
              {currentTab.fields.map((field) => (
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
                      disabled={loading}
                      required
                    />
                  </div>
                </div>
              ))}

              {/* Buttons */}
              <div className="d-flex justify-content-between align-items-center mt-4">
                <a href="#" className="small text-primary text-decoration-none">
                  Forgot Password?
                </a>
                <div>
                  <button
                    type="button"
                    className="btn btn-light me-2"
                    data-bs-dismiss="modal"
                    disabled={loading}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary px-4" disabled={loading}>
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
