import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg text-bg-light shadow-sm sticky-top">
      <div className="container">

        {/* Brand */}
        <Link
          className="navbar-brand text-primary fw-bold"
          to="/"
          style={{ letterSpacing: 1, textDecoration: "none" }}
        >
          ZeroBank
        </Link>

        {/* Toggler (for mobile) */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Nav Links */}
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item ms-4">
              <Link className="nav-link text-dark fw-medium" to="/">Home</Link>
            </li>
            <li className="nav-item ms-4">
              <Link className="nav-link text-dark fw-medium" to="/about">About Us</Link>
            </li>
            <li className="nav-item ms-4">
              <Link className="nav-link text-dark fw-medium" to="/services">Services</Link>
            </li>
            <li className="nav-item ms-4">
              <button
                className="btn btn-primary text-white fw-medium"
                data-bs-toggle="modal"
                data-bs-target="#loginModal"
              >
                Login
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
