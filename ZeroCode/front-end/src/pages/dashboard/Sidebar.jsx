import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div
      className="d-flex flex-column flex-shrink-0 p-3 bg-light border-end"
      style={{ width: "220px", marginTop: "56px", minHeight: "calc(100vh - 56px)" }}
    >
      <h5 className="text-primary">Menu</h5>
      <ul className="nav nav-pills flex-column mb-auto mt-3">
        <li className="nav-item">
          <Link to="/dashboard" className="nav-link">Dashboard</Link>
        </li>

        <li>
          <Link to="/dashboard/accounts" className="nav-link">Accounts</Link>
        </li>

        {/* Transactions with sub-menu */}
        <li>
          <a
            className="nav-link dropdown-toggle"
            data-bs-toggle="collapse"
            href="#transactionsSubMenu"
            role="button"
            aria-expanded="false"
            aria-controls="transactionsSubMenu"
          >
            Transactions
          </a>
          <div className="collapse" id="transactionsSubMenu">
            <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small ms-3">
              <li>
                <Link to="/transactions/fund-transfer" className="nav-link">Fund Transfer</Link>
              </li>
              <li>
                <Link to="/transactions/deposit-history" className="nav-link">Deposit History</Link>
              </li>
              <li>
                <Link to="/transactions/withdrawal-history" className="nav-link">Withdrawal History</Link>
              </li>
            </ul>
          </div>
        </li>

        <li>
          <Link to="/profile" className="nav-link">Profile</Link>
        </li>
        <li>
          <Link to="/settings" className="nav-link">Settings</Link>
        </li>
      </ul>
    </div>
  );
}
