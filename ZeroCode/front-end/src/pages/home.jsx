import Carousel from "react-bootstrap/Carousel";
import Button from "react-bootstrap/Button";
import NavbarComponent from "../component/navber";  
import img1 from "../assets/img/image1.png";
import img2 from "../assets/img/image2.png";
import img3 from "../assets/img/image3.png";

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

function NoticeBar() {
  return (
    <div className="notice-bar">
      <p>Important Notice: Our branch hours have changed. Please visit our website for more details.</p>
    </div>
  );
}


export { SlideWorks, NoticeBar };
export default HomeCarousel;