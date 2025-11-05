//employeeDashboard/Dashboard.jsx
// import React, { useEffect, useState } from "react";
// import { FaTasks, FaClipboardList, FaBuilding } from "react-icons/fa";
// import axios from "axios";

// export default function EmployeeDashboard() {
//   const [branchSummary, setBranchSummary] = useState({
//     totalCustomers: 0,
//     accountsOpenedToday: 0,
//     loansProcessedToday: 0,
//     depositsToday: "₹0",
//   });

//   const [tasks] = useState([
//     { id: 1, title: "Approve Loan Request", status: "Pending" },
//     { id: 2, title: "Review Account Opening", status: "Completed" },
//     { id: 3, title: "Verify KYC Documents", status: "Pending" },
//   ]);

//   // Fetch data from backend
//   useEffect(() => {
//     const fetchBranchSummary = async () => {
//       try {
//         const res = await axios.get("http://localhost:8000/api/employees/branch-summary");
//         setBranchSummary(res.data);
//       } catch (err) {
//         console.error("Error fetching branch summary:", err);
//       }
//     };
//     fetchBranchSummary();
//   }, []);

//   return (
//     <div className="container mt-4 py-4 p-3">
//       <h2 className="fw-bold mb-1">Welcome back, Employee!</h2>
//       <p className="text-muted mb-4">Here’s your dashboard for branch operations.</p>

//       {/* Branch Summary */}
//       <h3 className="fw-bold mb-3">Branch Summary</h3>
//       <div className="row g-3 mb-4">
//         <div className="col-md-3">
//           <div className="card text-center shadow-sm rounded-4 p-3 bg-primary text-white">
//             <FaBuilding className="fs-2 mb-2" />
//             <h5>Total Customers</h5>
//             <p className="fs-4 fw-bold">{branchSummary.totalCustomers}</p>
//           </div>
//         </div>
//         <div className="col-md-3">
//           <div className="card text-center shadow-sm rounded-4 p-3 bg-success text-white">
//             <FaTasks className="fs-2 mb-2" />
//             <h5>Accounts Opened Today</h5>
//             <p className="fs-4 fw-bold">{branchSummary.accountsOpenedToday}</p>
//           </div>
//         </div>
//         <div className="col-md-3">
//           <div className="card text-center shadow-sm rounded-4 p-3 bg-warning text-dark">
//             <FaTasks className="fs-2 mb-2" />
//             <h5>Loans Processed</h5>
//             <p className="fs-4 fw-bold">{branchSummary.loansProcessedToday}</p>
//           </div>
//         </div>
//         <div className="col-md-3">
//           <div className="card text-center shadow-sm rounded-4 p-3 bg-info text-white">
//             <FaClipboardList className="fs-2 mb-2" />
//             <h5>Deposits Today</h5>
//             <p className="fs-4 fw-bold">{branchSummary.depositsToday}</p>
//           </div>
//         </div>
//       </div>

//       {/* Assigned Tasks */}
//       <h3 className="fw-bold mb-3">Assigned Tasks</h3>
//       <div className="card shadow-sm p-3 rounded-4 mb-4">
//         <table className="table table-striped mb-0">
//           <thead>
//             <tr>
//               <th>Task</th>
//               <th>Status</th>
//             </tr>
//           </thead>
//           <tbody>
//             {tasks.map(task => (
//               <tr key={task.id}>
//                 <td>{task.title}</td>
//                 <td className={task.status === "Pending" ? "text-danger" : "text-success"}>
//                   {task.status}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Quick Actions */}
//       <h3 className="fw-bold mb-3">Quick Actions</h3>
//       <div className="row g-3 mb-4">
//         <div className="col-md-4">
//           <button className="btn btn-outline-primary w-100 d-flex align-items-center justify-content-center gap-2">
//             <FaTasks /> Approve Tasks
//           </button>
//         </div>
//         <div className="col-md-4">
//           <button className="btn btn-outline-success w-100 d-flex align-items-center justify-content-center gap-2">
//             <FaClipboardList /> Review Reports
//           </button>
//         </div>
//         <div className="col-md-4">
//           <button className="btn btn-outline-warning w-100 d-flex align-items-center justify-content-center gap-2">
//             <FaBuilding /> Branch Overview
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }


import React, { useEffect, useState } from "react";
import { FaTasks, FaClipboardList, FaBuilding, FaCheck, FaTimes } from "react-icons/fa";
import axios from "axios";

export default function EmployeeDashboard() {
  const [branchSummary, setBranchSummary] = useState({
    totalCustomers: 0,
    accountsOpenedToday: 0,
    loansProcessedToday: 0,
    depositsToday: "₹0",
  });

  const [tasks, setTasks] = useState([]);
  const [showTaskPanel, setShowTaskPanel] = useState(false);

  // Fetch branch summary
  useEffect(() => {
    const fetchBranchSummary = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/employees/branch-summary");
        setBranchSummary(res.data);
      } catch (err) {
        console.error("Error fetching branch summary:", err);
      }
    };
    fetchBranchSummary();
  }, []);

  // Fetch tasks (initial or when task panel opens)
  const fetchTasks = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/employees/tasks");
      setTasks(res.data);
    } catch (err) {
      console.error("Error fetching tasks:", err);
    }
  };

  // Handle approve/reject
  const handleTaskAction = async (id, action) => {
    try {
      await axios.patch(`http://localhost:8000/api/employees/tasks/${id}`, {
        status: action === "approve" ? "Approved" : "Rejected",
      });
      setTasks((prev) =>
        prev.map((task) =>
          task.id === id ? { ...task, status: action === "approve" ? "Approved" : "Rejected" } : task
        )
      );
    } catch (err) {
      console.error("Error updating task:", err);
    }
  };

  // Toggle task panel
  const handleShowTasks = async () => {
    if (!showTaskPanel) await fetchTasks();
    setShowTaskPanel(!showTaskPanel);
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

      {/* Quick Actions */}
      <h3 className="fw-bold mb-3">Quick Actions</h3>
      <div className="row g-3 mb-4">
        <div className="col-md-4">
          <button
            className="btn btn-outline-primary w-100 d-flex align-items-center justify-content-center gap-2"
            onClick={handleShowTasks}
          >
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

      {/* Task Approval Section */}
      {showTaskPanel && (
        <div className="card shadow-sm p-3 rounded-4 mb-4">
          <h4 className="fw-bold mb-3">Task Approval Panel</h4>
          <table className="table table-hover mb-0">
            <thead>
              <tr>
                <th>Task</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {tasks.length === 0 ? (
                <tr>
                  <td colSpan="3" className="text-center text-muted">
                    No tasks found.
                  </td>
                </tr>
              ) : (
                tasks.map((task) => (
                  <tr key={task.id}>
                    <td>{task.title}</td>
                    <td
                      className={
                        task.status === "Pending"
                          ? "text-warning"
                          : task.status === "Approved"
                          ? "text-success"
                          : "text-danger"
                      }
                    >
                      {task.status}
                    </td>
                    <td>
                      {task.status === "Pending" ? (
                        <div className="d-flex gap-2">
                          <button
                            className="btn btn-sm btn-success d-flex align-items-center gap-1"
                            onClick={() => handleTaskAction(task.id, "approve")}
                          >
                            <FaCheck /> Approve
                          </button>
                          <button
                            className="btn btn-sm btn-danger d-flex align-items-center gap-1"
                            onClick={() => handleTaskAction(task.id, "reject")}
                          >
                            <FaTimes /> Reject
                          </button>
                        </div>
                      ) : (
                        <span className="text-muted">No action</span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
