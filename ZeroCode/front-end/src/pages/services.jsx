import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle, FaArrowRight } from "react-icons/fa";

import breadcrumbImage from "../assets/img/image8.png";
import breakcrumbImage1 from "../assets/img/image10.png";
import breadcrumbImage2 from "../assets/img/image9.png";
import breadcrumbImage3 from "../assets/img/image6.png";
import purposeImage from "../assets/img/image11.png";

function Services() {
  const navigate = useNavigate();
  const [selectedService, setSelectedService] = useState(null);

  // Purpose Points
  const points = [
    "Savings and Current Accounts to manage your money securely.",
    "Personal, Home, and Car Loans with flexible repayment options.",
    "Credit and Debit Card facilities for easy transactions worldwide.",
    "Internet and Mobile Banking for 24/7 account access.",
    "Insurance services to safeguard your health, life, and assets.",
    "Investment and Wealth Management solutions for financial growth."
  ];

  const servicesData = [
    {
      title: "Accounts",
      descriptions: "Manage your accounts with ease.",
      image: breakcrumbImage1,
      items: [
        { label: "Savings Account", path: "/savings-account" },
        { label: "Current Account", path: "/current-account" },
      ],
    },
    {
      title: "Loans",
      descriptions: "Get the funds you need with our loan services.",
      image: breadcrumbImage2,
      items: [
        { label: "Home Loan", path: "/home-loan" },
        { label: "Car Loan", path: "/car-loan" },
      ],
    },
    {
      title: "Insurance",
      descriptions: "Protect yourself with our insurance plans.",
      image: breadcrumbImage3,
      items: [
        { label: "Health Insurance", path: "/health-insurance" },
        { label: "Car Insurance", path: "/car-insurance" },
      ],
    },
  ];

  const handleOpenModal = (service) => setSelectedService(service);
  const handleCloseModal = () => setSelectedService(null);

  const handleItemClick = (path) => {
    setSelectedService(null);
    navigate(path);
  };

  return (
    <>
      {/* Breadcrumb */}
      <div
        className="w-100 text-white d-flex align-items-center mb-5"
        style={{
          backgroundImage: `url(${breadcrumbImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "250px",
        }}
      >
        <div className="container py-4">
          <h1 className="fw-bold">Services</h1>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="/" className="text-white text-decoration-none">
                  Home
                </a>
              </li>
              <li
                className="breadcrumb-item active text-white"
                aria-current="page"
              >
                Services
              </li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Services Section */}
      <div className="container mb-5">
        <div className="row align-items-center bg-white text-dark rounded shadow p-4">
          <div className="col-md-6 mb-4 mb-md-0">
            <img
              src={purposeImage}
              alt="Purpose"
              className="img-fluid rounded"
              style={{ borderBottomRightRadius: "60px" }}
            />
          </div>
          <div className="col-md-6">
            <h3 className="fw-bold mb-4">Our Services</h3>
            <ul className="list-unstyled">
              {points.map((point, index) => (
                <li key={index} className="d-flex align-items-start mb-3">
                  <FaCheckCircle className="text-warning me-2 mt-1" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Cards */}
      <div className="container">
        <div className="row g-4">
          {servicesData.map((service, index) => (
            <div className="col-md-4" key={index}>
              <div className="card h-100 shadow border-0">
                <img
                  src={service.image}
                  className="card-img-top"
                  alt={service.title}
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="card-body d-flex flex-column justify-content-between">
                  <h5>{service.title}</h5>
                  <p className="text-muted">{service.descriptions}</p>

                  <div className="d-flex justify-content-between mt-3">
                    <a href="#" className="btn btn-primary">
                      Learn More
                    </a>
                    <button
                      className="btn btn-outline-primary rounded-circle"
                      style={{ width: "40px", height: "40px" }}
                      onClick={() => handleOpenModal(service)}
                    >
                      <FaArrowRight />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedService && (
        <div
          className="modal show d-block"
          style={{ background: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5>{selectedService.title}</h5>
                <button className="btn-close" onClick={handleCloseModal}></button>
              </div>
              <div className="modal-body">
                <ul className="list-unstyled">
                  {selectedService.items.map((item, i) => (
                    <li
                      key={i}
                      className="mb-2 text-primary fw-bold"
                      style={{ cursor: "pointer" }}
                      onClick={() => handleItemClick(item.path)}
                    >
                      <FaCheckCircle className="me-2" />
                      {item.label}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={handleCloseModal}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Services;
