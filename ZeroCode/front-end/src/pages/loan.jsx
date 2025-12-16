// Loan Application Page - front-end/src/pages/loan.jsx
import React, { useState } from "react";
import {
  FaHome,
  FaCoins,
  FaBriefcase,
  FaTractor,
  FaArrowLeft,
} from "react-icons/fa";

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

  const isLoggedIn = !!localStorage.getItem("userId");

  const handleApplyNow = (loanId) => {
    if (isLoggedIn) {
      // Logged in → open loan form
      setActiveLoan(loanId);
    } else {
      // Not logged in → open login modal (only if modal exists)
      const modalElement = document.getElementById("loginModal");
      if (modalElement) {
        const modal = new window.bootstrap.Modal(modalElement);
        modal.show();
      } else {
        // Fallback: redirect to login page if modal doesn't exist
        window.location.href = "/";
      }
    }
  };


  const renderForm = () => {
    switch (activeLoan) {
      case "home":
        return <HomeLoanForm />;
      case "gold":
        return <GoldLoanForm />;
      case "business":
        return <BusinessLoanForm />;
      case "agriculture":
        return <AgricultureLoanForm />;
      default:
        return null;
    }
  };

  return (
    <div className="container my-5 py-5">
      <h2 className="text-center fw-bold mb-5">Apply for a Loan</h2>

      {!activeLoan && (
        <div className="row g-4 justify-content-center">
          {loanOptions.map((loan) => (
            <div className="col-md-6 col-lg-3" key={loan.id}>
              <div
                className="card shadow border-0 h-100 text-center p-4"
                style={{ transition: "0.3s", cursor: "pointer" }}
              >
                <div className="d-flex align-items-center justify-content-center mb-3">
                  {loan.icon}
                  <h5 className="fw-bold mb-0">{loan.title}</h5>
                </div>

                <p className="text-muted">{loan.text}</p>

                <button
                  className={`btn ${loan.btnClass} mt-auto px-4`}
                  onClick={() => handleApplyNow(loan.id)}
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
            <div className="card shadow p-4 border-0">
              <button
                className="btn btn-outline-secondary mb-3"
                onClick={() => setActiveLoan(null)}
              >
                <FaArrowLeft className="me-2" />
                Back
              </button>

              {renderForm()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Loan;

function HomeLoanForm() {
  return (
    <>
      <h4 className="fw-bold mb-3">Home Loan Application</h4>
      <input className="form-control mb-2" placeholder="Property Value" />
      <input className="form-control mb-2" placeholder="Loan Amount" />
      <input className="form-control mb-2" placeholder="Tenure (Years)" />
      <button className="btn btn-primary w-100">Submit Application</button>
    </>
  );
}

function GoldLoanForm() {
  return (
    <>
      <h4 className="fw-bold mb-3">Gold Loan Application</h4>
      <input className="form-control mb-2" placeholder="Gold Weight (grams)" />
      <input className="form-control mb-2" placeholder="Loan Amount" />
      <button className="btn btn-warning w-100">Submit Application</button>
    </>
  );
}

function BusinessLoanForm() {
  return (
    <>
      <h4 className="fw-bold mb-3">Business Loan Application</h4>
      <input className="form-control mb-2" placeholder="Business Name" />
      <input className="form-control mb-2" placeholder="Loan Amount" />
      <button className="btn btn-success w-100">Submit Application</button>
    </>
  );
}

function AgricultureLoanForm() {
  return (
    <>
      <h4 className="fw-bold mb-3">Agriculture Loan Application</h4>
      <input className="form-control mb-2" placeholder="Land Area (Acres)" />
      <input className="form-control mb-2" placeholder="Loan Amount" />
      <button className="btn btn-info w-100">Submit Application</button>
    </>
  );
}

