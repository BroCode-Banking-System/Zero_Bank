import React, { useEffect, useState } from "react";
import { FaTasks, FaClipboardList, FaBuilding, FaCheck, FaTimes } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // ✅ for redirect if not employee

export default function EmployeeDashboard() {
  const navigate = useNavigate();

  const [branchSummary, setBranchSummary] = useState({
    totalCustomers: 0,
    accountsOpenedToday: 0,
    loansProcessedToday: 0,
    depositsToday: "₹0",
  });

  const [tasks, setTasks] = useState([]);
  const [showTaskPanel, setShowTaskPanel] = useState(false);

  // ✅ Role validation on mount
  useEffect(() => {
    const role = localStorage.getItem("role");
    const username = localStorage.getItem("username");

    console.log("Employee Role:", role, "Username:", username);

    if (!role || role !== "employee") {
      alert("Access denied. Please log in as Employee.");
      navigate("/");
      return;
    }
  }, [navigate]);

  // ✅ Fetch branch summary
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

  // ✅ Fetch tasks
  const fetchTasks = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/employees/tasks");
      setTasks(res.data);
    } catch (err) {
      console.error("Error fetching tasks:", err);
    }
  };

  // ✅ Handle approve/reject with optimistic update
  const handleTaskAction = async (id, action) => {
    setTasks((prev) =>
      prev.map((task) =>
        task._id === id
          ? { ...task, status: action === "approve" ? "Approved" : "Rejected" }
          : task
      )
    );

    try {
      await axios.patch(`http://localhost:8000/api/employees/tasks/${id}`, {
        status: action === "approve" ? "Approved" : "Rejected",
      });
    } catch (err) {
      console.error("Error updating task:", err);
      setTasks((prev) =>
        prev.map((task) =>
          task._id === id ? { ...task, status: "Pending" } : task
        )
      );
    }
  };

  // ✅ Toggle task panel with lazy loading
  const handleShowTasks = async () => {
    if (!showTaskPanel) await fetchTasks();
    setShowTaskPanel(!showTaskPanel);
  };

  return (
    <div className="container mt-4 py-4 p-3">
      <h2 className="fw-bold mb-1">
        Welcome back, {localStorage.getItem("username") || "Employee"}!
      </h2>
      <p className="text-muted mb-4">Here’s your dashboard for branch operations.</p>

      {/* --- Branch Summary --- */}
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

      {/* --- Quick Actions --- */}
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

      {/* --- Task Approval Section --- */}
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
                  <tr key={task._id}>
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
                            onClick={() => handleTaskAction(task._id, "approve")}
                          >
                            <FaCheck /> Approve
                          </button>
                          <button
                            className="btn btn-sm btn-danger d-flex align-items-center gap-1"
                            onClick={() => handleTaskAction(task._id, "reject")}
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
