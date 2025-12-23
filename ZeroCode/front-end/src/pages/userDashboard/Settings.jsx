// src/pages/userDashboard/Settings.jsx
import { useState } from "react";
import axios from "axios";
import { Alert, Spinner } from "react-bootstrap";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function ChangePassword() {
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [show, setShow] = useState({
    old: false,
    new: false,
    confirm: false,
  });

  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ type: "", message: "" });

  const userId = localStorage.getItem("userId");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { oldPassword, newPassword, confirmPassword } = formData;

    if (!oldPassword || !newPassword || !confirmPassword) {
      return setAlert({
        type: "danger",
        message: "All fields are required",
      });
    }

    if (newPassword !== confirmPassword) {
      return setAlert({
        type: "danger",
        message: "Passwords do not match",
      });
    }

    try {
      setLoading(true);
      setAlert({ type: "", message: "" });

      const res = await axios.put(
        `http://localhost:8000/api/user/change-password/${userId}`,
        { oldPassword, newPassword }
      );

      setAlert({ type: "success", message: res.data.message });
      setFormData({ oldPassword: "", newPassword: "", confirmPassword: "" });
    } catch (err) {
      setAlert({
        type: "danger",
        //message: err.response?.data?.message || "Error updating password",
        message: err.response?.data?.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "500px" }}>
      <div className="card shadow border-0 rounded-4">
        <div className="card-body p-4">
          <h4 className="fw-bold text-center mb-4">Change Password {userId}</h4>

          {alert.message && (
            <Alert
              variant={alert.type}
              dismissible
              onClose={() => setAlert({ type: "", message: "" })}
            >
              {alert.message}
            </Alert>
          )}

          {/* Old Password */}
          <div className="mb-3">
            <label className="form-label">Old Password</label>
            <div className="input-group">
              <input
                type={show.old ? "text" : "password"}
                className="form-control"
                name="oldPassword"
                value={formData.oldPassword}
                onChange={handleChange}
              />
              <span
                className="input-group-text"
                style={{ cursor: "pointer" }}
                onClick={() => setShow({ ...show, old: !show.old })}
              >
                {show.old ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>

          {/* New Password */}
          <div className="mb-3">
            <label className="form-label">New Password</label>
            <div className="input-group">
              <input
                type={show.new ? "text" : "password"}
                className="form-control"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
              />
              <span
                className="input-group-text"
                style={{ cursor: "pointer" }}
                onClick={() => setShow({ ...show, new: !show.new })}
              >
                {show.new ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>

          {/* Confirm Password */}
          <div className="mb-4">
            <label className="form-label">Confirm New Password</label>
            <div className="input-group">
              <input
                type={show.confirm ? "text" : "password"}
                className="form-control"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              <span
                className="input-group-text"
                style={{ cursor: "pointer" }}
                onClick={() =>
                  setShow({ ...show, confirm: !show.confirm })
                }
              >
                {show.confirm ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>

          <button
            className="btn btn-primary w-100"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? (
              <>
                <Spinner size="sm" /> Updating...
              </>
            ) : (
              "Change Password"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
