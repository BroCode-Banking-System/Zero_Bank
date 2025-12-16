import React, { useState } from "react";
import {
  FaHeartbeat,
  FaShieldAlt,
  FaUserShield,
  FaArrowLeft,
} from "react-icons/fa";

function Insurance() {
  const [activeInsurance, setActiveInsurance] = useState(null);

  // LOGIN CHECK (same as Loan page)
  const isLoggedIn = !!localStorage.getItem("userId");

  /* =========================
     APPLY BUTTON HANDLER
  ========================= */
  const handleApplyNow = (type) => {
    if (isLoggedIn) {
      setActiveInsurance(type);
    } else {
      const modal = new window.bootstrap.Modal(
        document.getElementById("loginModal")
      );
      modal.show();
    }
  };

  return (
    <div className="container my-5 py-5">
      <h2 className="text-center fw-bold mb-5">Apply for Insurance</h2>

      {/* =========================
          INSURANCE OPTIONS
      ========================= */}
      {!activeInsurance && (
        <div className="row g-4 justify-content-center">
          {/* Health Insurance */}
          <div className="col-md-4">
            <div className="card shadow border-0 h-100 text-center p-4">
              <FaHeartbeat size={50} className="text-primary mb-3" />
              <h5 className="fw-bold">Health Insurance</h5>
              <p className="text-muted">
                Comprehensive coverage for medical expenses and emergencies.
              </p>
              <button
                className="btn btn-primary px-4 mt-auto"
                onClick={() => handleApplyNow("health")}
              >
                Apply Now
              </button>
            </div>
          </div>

          {/* General Insurance */}
          <div className="col-md-4">
            <div className="card shadow border-0 h-100 text-center p-4">
              <FaShieldAlt size={50} className="text-warning mb-3" />
              <h5 className="fw-bold">General Insurance</h5>
              <p className="text-muted">
                Protect your assets like vehicles, property, and travel plans.
              </p>
              <button
                className="btn btn-warning px-4 mt-auto"
                onClick={() => handleApplyNow("general")}
              >
                Apply Now
              </button>
            </div>
          </div>

          {/* Life Insurance */}
          <div className="col-md-4">
            <div className="card shadow border-0 h-100 text-center p-4">
              <FaUserShield size={50} className="text-success mb-3" />
              <h5 className="fw-bold">Life Insurance</h5>
              <p className="text-muted">
                Secure your family’s future with tailored life insurance plans.
              </p>
              <button
                className="btn btn-success px-4 mt-auto"
                onClick={() => handleApplyNow("life")}
              >
                Apply Now
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================
          INSURANCE FORMS
      ========================= */}
      {activeInsurance && (
        <div className="row justify-content-center mt-5">
          <div className="col-md-8 col-lg-6">
            <div className="card p-4 shadow border-0">
              <button
                className="btn btn-outline-secondary mb-3"
                onClick={() => setActiveInsurance(null)}
              >
                <FaArrowLeft className="me-2" />
                Back
              </button>

              {activeInsurance === "health" && <HealthInsuranceForm />}
              {activeInsurance === "general" && <GeneralInsuranceForm />}
              {activeInsurance === "life" && <LifeInsuranceForm />}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Insurance;

/* =========================
   INSURANCE FORMS
========================= */

function HealthInsuranceForm() {
  return (
    <>
      <h4 className="fw-bold text-primary mb-3">
        Health Insurance Application
      </h4>
      <input className="form-control mb-2" placeholder="Full Name" />
      <input className="form-control mb-2" placeholder="Age" type="number" />
      <input
        className="form-control mb-3"
        placeholder="Pre-existing Conditions"
      />
      <button className="btn btn-primary w-100">Submit Application</button>
    </>
  );
}

function GeneralInsuranceForm() {
  return (
    <>
      <h4 className="fw-bold text-warning mb-3">
        General Insurance Application
      </h4>
      <input className="form-control mb-2" placeholder="Full Name" />
      <input
        className="form-control mb-2"
        placeholder="Insurance Type (Car, Home, Travel)"
      />
      <input
        className="form-control mb-3"
        placeholder="Estimated Asset Value"
        type="number"
      />
      <button className="btn btn-warning w-100">Submit Application</button>
    </>
  );
}

function LifeInsuranceForm() {
  return (
    <>
      <h4 className="fw-bold text-success mb-3">
        Life Insurance Application
      </h4>
      <input className="form-control mb-2" placeholder="Full Name" />
      <input className="form-control mb-2" placeholder="Age" type="number" />
      <input
        className="form-control mb-3"
        placeholder="Nominee Name"
      />
      <button className="btn btn-success w-100">Submit Application</button>
    </>
  );
}
