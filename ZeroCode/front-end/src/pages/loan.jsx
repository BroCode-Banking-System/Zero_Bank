import React, { useState } from "react";
import { FaHome, FaCoins, FaBriefcase, FaTractor, FaArrowLeft } from "react-icons/fa";

function Loan() {
  const [activeLoan, setActiveLoan] = useState(null);

  const loanOptions = [
    {
      id: "home",
      title: "Home Loan",
      text: "Get the best interest rates to buy or build your dream home.",
      icon: <FaHome size={30} className="text-primary me-3" />,
      btnClass: "btn-primary",
    },
    {
      id: "gold",
      title: "Gold Loan",
      text: "Unlock the value of your gold with instant loans at low interest.",
      icon: <FaCoins size={30} className="text-warning me-3" />,
      btnClass: "btn-warning",
    },
    {
      id: "business",
      title: "Business Loan",
      text: "Boost your business growth with our flexible loan solutions.",
      icon: <FaBriefcase size={30} className="text-success me-3" />,
      btnClass: "btn-success",
    },
    {
      id: "agriculture",
      title: "Agriculture Loan",
      text: "Affordable loans to support farmers and agricultural needs.",
      icon: <FaTractor size={30} className="text-info me-3" />,
      btnClass: "btn-info",
    },
  ];

  const renderForm = () => {
    const formFields = {
      home: (
        <>
          <div className="mb-3">
            <label className="form-label">Full Name</label>
            <input type="text" className="form-control" placeholder="Enter your full name" />
          </div>
          <div className="mb-3">
            <label className="form-label">Property Value</label>
            <input type="number" className="form-control" placeholder="Enter property value" />
          </div>
        </>
      ),
      gold: (
        <>
          <div className="mb-3">
            <label className="form-label">Full Name</label>
            <input type="text" className="form-control" placeholder="Enter your full name" />
          </div>
          <div className="mb-3">
            <label className="form-label">Gold Weight (grams)</label>
            <input type="number" className="form-control" placeholder="Enter gold weight" />
          </div>
        </>
      ),
      business: (
        <>
          <div className="mb-3">
            <label className="form-label">Business Name</label>
            <input type="text" className="form-control" placeholder="Enter business name" />
          </div>
          <div className="mb-3">
            <label className="form-label">Loan Amount</label>
            <input type="number" className="form-control" placeholder="Enter loan amount" />
          </div>
        </>
      ),
      agriculture: (
        <>
          <div className="mb-3">
            <label className="form-label">Farmer's Name</label>
            <input type="text" className="form-control" placeholder="Enter farmer's name" />
          </div>
          <div className="mb-3">
            <label className="form-label">Land Area (acres)</label>
            <input type="number" className="form-control" placeholder="Enter land area" />
          </div>
        </>
      ),
    };

    const colors = {
      home: "primary",
      gold: "warning",
      business: "success",
      agriculture: "info",
    };

    return (
      <>
        <h3 className={`fw-bold text-${colors[activeLoan]} mb-4`}>
          {loanOptions.find((l) => l.id === activeLoan)?.title} Application
        </h3>
        <form>
          {formFields[activeLoan]}
          <div className="d-flex justify-content-between mt-4">
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={() => setActiveLoan(null)}
            >
              <FaArrowLeft className="me-2" /> Back
            </button>
            <button type="submit" className={`btn btn-${colors[activeLoan]} px-4`}>
              Submit Application
            </button>
          </div>
        </form>
      </>
    );
  };

  return (
    <div className="container my-5 py-5">
      <h2 className="text-center fw-bold mb-5">Apply for a Loan</h2>

      {!activeLoan && (
        <div className="row g-4 justify-content-center">
          {loanOptions.map((loan) => (
            <div className="col-md-6 col-lg-3" key={loan.id}>
              <div
                className="card shadow border-0 h-100 text-center p-4 hover-effect"
                style={{ transition: "0.3s", cursor: "pointer" }}
              >
                {/* Icon + Title side by side */}
                <div className="d-flex align-items-center justify-content-center mb-3">
                  {loan.icon}
                  <h5 className="fw-bold mb-0">{loan.title}</h5>
                </div>
                <p className="text-muted">{loan.text}</p>
                <button
                  className={`btn ${loan.btnClass} mt-auto px-4`}
                  onClick={() => setActiveLoan(loan.id)}
                >
                  Apply Now
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeLoan && (
        <div className="row justify-content-center mt-5">
          <div className="col-md-8 col-lg-6">
            <div className="card shadow p-4 border-0">{renderForm()}</div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Loan;
