import { FaTasks, FaClipboardList, FaBuilding } from "react-icons/fa";

export default function EmployeeDashboard() {
  const tasks = [
    { id: 1, title: "Approve Loan Request", status: "Pending" },
    { id: 2, title: "Review Account Opening", status: "Completed" },
    { id: 3, title: "Verify KYC Documents", status: "Pending" },
  ];

  const branchSummary = {
    totalCustomers: 1200,
    accountsOpenedToday: 25,
    loansProcessedToday: 10,
    depositsToday: "₹4,50,000",
  };

  return (
    <div className="container mt-4 py-4 p-3">
      <h2 className="fw-bold mb-1">Welcome back, Employee!</h2>
      <p className="text-muted mb-4">Here’s your dashboard for branch operations.</p>

      {/* Branch Summary */}
      <h3 className="fw-bold mb-3">Branch Summary</h3>
      <div className="row g-3 mb-4">
        <div className="col-md-3">
          <div className="card text-center shadow-sm rounded-4 p-3 bg-primary text-white">
            <FaBuilding className="fs-2 mb-2" />
            <h5>Total Customers</h5>
            <p className="fs-4 fw-bold">{branchSummary.totalCustomers}</p>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-center shadow-sm rounded-4 p-3 bg-success text-white">
            <FaTasks className="fs-2 mb-2" />
            <h5>Accounts Opened Today</h5>
            <p className="fs-4 fw-bold">{branchSummary.accountsOpenedToday}</p>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-center shadow-sm rounded-4 p-3 bg-warning text-dark">
            <FaTasks className="fs-2 mb-2" />
            <h5>Loans Processed</h5>
            <p className="fs-4 fw-bold">{branchSummary.loansProcessedToday}</p>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-center shadow-sm rounded-4 p-3 bg-info text-white">
            <FaClipboardList className="fs-2 mb-2" />
            <h5>Deposits Today</h5>
            <p className="fs-4 fw-bold">{branchSummary.depositsToday}</p>
          </div>
        </div>
      </div>

      {/* Assigned Tasks */}
      <h3 className="fw-bold mb-3">Assigned Tasks</h3>
      <div className="card shadow-sm p-3 rounded-4 mb-4">
        <table className="table table-striped mb-0">
          <thead>
            <tr>
              <th>Task</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map(task => (
              <tr key={task.id}>
                <td>{task.title}</td>
                <td className={task.status === "Pending" ? "text-danger" : "text-success"}>
                  {task.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Quick Actions */}
      <h3 className="fw-bold mb-3">Quick Actions</h3>
      <div className="row g-3 mb-4">
        <div className="col-md-4">
          <button className="btn btn-outline-primary w-100 d-flex align-items-center justify-content-center gap-2">
            <FaTasks /> Approve Tasks
          </button>
        </div>
        <div className="col-md-4">
          <button className="btn btn-outline-success w-100 d-flex align-items-center justify-content-center gap-2">
            <FaClipboardList /> Review Reports
          </button>
        </div>
        <div className="col-md-4">
          <button className="btn btn-outline-warning w-100 d-flex align-items-center justify-content-center gap-2">
            <FaBuilding /> Branch Overview
          </button>
        </div>
      </div>
    </div>
  );
}
