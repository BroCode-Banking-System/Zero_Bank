import React, { useState } from "react";

const LoginModal = () => {
  const [activeTab, setActiveTab] = useState("customer");

  const getBackgroundColor = () => {
    switch (activeTab) {
      case "customer":
        return "#e6f7ff"; // light blue
      case "employee":
        return "#fff7e6"; // light orange
      case "admin":
        return "#fce4ec"; // light pink
      default:
        return "#ffffff";
    }
  };

  return (
    <div
      className="modal fade"
      id="loginModal"
      tabIndex="-1"
      aria-labelledby="loginModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">

          {/* Modal Header */}
          <div className="modal-header">
            <h5 className="modal-title" id="loginModalLabel">Login</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>

          {/* Modal Body with Tabs */}
          <div className="modal-body" style={{ backgroundColor: getBackgroundColor() }}>

            {/* Tabs */}
            <ul className="nav nav-tabs mb-3" id="loginTabs" role="tablist">
              <li className="nav-item" role="presentation">
                <button
                  className={`nav-link ${activeTab === "customer" ? "active" : ""}`}
                  id="customer-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#customer"
                  type="button"
                  role="tab"
                  aria-controls="customer"
                  aria-selected={activeTab === "customer"}
                  onClick={() => setActiveTab("customer")}
                >
                  Customer
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className={`nav-link ${activeTab === "employee" ? "active" : ""}`}
                  id="employee-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#employee"
                  type="button"
                  role="tab"
                  aria-controls="employee"
                  aria-selected={activeTab === "employee"}
                  onClick={() => setActiveTab("employee")}
                >
                  Employee
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className={`nav-link ${activeTab === "admin" ? "active" : ""}`}
                  id="admin-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#admin"
                  type="button"
                  role="tab"
                  aria-controls="admin"
                  aria-selected={activeTab === "admin"}
                  onClick={() => setActiveTab("admin")}
                >
                  Admin
                </button>
              </li>
            </ul>

            {/* Tab Content */}
            <div className="tab-content" id="loginTabsContent">
              <div className={`tab-pane fade ${activeTab === "customer" ? "show active" : ""}`} id="customer" role="tabpanel">
                <form>
                  <div className="mb-3">
                    <label htmlFor="customerEmail" className="form-label">UserID</label>
                    <input type="email" className="form-control" id="customerEmail" placeholder="Enter UserID" />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="customerPassword" className="form-label">Password</label>
                    <input type="password" className="form-control" id="customerPassword" placeholder="Password" />

                  </div>

                  <div className="modal-footer d-flex justify-content-between align-items-center">
                    <div>
                      <a href="#" className="text-primary small text-decoration-none">Forgot Password?</a>
                    </div>
                    <div>
                      <button type="button" className="btn btn-secondary me-2" data-bs-dismiss="modal">Cancel</button>
                      <button type="button" className="btn btn-primary">Login</button>
                    </div>
                  </div>

                </form>
              </div>

              <div className={`tab-pane fade ${activeTab === "employee" ? "show active" : ""}`} id="employee" role="tabpanel">
                <form>
                  <div className="mb-3">
                    <label htmlFor="employeeId" className="form-label">Employee ID</label>
                    <input type="text" className="form-control" id="employeeId" placeholder="Enter Employee ID" />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="employeePassword" className="form-label">Password</label>
                    <input type="password" className="form-control" id="employeePassword" placeholder="Password" />
                  </div>
                  <div className="modal-footer d-flex justify-content-between align-items-center">
                    <div>
                      <a href="#" className="text-primary small text-decoration-none">Forgot Password?</a>
                    </div>
                    <div>
                      <button type="button" className="btn btn-secondary me-2" data-bs-dismiss="modal">Cancel</button>
                      <button type="button" className="btn btn-primary">Login</button>
                    </div>
                  </div>
                </form>
              </div>

              <div className={`tab-pane fade ${activeTab === "admin" ? "show active" : ""}`} id="admin" role="tabpanel">
                <form>
                  <div className="mb-3">
                    <label htmlFor="adminUsername" className="form-label">Username</label>
                    <input type="text" className="form-control" id="adminUsername" placeholder="Enter Username" />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="adminPassword" className="form-label">Password</label>
                    <input type="password" className="form-control" id="adminPassword" placeholder="Password" />
                  </div>
                  <div className="modal-footer d-flex justify-content-between align-items-center">
                    <div>
                      <a href="#" className="text-primary small text-decoration-none">Forgot Password?</a>
                    </div>
                    <div>
                      <button type="button" className="btn btn-secondary me-2" data-bs-dismiss="modal">Cancel</button>
                      <button type="button" className="btn btn-primary">Login</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* Modal Footer */}


        </div>
      </div>
    </div>
  );
};

export default LoginModal;
