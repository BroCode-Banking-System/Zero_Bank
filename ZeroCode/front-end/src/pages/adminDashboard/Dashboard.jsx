import { FaUsers, FaUniversity, FaMoneyBillWave, FaFileInvoice, FaChartLine, FaCogs } from "react-icons/fa";

export default function AdminDashboard() {
  const stats = [
    { id: "users", title: "Total Customers", value: 1520, icon: <FaUsers className="text-primary fs-3" /> },
    { id: "accounts", title: "Active Accounts", value: 3240, icon: <FaUniversity className="text-success fs-3" /> },
    { id: "transactions", title: "Transactions Today", value: "₹12,50,000", icon: <FaMoneyBillWave className="text-warning fs-3" /> },
    { id: "pending", title: "Pending Approvals", value: 34, icon: <FaFileInvoice className="text-danger fs-3" /> },
  ];

  const quickActions = [
    { id: "manageUsers", title: "Manage Users", icon: <FaUsers /> },
    { id: "manageAccounts", title: "Manage Accounts", icon: <FaUniversity /> },
    { id: "viewTransactions", title: "View Transactions", icon: <FaMoneyBillWave /> },
    { id: "systemSettings", title: "System Settings", icon: <FaCogs /> },
    { id: "analytics", title: "Analytics", icon: <FaChartLine /> },
  ];

  return (
    <div className="container mt-4">
      <h2 className="fw-bold mb-1">Administrator Dashboard</h2>
      <p className="text-muted mb-4">Monitor bank operations and manage users efficiently.</p>

      {/* Stats Cards */}
      <div className="row g-3 mb-4">
        {stats.map(stat => (
          <div key={stat.id} className="col-md-3">
            <div className="card shadow-sm rounded-4 p-3 text-center">
              <div className="mb-2">{stat.icon}</div>
              <h5 className="fw-semibold">{stat.title}</h5>
              <p className="fs-4 fw-bold">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <h3 className="fw-bold mb-3">Quick Actions</h3>
      <div className="row g-3 mb-4">
        {quickActions.map(action => (
          <div key={action.id} className="col-md-2">
            <button className="btn btn-outline-primary w-100 d-flex flex-column align-items-center justify-content-center gap-1 py-3">
              <div className="fs-4">{action.icon}</div>
              <small>{action.title}</small>
            </button>
          </div>
        ))}
      </div>

      {/* Recent Transactions / Alerts */}
      <h3 className="fw-bold mb-3">Recent Transactions / Alerts</h3>
      <div className="card shadow-sm p-3 rounded-4">
        <table className="table table-striped mb-0">
          <thead>
            <tr>
              <th>Transaction ID</th>
              <th>User</th>
              <th>Account</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>TXN1024</td>
              <td>John Doe</td>
              <td>****1234</td>
              <td>₹75,000</td>
              <td className="text-success">Completed</td>
            </tr>
            <tr>
              <td>TXN1025</td>
              <td>Jane Smith</td>
              <td>****5678</td>
              <td>₹5,200</td>
              <td className="text-danger">Failed</td>
            </tr>
            <tr>
              <td>TXN1026</td>
              <td>Robert Lee</td>
              <td>****7890</td>
              <td>₹2,300</td>
              <td className="text-warning">Pending</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}