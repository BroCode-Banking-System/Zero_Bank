import React, { useState, useEffect } from "react";
import axios from "axios";
import Carousel from "react-bootstrap/Carousel";
import Button from "react-bootstrap/Button";
//import NavbarComponent from "../component/navber";

import img1 from "../assets/img/image1.png";
import img2 from "../assets/img/image2.png";
import img3 from "../assets/img/image3.png";
import img4 from "../assets/img/image14.png";
import img8 from "../assets/img/image15.png";
import img5 from "../assets/img/image16.png";
import img6 from "../assets/img/image17.png";
import img7 from "../assets/img/image18.png";
import img9 from "../assets/img/image19.png";
import img10 from "../assets/img/image20.png";
import img11 from "../assets/img/image21.png";
import img12 from "../assets/img/image22.png";

import "bootstrap/dist/css/bootstrap.min.css";
import { FaPlay, FaPause } from "react-icons/fa";

function HomeCarousel() {
  return (
    <>
      {/* Navbar always on top */}
      {/* <NavbarComponent /> */}
      {/* Carousel below */}
      <Carousel fade interval={3000} controls={true} indicators={true} pause={false}>
        <Carousel.Item>
          <div className="row align-items-center">
            <div className="col-lg-6 p-5">
              <h2 className="fw-bold">
                <span className="text-primary">Small</span> Business Loan
              </h2>
              <p className="lead">Financing Businesses, Empowering Dreams</p>
              <Button
                variant="primary"
                href="https://shivalikbank.com/service/loans/business-loan"
              >
                Know more
              </Button>
            </div>
            <div className="col-lg-6 text-center">
              <img
                src="https://shivalikbank.com/assets/upload/bannerimage/20230207064521.png"
                alt="Small Business Loan"
                className="img-fluid rounded"
              />
            </div>
          </div>
        </Carousel.Item>

        {/* Slide 1 */}
        <Carousel.Item>
          <img className="d-block w-100" src={img1} alt="First slide" />
          <Carousel.Caption>
            <h2 className="fw-bold">Trusted Banking Since 1990</h2>
            <p>Your security and trust are our top priorities.</p>
            <Button variant="primary">Open an Account</Button>
          </Carousel.Caption>
        </Carousel.Item>

        {/* Slide 2 */}
        <Carousel.Item>
          <img className="d-block w-100" src={img2} alt="Second slide" />
          <Carousel.Caption>
            <h2 className="fw-bold">Comprehensive Financial Services</h2>
            <p>Loans, savings, and investment options tailored for you.</p>
            <Button href="/services" variant="success">Explore Services</Button>
          </Carousel.Caption>
        </Carousel.Item>

        {/* Slide 3 */}
        <Carousel.Item>
          <img className="d-block w-100" src={img3} alt="Third slide" />
          <Carousel.Caption>
            <h2 className="fw-bold">Bank Anytime, Anywhere</h2>
            <p>Enjoy 24/7 support and seamless online banking.</p>
            <Button variant="light" className="text-dark">
              Contact Us
            </Button>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
      {/* Ticker / marquee below the carousel */}
      <SlideWorks />
      <div className="container my-5">
        <div className="row g-4">
          <div className="col-lg-6">
            <NoticeBar inline />
          </div>
          <div className="col-lg-6">
            <BankForm inline />
          </div>
        </div>
      </div>
      <CardSlider />
    </>
  );

}

function SlideWorks() {
  return (
    <div className="slide-works">
      <marquee direction="left">
        <span style={{ padding: '0 24px' }}>Welcome to ZeroCode Bank!, your trusted partner in financial services created by Bikash Bhanja, Arup Mandal and Basudeb Bej</span>
      </marquee>
    </div>
  );
}

function NoticeBar({ inline = false }) {
  const notices = [
    {
      date: "27 August 2025",
      text: "Highlight new digital services like mobile apps or UPI integration.",
      pdf: "/pdfs/abc.pdf"
    },
    {
      date: "09 June 2025",
      text: "Display latest interest rates, loan offers, and deposit schemes.",
      pdf: "/pdfs/Interest-Rates-Notice.pdf"
    },
    {
      date: "12 June 2025",
      text: "Announce important regulatory updates and compliance guidelines.",
      pdf: "/pdfs/Regulatory-Updates.pdf"
    },
    {
      date: "03 June 2025",
      text: "Share holiday schedules and working hours of branches.",
      pdf: "/pdfs/Holiday-Schedule.pdf"
    },
    {
      date: "06 June 2025",
      text: "Provide customer awareness messages on fraud prevention and security.",
      pdf: "/pdfs/Fraud-Prevention.pdf"
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  // ✅ Auto-slide effect
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % notices.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [isPlaying, notices.length]);

  const wrapperClass = inline ? "" : "container my-5";
  const cardWidth = inline ? "100%" : "50%";

  return (
    <div className={wrapperClass}>
      <div
        className="notice-card card shadow border-0 me-auto"
        style={{
          height: "728px",
          width: cardWidth,
          borderRadius: "15px",
          background: "#2d7e90ff",
          position: "relative",
        }}
      >
        <div className="card-body text-white">
          <h5 className="fw-bold mb-3 text-warning">What's New</h5>

          <div
            className="notice-container"
            style={{
              overflow: "hidden",
              height: "630px",
              position: "relative",
            }}
          >
            <div
              className="notice-list"
              style={{
                transform: `translateY(-${currentIndex * 100}px)`,
                transition: "transform 0.6s ease-in-out",
              }}
            >
              {notices.map((notice, index) => (
                <div
                  key={index}
                  className="notice-item d-flex flex-column justify-content-center"
                  style={{
                    height: "100px",
                    cursor: "pointer",
                  }}
                  onClick={() => window.open(notice.pdf, "_blank")}
                >
                  <div className="d-flex align-items-center">
                    <span className="fw-bold me-2">{notice.date}</span>
                    <span className="badge bg-warning text-dark">NEW</span>
                  </div>
                  <p className="mt-2 mb-0">{notice.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Play / Pause Button */}
          <div
            className="position-absolute top-0 end-0 m-3"
            style={{ zIndex: 10 }}
          >
            {isPlaying ? (
              <button
                className="btn btn-light rounded-circle"
                onClick={() => setIsPlaying(false)}
              >
                <FaPause />
              </button>
            ) : (
              <button
                className="btn btn-light rounded-circle"
                onClick={() => setIsPlaying(true)}
              >
                <FaPlay />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Responsive CSS */}
      <style>{`
        .notice-card { width: ${cardWidth}; }
        @media (max-width: 576px) { .notice-card { width: 100%; } }
      `}</style>
    </div>
  );
}

function BankForm({ inline = false }) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobile: "",
    aadhaar: "",
    aadhaardoc: null,
    pan: "",
    pandoc: null,
    accountType: "",
    state: "",
    city: "",
    signature: "",
    photo: "",
    language: "",
    consent: false,
    password: "",
    confirmPassword: "",
    gender: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "file") {
      setFormData((prev) => ({ ...prev, [name]: files && files[0] ? files[0] : null }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setSubmitting(true);
    try {
      const fd = new FormData();
      // Append scalar fields
      fd.append("fullName", formData.fullName);
      fd.append("email", formData.email);
      fd.append("mobile", formData.mobile);
      if (formData.aadhaar) fd.append("aadhaar", formData.aadhaar);
      if (formData.pan) fd.append("pan", formData.pan);
      fd.append("accountType", formData.accountType);
      fd.append("state", formData.state);
      fd.append("city", formData.city);
      if (formData.signature) fd.append("signature", formData.signature);
      if (formData.photo) fd.append("photo", formData.photo);
      fd.append("language", formData.language);
      fd.append("consent", formData.consent ? "true" : "false");
      // Append files if present
      if (formData.aadhaardoc) fd.append("aadhaardoc", formData.aadhaardoc);
      if (formData.pandoc) fd.append("pandoc", formData.pandoc);
      fd.append("password", formData.password);
      fd.append("confirmPassword", formData.confirmPassword);
      fd.append("gender", formData.gender);

      const res = await axios.post("http://localhost:8000/api/accounts", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setMessage("Success: Account created.");
      setFormData({
        fullName: "",
        email: "",
        mobile: "",
        aadhaar: "",
        aadhaardoc: null,
        pan: "",
        pandoc: null,
        accountType: "",
        state: "",
        city: "",
        signature: "",
        photo: "",
        language: "",
        consent: false,
        password: "",
        confirmPassword: "",
        gender: "",
      });
    } catch (err) {
      const errMsg = err?.response?.data?.message || err.message || "Failed to submit.";
      setMessage(`Error: ${errMsg}`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={inline ? "" : "container my-5"}>
      <form className="p-4 shadow-sm rounded bg-white rounded-4" onSubmit={handleSubmit}>
        <div className="row g-3">
          <h5 className="mb-4 text-center">Open Your Account</h5>
          {message && (
            <div className={`alert ${message.startsWith("Error") ? "alert-danger" : "alert-success"}`}>{message}</div>
          )}
          <div className="col-md-6">
            <label className="form-label">Full Name *</label>
            <input
              type="text"
              className="form-control"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Full Name"
              required
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Email Address *</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email ID"
              required
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Mobile Number *</label>
            <input
              type="tel"
              className="form-control"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              placeholder="Mobile Number"
              required
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Aadhaar Number *</label>
            <input
              type="text"
              className="form-control"
              name="aadhaar"
              value={formData.aadhaar}
              onChange={handleChange}
              placeholder="Aadhaar Number"
              required
              pattern="^[0-9]{12}$"
              title="Enter valid Aadhaar number (e.g. 123456789012)"
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Aadhaar Document *</label>
            <input
              type="file"
              className="form-control"
              name="aadhaardoc"
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">PAN Number *</label>
            <input
              type="text"
              className="form-control"
              name="pan"
              value={formData.pan}
              onChange={(e) => {
                const value = e.target.value.toUpperCase(); 
                setFormData({ ...formData, pan: value });
              }}
              placeholder="ABCDE1234F"
              required
              pattern="^[A-Z]{5}[0-9]{4}[A-Z]{1}$"
              title="Enter valid PAN number (e.g. ABCDE1234F)"
            />
          </div>


          <div className="col-md-6">
            <label className="form-label">PAN Document *</label>
            <input
              type="file"
              className="form-control"
              name="pandoc"
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Account Type *</label>
            <select
              className="form-select"
              name="accountType"
              value={formData.accountType}
              onChange={handleChange}
              required
            >
              <option value="">--Select--</option>
              <option>Savings</option>
              <option>Current</option>
            </select>
          </div>

          <div className="col-md-6">
            <label className="form-label">State *</label>
            <select
              className="form-select"
              name="state"
              value={formData.state}
              onChange={handleChange}
              required
            >
              <option value="">--State--</option>
              <option>Andhra Pradesh</option>
              <option>Arunachal Pradesh</option>
              <option>Assam</option>
              <option>Bihar</option>
              <option>Chhattisgarh</option>
              <option>Goa</option>
              <option>Gujarat</option>
              <option>Haryana</option>
              <option>Himachal Pradesh</option>
              <option>Jharkhand</option>
              <option>Karnataka</option>
              <option>Kerala</option>
              <option>Madhya Pradesh</option>
              <option>Maharashtra</option>
              <option>Manipur</option>
              <option>Meghalaya</option>
              <option>Mizoram</option>
              <option>Nagaland</option>
              <option>Odisha</option>
              <option>Punjab</option>
              <option>Rajasthan</option>
              <option>Sikkim</option>
              <option>Tamil Nadu</option>
              <option>Telangana</option>
              <option>Tripura</option>
              <option>Uttar Pradesh</option>
              <option>Uttarakhand</option>
              <option>West Bengal</option>
            </select>
          </div>

          <div className="col-md-6">
            <label className="form-label">City *</label>
            <input
              type="text"
              className="form-control"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="City"
              required
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Signature *</label>
            <input
              type="file"
              className="form-control"
              name="signature"
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Photo *</label>
            <input
              type="file"
              className="form-control"
              name="photo"
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Preferred Language *</label>
            <select
              className="form-select"
              name="language"
              value={formData.language}
              onChange={handleChange}
              required
            >
              <option value="">--Preferred Language--</option>
              <option>English</option>
              <option>Hindi</option>
              <option>Bengali</option>
              <option>Other</option>
            </select>
          </div>

          <div className="col-md-6">
            <label className="form-label">Gender *</label>
            <select
              className="form-select"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
            >
              <option value="">--Gender--</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </div>

          <div className="col-md-6">
            <label className="form-label">Password *</label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              required
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Confirm Password *</label>
            <input
              type="password"
              className="form-control"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Password"
              required
            />
          </div>

          <div className="col-12">
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                name="consent"
                checked={formData.consent}
                onChange={handleChange}
                required
              />
              <label className="form-check-label">
                I authorize ZeroBank to contact me. Please fill the form, and we’ll reach out shortly.
              </label>
            </div>
          </div>

          <div className="col-12 text-center">
            <button type="submit" className="btn btn-primary px-5" disabled={submitting}>
              {submitting ? "Submitting..." : "Submit"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

function CardSlider() {
  const [selectedNotice, setSelectedNotice] = useState(null);

  const notices = [
    {
      title: "Saving Account",
      description: "Secure your money while earning attractive interest. Enjoy easy online access, digital banking features, and flexible options for deposits and withdrawals to manage your finances effortlessly. For further assistance, please contact our customer service.",
      image: img4
    },
    {
      title: "Current Account",
      description: "Tailored for businesses, offering seamless transactions, real-time banking, and dedicated services. Manage payments, receivables, and cash flow efficiently while enjoying priority banking support. For further assistance, please contact our customer service.",
      image: img5
    },
    {
      title: "Home Loan",
      description: "Achieve your dream home with low-interest loans and flexible repayment options. Quick approvals and personalized plans make homeownership simple and affordable for every family. For further assistance, please contact our customer service.",
      image: img6
    },
    {
      title: "Gold Loan",
      description: "Unlock instant funds using your gold as collateral. Minimal documentation, competitive interest rates, and quick disbursement ensure easy access to short-term financial needs. For further assistance, please contact our customer service.",
      image: img7
    },
    {
      title: "Business Loan",
      description: "Scale and grow your business with customized loan solutions. Flexible repayment terms, fast approvals, and competitive interest rates help you achieve operational and expansion goals. For further assistance, please contact our customer service.",
      image: img8
    },
    {
      title: "Agriculture Loan",
      description: "Support your farming activities with loans for seeds, equipment, or irrigation. Easy access, timely disbursement, and affordable interest rates empower farmers to enhance productivity. For further assistance, please contact our customer service.",
      image: img9
    },
    {
      title: "Health Insurance",
      description: "Protect yourself and your family with our comprehensive health insurance plans covering hospitalization and critical illnesses.",
      image: img10
    },
    {
      title: "General Insurance",
      description: "Safeguard your assets with reliable insurance policies. From vehicles to property, enjoy protection against unforeseen risks, ensuring financial stability in emergencies. For further assistance, please contact our customer service.",
      image: img11
    },
    {
      title: "Life Insurance",
      description: "Secure your family’s future with life insurance plans. Ensure financial stability, pay off liabilities, and provide long-term support to your loved ones in your absence. For further assistance, please contact our customer service.",
      image: img12
    },
  ];

  return (
    <div className="card-slider-wrapper bg-light p-4">
      <div className="card-slider">
        {[...notices, ...notices].map((notice, i) => (
          <div key={i} className="custom-card card shadow border-0">
            <div className="card-body">
              <div className="image-wrapper">
                <img src={notice.image} alt={notice.title} />
              </div>
              <h5 className="card-title">{notice.title}</h5>
              <p className="card-text">{notice.text}</p>
              <button
                className="btn btn-info"
                onClick={() => setSelectedNotice(notice)}
              >
                Know More
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedNotice && (
        <div className="modal-backdrop" onClick={() => setSelectedNotice(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h4>{selectedNotice.title}</h4>
            {/* <img src={selectedNotice.image} alt={selectedNotice.title} /> */}
            <p>{selectedNotice.description}</p>
            <button className="btn btn-secondary" onClick={() => setSelectedNotice(null)}>
              Close
            </button>
          </div>
        </div>
      )}

      <style>{`
        .card-slider-wrapper {
          overflow: hidden;
          position: relative;
          width: 100%;
          max-width: 1300px;
          margin: 0 auto;
          border-radius: 20px;
        }

        @media (max-width: 576px) {
          .card-slider-wrapper {
            width: 95%;
            max-width: 100%;
            padding: 1rem;   
            border-radius: 10px;
          }
        }

        .card-slider {
          display: flex;
          gap: 1rem;
          width: max-content;
          animation: slide-left 50s linear infinite;
        }

        .custom-card {
          width: 320px; 
          flex-shrink: 0; 
          border-radius: 12px;
          padding: 10px;
        }

        .custom-card .card-body {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: center;
          text-align: center;
        }

        .image-wrapper {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-bottom: 10px;
          height: 60px;
        }

        .image-wrapper img {
          max-height: 60px;
          max-width: 60px;
          object-fit: contain;
        }

        @keyframes slide-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        /* Modal Styles */
        .modal-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }

        .modal-content {
          background: #fff;
          padding: 2rem;
          border-radius: 12px;
          text-align: center;
          max-width: 500px;
          width: 90%;
        }

        .modal-content img {
          max-width: 100px;
          margin-bottom: 1rem;
        }
      `}</style>
    </div>
  );
}

export { SlideWorks, NoticeBar, CardSlider, BankForm };
export default HomeCarousel;