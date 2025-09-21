import React, { useState } from "react";

function Insurance() {
  const [activeInsurance, setActiveInsurance] = useState(null); // "health" | "general" | "life"

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Apply for Insurance</h2>

      {/* --- Insurance Options --- */}
      <div className="row g-4">
        {/* Health Insurance */}
        <div className="col-md-4">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <h5 className="card-title">Health Insurance</h5>
              <p className="card-text">
                Comprehensive coverage for medical expenses and emergencies.
              </p>
              <button
                className="btn btn-primary"
                onClick={() => setActiveInsurance("health")}
              >
                Apply
              </button>
            </div>
          </div>
        </div>

        {/* General Insurance */}
        <div className="col-md-4">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <h5 className="card-title">General Insurance</h5>
              <p className="card-text">
                Protect your assets like vehicles, property, and travel plans.
              </p>
              <button
                className="btn btn-warning"
                onClick={() => setActiveInsurance("general")}
              >
                Apply
              </button>
            </div>
          </div>
        </div>

        {/* Life Insurance */}
        <div className="col-md-4">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <h5 className="card-title">Life Insurance</h5>
              <p className="card-text">
                Secure your family’s future with tailored life insurance plans.
              </p>
              <button
                className="btn btn-success"
                onClick={() => setActiveInsurance("life")}
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* --- Conditional Insurance Forms --- */}
      <div className="mt-5">
        {activeInsurance === "health" && (
          <div className="card p-4 shadow-sm">
            <h3>Health Insurance Application</h3>
            <form>
              <div className="mb-3">
                <label className="form-label">Full Name</label>
                <input type="text" className="form-control" />
              </div>
              <div className="mb-3">
                <label className="form-label">Age</label>
                <input type="number" className="form-control" />
              </div>
              <div className="mb-3">
                <label className="form-label">Pre-existing Conditions</label>
                <input type="text" className="form-control" />
              </div>
              <button type="submit" className="btn btn-primary">
                Submit Health Insurance
              </button>
            </form>
          </div>
        )}

        {activeInsurance === "general" && (
          <div className="card p-4 shadow-sm">
            <h3>General Insurance Application</h3>
            <form>
              <div className="mb-3">
                <label className="form-label">Full Name</label>
                <input type="text" className="form-control" />
              </div>
              <div className="mb-3">
                <label className="form-label">Insurance Type (e.g. Car, Home, Travel)</label>
                <input type="text" className="form-control" />
              </div>
              <div className="mb-3">
                <label className="form-label">Estimated Value</label>
                <input type="number" className="form-control" />
              </div>
              <button type="submit" className="btn btn-warning">
                Submit General Insurance
              </button>
            </form>
          </div>
        )}

        {activeInsurance === "life" && (
          <div className="card p-4 shadow-sm">
            <h3>Life Insurance Application</h3>
            <form>
              <div className="mb-3">
                <label className="form-label">Full Name</label>
                <input type="text" className="form-control" />
              </div>
              <div className="mb-3">
                <label className="form-label">Age</label>
                <input type="number" className="form-control" />
              </div>
              <div className="mb-3">
                <label className="form-label">Nominee Name</label>
                <input type="text" className="form-control" />
              </div>
              <button type="submit" className="btn btn-success">
                Submit Life Insurance
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default Insurance;
