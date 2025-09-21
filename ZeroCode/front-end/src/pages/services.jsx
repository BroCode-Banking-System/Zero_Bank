import React from "react";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle, FaArrowRight } from "react-icons/fa";

import breadcrumbImage from "../assets/img/image8.png";
import breakcrumbImage1 from "../assets/img/image10.png";
import breadcrumbImage2 from "../assets/img/image9.png";
import breadcrumbImage3 from "../assets/img/image6.png";
import purposeImage from "../assets/img/image11.png";

function Services() {
  const navigate = useNavigate();

  const points = [
    "Savings and Current Accounts to manage your money securely.",
    "Personal, Home, and Car Loans with flexible repayment options.",
    "Credit and Debit Card facilities for easy transactions worldwide.",
    "Internet and Mobile Banking for 24/7 account access.",
    "Insurance services to safeguard your health, life, and assets.",
    "Investment and Wealth Management solutions for financial growth.",
  ];

  const servicesData = [
    {
      title: "Accounts",
      descriptions: "Manage your accounts with ease.",
      image: breakcrumbImage1,
      path: "/account", 
    },
    {
      title: "Loans",
      descriptions: "Get the funds you need with our loan services.",
      image: breadcrumbImage2,
      path: "/loan", 
    },
    {
      title: "Insurance",
      descriptions: "Protect yourself with our insurance plans.",
      image: breadcrumbImage3,
      path: "/insurance", 
    },
  ];

  return (
    <>
      {/* Breadcrumb */}
      <div
        className="w-100 text-white d-flex align-items-center mb-5"
        style={{
          backgroundImage: `url(${breadcrumbImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "421px",
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

      {/* Service Cards */}
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
                    <button
                      className="btn btn-primary"
                      onClick={() => navigate(service.path)}
                    >
                      Learn More
                    </button>
                    <button
                      className="btn btn-outline-primary rounded-circle"
                      style={{ width: "40px", height: "40px" }}
                      onClick={() => navigate(service.path)}
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
    </>
  );
}

export default Services;
