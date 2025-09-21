import React, { useState } from "react";

function Loan() {
  const [activeLoan, setActiveLoan] = useState(null); // "home" | "gold" | "business" | "agriculture"

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Apply for a Loan</h2>

      {/* --- Loan Options --- */}
      <div className="row g-4">
        {/* Home Loan */}
        <div className="col-md-3">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <h5 className="card-title">Home Loan</h5>
              <p className="card-text">
                Get the best interest rates to buy or build your dream home.
              </p>
              <button
                className="btn btn-primary"
                onClick={() => setActiveLoan("home")}
              >
                Apply
              </button>
            </div>
          </div>
        </div>

        {/* Gold Loan */}
        <div className="col-md-3">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <h5 className="card-title">Gold Loan</h5>
              <p className="card-text">
                Unlock the value of your gold with instant loans at low interest.
              </p>
              <button
                className="btn btn-warning"
                onClick={() => setActiveLoan("gold")}
              >
                Apply
              </button>
            </div>
          </div>
        </div>

        {/* Business Loan */}
        <div className="col-md-3">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <h5 className="card-title">Business Loan</h5>
              <p className="card-text">
                Boost your business growth with our flexible loan solutions.
              </p>
              <button
                className="btn btn-success"
                onClick={() => setActiveLoan("business")}
              >
                Apply
              </button>
            </div>
          </div>
        </div>

        {/* Agriculture Loan */}
        <div className="col-md-3">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <h5 className="card-title">Agriculture Loan</h5>
              <p className="card-text">
                Affordable loans to support farmers and agricultural needs.
              </p>
              <button
                className="btn btn-info"
                onClick={() => setActiveLoan("agriculture")}
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* --- Conditional Loan Forms --- */}
      <div className="mt-5">
        {activeLoan === "home" && (
          <div className="card p-4 shadow-sm">
            <h3>Home Loan Application</h3>
            <form>
              <div className="mb-3">
                <label className="form-label">Full Name</label>
                <input type="text" className="form-control" />
              </div>
              <div className="mb-3">
                <label className="form-label">Property Value</label>
                <input type="number" className="form-control" />
              </div>
              <button type="submit" className="btn btn-primary">
                Submit Home Loan
              </button>
            </form>
          </div>
        )}

        {activeLoan === "gold" && (
          <div className="card p-4 shadow-sm">
            <h3>Gold Loan Application</h3>
            <form>
              <div className="mb-3">
                <label className="form-label">Full Name</label>
                <input type="text" className="form-control" />
              </div>
              <div className="mb-3">
                <label className="form-label">Gold Weight (grams)</label>
                <input type="number" className="form-control" />
              </div>
              <button type="submit" className="btn btn-warning">
                Submit Gold Loan
              </button>
            </form>
          </div>
        )}

        {activeLoan === "business" && (
          <div className="card p-4 shadow-sm">
            <h3>Business Loan Application</h3>
            <form>
              <div className="mb-3">
                <label className="form-label">Business Name</label>
                <input type="text" className="form-control" />
              </div>
              <div className="mb-3">
                <label className="form-label">Loan Amount</label>
                <input type="number" className="form-control" />
              </div>
              <button type="submit" className="btn btn-success">
                Submit Business Loan
              </button>
            </form>
          </div>
        )}

        {activeLoan === "agriculture" && (
          <div className="card p-4 shadow-sm">
            <h3>Agriculture Loan Application</h3>
            <form>
              <div className="mb-3">
                <label className="form-label">Farmer&apos;s Name</label>
                <input type="text" className="form-control" />
              </div>
              <div className="mb-3">
                <label className="form-label">Land Area (acres)</label>
                <input type="number" className="form-control" />
              </div>
              <button type="submit" className="btn btn-info">
                Submit Agriculture Loan
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default Loan;
