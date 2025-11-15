import { Link, useNavigate } from "react-router-dom";
import logoImage from "../../assets/img/image12.png";
import {
  FaTachometerAlt,
  FaWallet,
  FaExchangeAlt,
  FaUser,
  FaSignOutAlt
} from "react-icons/fa";
import { useEffect } from "react";

export default function Sidebar() {
  const navigate = useNavigate();

  // ✅ Check if logged-in user is employee (protect session)
  useEffect(() => {
    const role = localStorage.getItem("role");
    const username = localStorage.getItem("username");

    console.log("Sidebar session check:", { role, username });

    if (!role || role !== "employee") {
      alert("Access denied. Please log in as Employee.");
      navigate("/"); // redirect to login if unauthorized
    }
  }, [navigate]);

  // ✅ Logout with cleanup + confirmation
  const handleLogout = () => {
    const confirmed = window.confirm("Are you sure you want to logout?");
    if (confirmed) {
      localStorage.removeItem("role");
      localStorage.removeItem("username");
      localStorage.removeItem("token"); // optional if using JWTs
      navigate("/"); // redirect to home/login
    }
  };

  return (
    <div
      className="d-flex flex-column flex-shrink-0 bg-light border-end"
      style={{ width: "220px", minHeight: "100vh" }}
    >
      {/* --- Header (Logo + Brand) --- */}
      <div className="d-flex align-items-center px-3 py-4 border-bottom">
        <img
          src={logoImage}
          alt="ZeroBank"
          className="me-2"
          style={{ height: "35px" }}
        />
        <span className="text-dark fs-5 fw-bold">ZeroBank</span>
      </div>

      {/* --- Menu --- */}
      <div className="p-3 flex-grow-1">
        <ul className="nav nav-pills flex-column mb-auto">
          <li className="nav-item">
            <Link
              to="/employeeDashboard"
              className="nav-link d-flex align-items-center gap-2"
            >
              <FaTachometerAlt /> Dashboard
            </Link>
          </li>

          <li>
            <Link
              to="/employeeDashboard/accounts"
              className="nav-link d-flex align-items-center gap-2"
            >
              <FaWallet /> Accounts
            </Link>
          </li>

          {/* --- Transactions submenu --- */}
          <li>
            <a
              className="nav-link dropdown-toggle d-flex align-items-center gap-2"
              data-bs-toggle="collapse"
              href="#transactionsSubMenu"
              role="button"
              aria-expanded="false"
              aria-controls="transactionsSubMenu"
            >
              <FaExchangeAlt /> Transactions
            </a>
            <div className="collapse" id="transactionsSubMenu">
              <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small ms-4">
                <li>
                  <Link
                    to="/employeeDashboard/fund-transfer"
                    className="nav-link"
                  >
                    Fund Transfer
                  </Link>
                </li>
                <li>
                  <Link
                    to="/employeeDashboard/deposit-history"
                    className="nav-link"
                  >
                    Deposit History
                  </Link>
                </li>
                <li>
                  <Link
                    to="/employeeDashboard/withdrawal-history"
                    className="nav-link"
                  >
                    Withdrawal History
                  </Link>
                </li>
              </ul>
            </div>
          </li>

          <li>
            <Link
              to="/employeeDashboard/profile"
              className="nav-link d-flex align-items-center gap-2"
            >
              <FaUser /> Profile
            </Link>
          </li>

          {/* --- Logout --- */}
          <li className="mt-3">
            <button
              onClick={handleLogout}
              className="btn btn-danger w-100 d-flex align-items-center justify-content-center gap-2"
            >
              <FaSignOutAlt /> Logout
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}
