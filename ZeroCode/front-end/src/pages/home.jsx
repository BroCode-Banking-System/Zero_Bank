import Carousel from "react-bootstrap/Carousel";
import Button from "react-bootstrap/Button";
import NavbarComponent from "../component/navber";
import img1 from "../assets/img/image1.png";
import img2 from "../assets/img/image2.png";
import img3 from "../assets/img/image3.png";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaPlay, FaPause } from "react-icons/fa";
import React, { useState, useEffect } from "react";


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
            <Button variant="success">Explore Services</Button>
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
      <NoticeBar />
    </>
  );

}

function SlideWorks() {
  return (
    <div className="slide-works">
      <marquee direction="left">
        <span style={{ padding: '0 24px' }}>Welcome to ZeroCode Bank!</span>
      </marquee>
    </div>
  );
}
/*
function NoticeBar() {
  const notices = [
    {
      date: "27 August 2025",
      text: "Highlight new digital services like mobile apps or UPI integration.",
    },
    {
      date: "09 June 2025",
      text: "Display latest interest rates, loan offers, and deposit schemes.",
    },
    {
      date: "12 June 2025",
      text: "Announce important regulatory updates and compliance guidelines.",
    },
    {
      date: "03 June 2025",
      text: "Share holiday schedules and working hours of branches.",
    },
    {
      date: "06 June 2025",
      text: "Provide customer awareness messages on fraud prevention and security.",
    },
    {
      date: "08 June 2025",
      text: "Showcase community programs, CSR activities, and financial literacy events.",
    },
  ];

  return (
    <div className="container my-5">
      <div className="card shadow border-0" style={{ borderRadius: "15px", background: "#a21c2f" }}>
        <div className="card-body text-white">
          <h5 className="fw-bold mb-4">Whats New</h5>
          {notices.map((notice, index) => (
            <div key={index} className="mb-4">
              <div className="d-flex align-items-center">
                <span className="fw-bold me-2">{notice.date}</span>
                <span className="badge bg-warning text-dark">NEW</span>
              </div>
              <p className="mt-2 mb-0">{notice.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}*/

function NoticeBar() {
  const notices = [
    {
      date: "27 August 2025",
      text: "Highlight new digital services like mobile apps or UPI integration.",
    },
    {
      date: "09 June 2025",
      text: "Display latest interest rates, loan offers, and deposit schemes.",
    },
    {
      date: "12 June 2025",
      text: "Announce important regulatory updates and compliance guidelines.",
    },
    {
      date: "03 June 2025",
      text: "Share holiday schedules and working hours of branches.",
    },
    {
      date: "06 June 2025",
      text: "Provide customer awareness messages on fraud prevention and security.",
    },
    {
      date: "08 June 2025",
      text: "Showcase community programs, CSR activities, and financial literacy events.",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  // Auto change every 3s
  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % notices.length);
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, notices.length]);

  return (
    <div className="container my-5">
      <div
        className="card shadow border-0"
        style={{ borderRadius: "15px", background: "#2d7e90ff" }}
      >
        <div className="card-body text-white d-flex justify-content-between align-items-center">
          {/* Left Section */}
          <div style={{ overflow: "hidden", height: "auto" }}>
            <h5 className="fw-bold mb-3">Whats New</h5>

            {/* Animated Notice */}
            <div
              className="notice-slide"
              key={currentIndex} // trigger re-animation
            >
              <div className="d-flex align-items-center">
                <span className="fw-bold me-2">{notices[currentIndex].date}</span>
                <span className="badge bg-warning text-dark">NEW</span>
              </div>
              <p className="mt-2 mb-0">{notices[currentIndex].text}</p>
            </div>
          </div>

          {/* Right Section: Play/Pause */}
          <div>
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
      {/* Add animation with CSS */}
      <style>{`
        .notice-slide {
          animation: slideIn 0.5s ease;
        }
        @keyframes slideIn {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
}


export { SlideWorks, NoticeBar };
export default HomeCarousel;