import React, { useEffect, useState } from "react";
import {
  FaUniversity,
  FaWallet,
  FaCreditCard,
  FaPiggyBank,
  FaExchangeAlt,
  FaFileInvoice,
  FaUserFriends,
} from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // ✅ make sure to import this

export default function UserDashboard() {
  const navigate = useNavigate();
  
  const [userData, setUserData] = useState({
    totalBalance: 0,
    monthlySpending: 0,
    todayTransactions: 0,
  });

  // ✅ Get user info from localStorage
  const userId = localStorage.getItem("userId");
  const username = localStorage.getItem("username");
  const role = localStorage.getItem("role"); // ✅ ADD THIS LINE

  useEffect(() => {
    console.log("User ID:", userId);

    // ✅ Role check now works
    if (!role || role !== "user") {
      alert("Access denied. Please log in as User.");
      navigate("/");
      return;
    }

    if (userId) {
      axios
        .get(`http://localhost:8000/api/users/dashboard/${userId}`)
        .then((res) => {
          console.log("Fetched data:", res.data);
          setUserData({
            totalBalance: res.data.totalBalance || 0,
            monthlySpending: res.data.monthlySpending || 0,
            todayTransactions: res.data.todayTransactions || 0,
          });
        })
        .catch((err) => console.error("Error fetching user data:", err));
    }
  }, [userId, role, navigate]);


  const accounts = [
    {
      id: "savings",
      title: "Savings Account",
      balance: "₹3,25,000",
      accountNumber: "****1234",
      lastTransaction: "+₹15,000",
      icon: <FaWallet className="text-indigo-500 fs-3" />,
    },
    {
      id: "current",
      title: "Current Account",
      balance: "₹1,75,000",
      accountNumber: "****5678",
      lastTransaction: "-₹2,500",
      icon: <FaUniversity className="text-success fs-3" />,
    },
    {
      id: "credit",
      title: "Credit Card",
      balance: "Used: ₹25,000 / ₹1,00,000",
      accountNumber: "****7890",
      lastTransaction: "Due: 25 Sep",
      icon: <FaCreditCard className="text-danger fs-3" />,
    },
    {
      id: "fd",
      title: "Fixed Deposit",
      balance: "₹50,000 @ 7%",
      accountNumber: "Maturity: 12 Dec",
      lastTransaction: "Interest: ₹3,500",
      icon: <FaPiggyBank className="text-warning fs-3" />,
    },
  ];

  const transactions = [
    { id: 1, date: "20 Sep 2025", desc: "Salary Credit", amount: "+₹75,000", type: "credit" },
    { id: 2, date: "18 Sep 2025", desc: "Online Shopping", amount: "-₹5,200", type: "debit" },
    { id: 3, date: "16 Sep 2025", desc: "Electricity Bill", amount: "-₹2,300", type: "debit" },
    { id: 4, date: "14 Sep 2025", desc: "FD Interest", amount: "+₹3,500", type: "credit" },
  ];

  return (
    <div className="container mt-4 py-4">
      {/* Header Section */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h2 className="fw-bold mb-1">
            Welcome back, {username}!
          </h2>
          <p className="text-muted mb-0">
            Here’s your account overview at a glance.
          </p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="row g-3 mb-4">
        <div className="col-md-4">
          <div className="card text-center shadow-sm rounded-4 bg-primary text-white p-3">
            <h5>Total Balance</h5>
            <p className="fs-4 fw-bold">
              ₹{(userData.totalBalance || 0).toLocaleString()}
            </p>
            <small>Updated just now</small>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card text-center shadow-sm rounded-4 bg-success text-white p-3">
            <h5>Monthly Spending</h5>
            <p className="fs-4 fw-bold">
              ₹{(userData.monthlySpending || 0).toLocaleString()}
            </p>
            <small>Updated just now</small>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card text-center shadow-sm rounded-4 bg-warning text-dark p-3">
            <h5>Today Transactions</h5>
            <p className="fs-4 fw-bold">
              ₹{(userData.todayTransactions || 0).toLocaleString()}
            </p>
            <small>Updated just now</small>
          </div>
        </div>
      </div>

      {/* Account Overview */}
      <h3 className="fw-bold mb-3">Account Overview</h3>
      <div className="row g-3 mb-4">
        {accounts.map((acc) => (
          <div key={acc.id} className="col-md-3">
            <div className="card text-center shadow-sm rounded-4 p-3">
              <div className="mb-2">{acc.icon}</div>
              <h5 className="fw-semibold">{acc.title}</h5>
              <p className="fw-bold">{acc.balance}</p>
              <p className="text-muted mb-1">{acc.accountNumber}</p>
              <small className="text-secondary">{acc.lastTransaction}</small>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Access */}
      <h3 className="fw-bold mb-3">Quick Access</h3>
      <div className="row g-3 mb-4">
        <div className="col-md-4">
          <button className="btn btn-outline-primary w-100 d-flex align-items-center justify-content-center gap-2">
            <FaExchangeAlt /> Transfer Money
          </button>
        </div>
        <div className="col-md-4">
          <button className="btn btn-outline-success w-100 d-flex align-items-center justify-content-center gap-2">
            <FaFileInvoice /> Bill Payments
          </button>
        </div>
        <div className="col-md-4">
          <button className="btn btn-outline-warning w-100 d-flex align-items-center justify-content-center gap-2">
            <FaUserFriends /> Manage Payees
          </button>
        </div>
      </div>

      {/* Recent Activity */}
      <h3 className="fw-bold mb-3">Recent Activity</h3>
      <div className="card shadow-sm p-3 rounded-4">
        <table className="table table-striped mb-0">
          <thead>
            <tr>
              <th>Date</th>
              <th>Description</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx) => (
              <tr key={tx.id}>
                <td>{tx.date}</td>
                <td>{tx.desc}</td>
                <td
                  className={
                    tx.type === "credit" ? "text-success" : "text-danger"
                  }
                >
                  {tx.amount}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
