import React, { useState } from "react";

export default function Settings() {
  const [password, setPassword] = useState("");
  const [notification, setNotification] = useState("Email");
  const [darkMode, setDarkMode] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle save logic here (API call)
    alert(`Settings saved:\nPassword: ${password ? "Updated" : "Unchanged"}\nNotification: ${notification}\nDark Mode: ${darkMode ? "Enabled" : "Disabled"}`);
  };

  return (
    <div className="container mt-5">
      <div className={`card shadow-lg p-4 ${darkMode ? "bg-dark text-light" : "bg-white text-dark"}`}>
        <h2 className="mb-4">Personal Settings</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Change Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="New Password"
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

          <div className="form-check form-switch mb-4">
            <input
              className="form-check-input"
              type="checkbox"
              id="darkModeSwitch"
              checked={darkMode}
              onChange={() => setDarkMode(!darkMode)}
            />
            <label className="form-check-label" htmlFor="darkModeSwitch">
              Enable Dark Mode
            </label>
          </div>

          <button type="submit" className="btn btn-primary">
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}
