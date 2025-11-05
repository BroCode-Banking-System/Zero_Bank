//adminDashboard/Dashboard.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import {
  FaUsers,
  FaUniversity,
  FaMoneyBillWave,
  FaFileInvoice,
  FaCogs,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    totalCustomers: 0,
    totalEmployees: 0,
    activeAccounts: 0,
    transactionsToday: 0,
    pendingApprovals: 0,
  });

  // Fetch stats from backend
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/admin/dashboard-stats")
      .then((res) => setStats(res.data))
      .catch((err) => {
        console.error("Error fetching stats:", err);
        alert("Failed to load dashboard data. Please try again later.");
      });
  }, []);

  const statCards = [
    {
      id: "users",
      title: "Total Customers",
      value: stats.totalCustomers,
      icon: <FaUsers className="text-primary fs-5" />,
    },
    {
      id: "employees",
      title: "Total Employees",
      value: stats.totalEmployees,
      icon: <FaUsers className="text-info fs-5" />,
    },
    {
      id: "accounts",
      title: "Active Accounts",
      value: stats.activeAccounts,
      icon: <FaUniversity className="text-success fs-5" />,
    },
    {
      id: "transactions",
      title: "Transactions Today",
      value: `₹${Number(stats.transactionsToday || 0).toLocaleString()}`,
      icon: <FaMoneyBillWave className="text-warning fs-5" />,
    },
    {
      id: "pending",
      title: "Pending Approvals",
      value: stats.pendingApprovals,
      icon: <FaFileInvoice className="text-danger fs-3" />,
    },
  ];

  const quickActions = [
    {
      id: "manageUsers",
      title: "Manage Users",
      icon: <FaUsers />,
      path: "/adminDashboard/ManageUsers",
    },
    {
      id: "manageAccounts",
      title: "Manage Accounts",
      icon: <FaUniversity />,
      path: "/adminDashboard/accounts/ViewAccounts",
    },
    {
      id: "systemSettings",
      title: "System Settings",
      icon: <FaCogs />,
      path: "/adminDashboard/settings",
    },
  ];

  return (
    <div
      className="container mt-4 py-4"
      style={{ backgroundColor: "whitesmoke", minHeight: "100vh" }}
    >
      <h2 className="fw-bold mb-1">Administrator Dashboard</h2>
      <p className="text-muted mb-4">
        Monitor bank operations and manage users efficiently.
      </p>

      {/* Stats Cards */}
      <div className="row g-3 mb-2">
        {statCards.map((stat) => (
          <div key={stat.id} className="col-2 col-md-2">
            <div className="card shadow-sm rounded-4 p-3 text-center">
              <div className="mb-1">{stat.icon}</div>
              <h6 className="fw-semibold">{stat.title}</h6>
              <p className="fs-4 fw-bold">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <h3 className="fw-bold mb-3">Quick Actions</h3>
      <div className="row g-3 mb-4">
        {quickActions.map((action) => (
          <div key={action.id} className="col-6 col-md-3">
            <button
              className="btn btn-outline-primary w-100 d-flex align-items-center justify-content-center gap-2 py-4"
              onClick={() => action.path && navigate(action.path)}
            >
              {action.icon} {action.title}
            </button>
          </div>
        ))}
      </div>

      {/* Recent Transactions / Alerts */}
      <h3 className="fw-bold mb-3">View Transactions / Alerts</h3>
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
