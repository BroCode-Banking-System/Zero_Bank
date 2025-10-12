// adminSettings.jsx
export default function AdminSettings() {
  return (
    <div className="container mt-4">
      <h3 className="mb-4 fw-bold">Administrator Settings</h3>
      
      <form>
        <div className="mb-3">
          <label className="form-label">Change Password</label>
          <input type="password" className="form-control" placeholder="New Password" />
        </div>

        <div className="mb-3">
          <label className="form-label">Role & Permissions</label>
          <select className="form-select">
            <option value="full">Full Access</option>
            <option value="limited">Limited Access</option>
            <option value="audit">Audit Only</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Branch Assignment</label>
          <select className="form-select">
            <option>Kolkata HQ</option>
            <option>Delhi Branch</option>
            <option>Mumbai Branch</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary">Save Changes</button>
      </form>
    </div>
  );
}
