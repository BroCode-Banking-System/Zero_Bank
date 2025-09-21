import { FaBell, FaUserCircle } from "react-icons/fa";
import logoImage from "../../assets/img/image12.png";

export default function Header() {
  return (
    <header className="bg-white shadow fixed-top w-full z-50 border-b border-gray-200">
      <div className="container-fluid d-flex justify-content-between align-items-center py-3 px-4">
        
         {/* Logo & Brand */}
        <div className="d-flex align-items-center">
          <img 
            src={logoImage} 
            alt="ZeroBank" 
            className="me-2"
            style={{ height: "40px" }} 
          />
          <span className="text-dark fs-4 fw-bold">ZeroBank</span>
        </div>

        {/* Search */}
        <div className="flex-grow-1 mx-4 d-none d-md-block">
          <input
            type="text"
            placeholder="Search transactions, accounts..."
            className="form-control rounded-pill border-gray-300 shadow-sm px-4 py-2 focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        {/* Actions */}
        <div className="d-flex align-items-center gap-3">
          
          {/* Notifications */}
          <button className="position-relative btn btn-light rounded-circle shadow-sm p-2 hover-shadow">
            <FaBell size={20} className="text-gray-600"/>
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
              3
            </span>
          </button>

          {/* Profile */}
          <div className="dropdown">
            <button
              className="btn d-flex align-items-center gap-2 shadow-sm p-2 rounded-pill hover-shadow"
              type="button"
              id="userMenuButton"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <FaUserCircle size={28} className="text-indigo-600"/>
              <span className="d-none d-lg-block fw-semibold text-gray-700">John Doe</span>
            </button>
            <ul className="dropdown-menu dropdown-menu-end shadow">
              <li><a className="dropdown-item" href="#">Profile</a></li>
              <li><a className="dropdown-item" href="#">Settings</a></li>
              <li><hr className="dropdown-divider" /></li>
              <li><a className="dropdown-item text-danger" href="#">Logout</a></li>
            </ul>
          </div>

        </div>
      </div>
    </header>
  );
}
  {/* Logo & Brand */}
        <div className="d-flex align-items-center">
          <img 
            src={logoImage} 
            alt="ZeroBank" 
            className="me-2"
            style={{ height: "40px" }} 
          />
          <span className="text-dark fs-4 fw-bold">ZeroBank</span>
        </div>