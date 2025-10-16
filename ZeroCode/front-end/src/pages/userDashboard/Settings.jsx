// SecuritySettings.jsx
import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

export default function SecuritySettings() {
  const [password, setPassword] = useState("");
  const [notification, setNotification] = useState("Email");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can handle password & security updates (API call)
    alert("Settings updated successfully!");
  };

  return (
    <div className="container mt-4 py-5">
      <Card className="shadow rounded-4 p-4">
        <Card.Header className="bg-primary text-white rounded-top-4 mb-3">
          <h4 className="mb-0">Security Settings</h4>
        </Card.Header>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Change Password</label>
            <input 
              type="password" 
              className="form-control" 
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Notification Preferences</label>
            <select 
              className="form-select" 
              value={notification} 
              onChange={(e) => setNotification(e.target.value)}
            >
              <option>Email</option>
              <option>SMS</option>
              <option>Both</option>
            </select>
          </div>

          <div className="mb-3 form-check">
            <input type="checkbox" className="form-check-input" id="enable2FA" />
            <label className="form-check-label" htmlFor="enable2FA">Enable Two-Factor Authentication (2FA)</label>
          </div>

          <Button type="submit" variant="primary">Save Changes</Button>
        </form>
      </Card>
    </div>
  );
}
