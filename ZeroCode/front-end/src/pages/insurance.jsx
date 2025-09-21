import React, { useState } from "react";
import { FaHeartbeat, FaShieldAlt, FaUserShield, FaArrowLeft } from "react-icons/fa";

function Insurance() {
  const [activeInsurance, setActiveInsurance] = useState(null); // "health" | "general" | "life"

  return (
    <div className="container my-5 py-5">
      <h2 className="text-center fw-bold mb-5">Apply for Insurance</h2>

      {/* --- Insurance Options --- */}
      {!activeInsurance && (
        <div className="row g-4">
          {/* Health Insurance */}
          <div className="col-md-4">
            <div className="card shadow border-0 h-100 text-center">
              <div className="card-body p-4">
                <FaHeartbeat size={50} className="text-primary mb-3" />
                <h5 className="card-title fw-bold">Health Insurance</h5>
                <p className="card-text text-muted">
                  Comprehensive coverage for medical expenses and emergencies.
                </p>
                <button
                  className="btn btn-primary px-4 mt-3"
                  onClick={() => setActiveInsurance("health")}
                >
                  Apply Now
                </button>
              </div>
            </div>
          </div>

          {/* General Insurance */}
          <div className="col-md-4">
            <div className="card shadow border-0 h-100 text-center">
              <div className="card-body p-4">
                <FaShieldAlt size={50} className="text-warning mb-3" />
                <h5 className="card-title fw-bold">General Insurance</h5>
                <p className="card-text text-muted">
                  Protect your assets like vehicles, property, and travel plans.
                </p>
                <button
                  className="btn btn-warning px-4 mt-3"
                  onClick={() => setActiveInsurance("general")}
                >
                  Apply Now
                </button>
              </div>
            </div>
          </div>

          {/* Life Insurance */}
          <div className="col-md-4">
            <div className="card shadow border-0 h-100 text-center">
              <div className="card-body p-4">
                <FaUserShield size={50} className="text-success mb-3" />
                <h5 className="card-title fw-bold">Life Insurance</h5>
                <p className="card-text text-muted">
                  Secure your family’s future with tailored life insurance plans.
                </p>
                <button
                  className="btn btn-success px-4 mt-3"
                  onClick={() => setActiveInsurance("life")}
                >
                  Apply Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- Conditional Insurance Forms --- */}
      <div className="mt-5 w-50" style={{ maxWidth: "600px", margin: "0 auto" }}>
        {activeInsurance === "health" && (
          <div className="card p-4 shadow border-0">
            <h3 className="fw-bold text-primary mb-4">Health Insurance Application</h3>
            <form>
              <div className="mb-3">
                <label className="form-label fw-medium">Full Name</label>
                <input type="text" className="form-control" placeholder="Enter your full name" />
              </div>
              <div className="mb-3">
                <label className="form-label fw-medium">Age</label>
                <input type="number" className="form-control" placeholder="Enter your age" />
              </div>
              <div className="mb-3">
                <label className="form-label fw-medium">Pre-existing Conditions</label>
                <input type="text" className="form-control" placeholder="e.g. Diabetes, BP" />
              </div>
              <div className="d-flex justify-content-between">
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() => setActiveInsurance(null)}
                >
                  <FaArrowLeft className="me-2" /> Back
                </button>
                <button type="submit" className="btn btn-primary px-4">
                  Submit Application
                </button>
              </div>
            </form>
          </div>
        )}

        {activeInsurance === "general" && (
          <div className="card p-4 shadow border-0">
            <h3 className="fw-bold text-warning mb-4">General Insurance Application</h3>
            <form>
              <div className="mb-3">
                <label className="form-label fw-medium">Full Name</label>
                <input type="text" className="form-control" placeholder="Enter your full name" />
              </div>
              <div className="mb-3">
                <label className="form-label fw-medium">Insurance Type</label>
                <input type="text" className="form-control" placeholder="e.g. Car, Home, Travel" />
              </div>
              <div className="mb-3">
                <label className="form-label fw-medium">Estimated Value</label>
                <input type="number" className="form-control" placeholder="Enter asset value" />
              </div>
              <div className="d-flex justify-content-between">
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() => setActiveInsurance(null)}
                >
                  <FaArrowLeft className="me-2" /> Back
                </button>
                <button type="submit" className="btn btn-warning px-4">
                  Submit Application
                </button>
              </div>
            </form>
          </div>
        )}

        {activeInsurance === "life" && (
          <div className="card p-4 shadow border-0">
            <h3 className="fw-bold text-success mb-4">Life Insurance Application</h3>
            <form>
              <div className="mb-3">
                <label className="form-label fw-medium">Full Name</label>
                <input type="text" className="form-control" placeholder="Enter your full name" />
              </div>
              <div className="mb-3">
                <label className="form-label fw-medium">Age</label>
                <input type="number" className="form-control" placeholder="Enter your age" />
              </div>
              <div className="mb-3">
                <label className="form-label fw-medium">Nominee Name</label>
                <input type="text" className="form-control" placeholder="Enter nominee’s name" />
              </div>
              <div className="d-flex justify-content-between">
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() => setActiveInsurance(null)}
                >
                  <FaArrowLeft className="me-2" /> Back
                </button>
                <button type="submit" className="btn btn-success px-4">
                  Submit Application
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default Insurance;
