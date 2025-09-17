export default function Settings() {
  return (
    <div>
      <h2>Settings</h2>
      <p>Manage your account preferences.</p>

      <form>
        <div className="mb-3">
          <label className="form-label">Change Password</label>
          <input type="password" className="form-control" placeholder="New Password" />
        </div>
        <div className="mb-3">
          <label className="form-label">Notification Preferences</label>
          <select className="form-select">
            <option>Email</option>
            <option>SMS</option>
            <option>Both</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">Save Changes</button>
      </form>
    </div>
  );
}
