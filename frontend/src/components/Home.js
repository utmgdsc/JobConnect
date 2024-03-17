import React from "react";
// Import necessary Bootstrap CSS and any other CSS files you need
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../job-connect.css"; // Adjust the path as needed to your CSS file
// Import images, adjust the paths as needed
import showcaseImg from "../images/showcase.svg";
import fundamentalsImg from "../images/fundamentals.svg";
import reactImg from "../images/react.svg";
import { Link } from "react-router-dom";

import Newsletter from "./Newsletter";
import Navbar from "./Navbar";

const Home = () => {
  return (
    <div>
      {/* Navbar */}
      <Navbar />

      {/* Showcase */}
      <section className="bg-dark text-light p-5 p-lg-0 pt-lg-5 text-center text-sm-start">
        <div className="container">
          <div className="d-sm-flex align-items-center justify-content-between">
            <div>
              <h1>
                Secure a <span className="text-warning">Future</span> You
                Deserve
              </h1>
              <p className="lead my-4">
                Our job portal is a beacon of hope for marginalized communities,
                offering a platform where equal opportunity employment is not
                just a promise but a reality. With resources to guide you and
                employers who value diversity, start building a career that
                aligns with your potential.
              </p>
              <a href="#postings" className="btn btn-primary btn-lg">
                Start Searching
              </a>
            </div>
            <img
              className="img-fluid w-50 d-none d-sm-block"
              src={showcaseImg}
              alt=""
            />
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <Newsletter />

      {/* Boxes */}
      <section id="postings" className="p-5">
        <div className="container">
          <div className="row text-center g-4">
            {/* Box 1 */}
            <div className="col-md">
              <div className="card bg-dark text-light">
                <div className="card-body text-center">
                  <div className="h1 mb-3">
                    <i className="bi bi-laptop"></i>
                  </div>
                  <h3 className="card-title mb-3">Rent Assets & Equipment</h3>
                  <p className="card-text">
                    Discover a comprehensive range of high-quality assets and
                    equipment available for rent to support your projects and
                    operational needs. From construction machinery to office
                    essentials, find everything you need to scale efficiently
                    and effectively.
                  </p>
                  <Link to="/assets" className="btn btn-primary">
                    Explore Assets
                  </Link>
                </div>
              </div>
            </div>
            {/* Box 2 */}
            <div className="col-md">
              <div className="card bg-secondary text-light">
                <div className="card-body text-center">
                  <div className="h1 mb-3">
                    <i className="bi bi-person-square"></i>
                  </div>
                  <h3 className="card-title mb-3">Upcoming Job Fairs</h3>
                  <p className="card-text">
                    Step into a world of opportunities at our upcoming job
                    fairs. Meet top employers, learn about various industries,
                    and find out how you can elevate your career. Whether you're
                    seeking your first job or your next career challenge, our
                    job fairs are the perfect place to start.
                  </p>
                  <Link to="/events" className="btn btn-dark">
                    Learn More
                  </Link>
                </div>
              </div>
            </div>
            {/* Box 3 */}
            <div className="col-md">
              <div className="card bg-dark text-light">
                <div className="card-body text-center">
                  <div className="h1 mb-3">
                    <i className="bi bi-people"></i>
                  </div>
                  <h3 className="card-title mb-3">Explore Job Opportunities</h3>
                  <p className="card-text">
                    Dive into a wide array of exciting job opportunities across
                    various industries. Whether you're starting your career or
                    looking for a change, find positions that match your skills
                    and passions. Let's shape your future together.
                  </p>
                  <Link to="/jobs" className="btn btn-primary">
                    Discover Jobs
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="learn" className="p-5">
        <div className="container">
          <div className="row align-items-center justify-content-between">
            <div className="col-md">
              <img
                src={fundamentalsImg}
                className="img-fluid"
                alt="Learning Resources"
              />
            </div>
            <div className="col-md p-5">
              <h2>Empower Your Job Search</h2>
              <p className="lead">
                Navigating the job market can be challenging, but with the right
                tools and guidance, success is within reach. We offer a wealth
                of resources to help you find the right job that matches your
                skills and aspirations.
              </p>
              <p>
                From crafting the perfect resume to acing job interviews, our
                comprehensive guides and personalized support systems are
                designed to elevate your job-hunting skills. Whether you're
                entering the workforce for the first time or seeking new
                opportunities, we're here to support your journey every step of
                the way.
              </p>
              <a href="#" className="btn btn-light mt-3">
                <i className="bi bi-chevron-right"></i> Learn More
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="learn" className="p-5 bg-dark text-light">
        <div className="container">
          <div className="row align-items-center justify-content-between">
            <div className="col-md p-5">
              <h2>Discover Opportunities</h2>
              <p className="lead">
                Unlock a world of career opportunities through our job portal.
                Our platform is tailored for those seeking a new beginning or a
                step up in their professional journey.
              </p>
              <p>
                From comprehensive job listings to career advice, our resources
                are designed to help you navigate the job market with
                confidence. Embrace your potential and connect with employers
                who value diversity and inclusion.
              </p>
              <a href="#jobs" className="btn btn-light mt-3">
                <i className="bi bi-chevron-right"></i> View Job Listings
              </a>
            </div>
            <div className="col-md">
              {/* Consider replacing this image with something more relevant to job searching or career growth */}
              <img src={reactImg} className="img-fluid" alt="Job Search" />
            </div>
          </div>
        </div>
      </section>

      {/* Questions Accordion */}
      <section id="questions" className="p-5">
        <div className="container">
          <h2 className="text-center mb-4">Frequently Asked Questions</h2>
          <div className="accordion accordion-flush" id="questions-accordion">
            {/* Item 1 */}
            <div className="accordion-item">
              <h2 className="accordion-header" id="flush-headingOne">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#flush-collapseOne"
                  aria-expanded="false"
                  aria-controls="flush-collapseOne"
                >
                  How do I get started with finding a job on your portal?
                </button>
              </h2>
              <div
                id="flush-collapseOne"
                className="accordion-collapse collapse"
                aria-labelledby="flush-headingOne"
                data-bs-parent="#questions-accordion"
              >
                <div className="accordion-body">
                  Getting started is simple. First, create a free account to
                  join our community. Once you're logged in, you can fill out
                  your profile, upload your resume, and start applying for jobs
                  that match your skills and interests.
                </div>
              </div>
            </div>
            {/* Item 2 */}
            <div className="accordion-item">
              <h2 className="accordion-header" id="flush-headingTwo">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#flush-collapseTwo"
                  aria-expanded="false"
                  aria-controls="flush-collapseTwo"
                >
                  Is there a fee to access job listings?
                </button>
              </h2>
              <div
                id="flush-collapseTwo"
                className="accordion-collapse collapse"
                aria-labelledby="flush-headingTwo"
                data-bs-parent="#questions-accordion"
              >
                <div className="accordion-body">
                  Access to job listings and basic user services on our portal
                  is completely free, ensuring equal opportunity for all. We
                  believe in supporting your job search without any financial
                  barriers. For additional services like professional resume
                  reviews or career coaching, nominal fees may apply.
                </div>
              </div>
            </div>
            {/* Item 3 */}
            <div className="accordion-item">
              <h2 className="accordion-header" id="flush-headingThree">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#flush-collapseThree"
                  aria-expanded="false"
                  aria-controls="flush-collapseThree"
                >
                  What kind of assets can I rent or post on the portal?
                </button>
              </h2>
              <div
                id="flush-collapseThree"
                className="accordion-collapse collapse"
                aria-labelledby="flush-headingThree"
                data-bs-parent="#questions-accordion"
              >
                <div className="accordion-body">
                  Our portal features a wide range of assets available for
                  rent, catering to both personal and business needs. You can
                  find everything from office equipment, vehicles, and event
                  spaces to construction tools and heavy machinery. If you have
                  assets you’d like to post for rent, our platform makes it easy
                  to reach potential renters. You can manage your postings, set
                  rental terms, and connect directly with the community, all in
                  one convenient location.
                </div>
              </div>
            </div>
            {/* More items can be added similarly */}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="p-5 bg-dark text-white text-center position-relative">
        <div className="container">
          <p className="lead">Copyright &copy; 2024 JobConnect</p>

          <a href="#" className="position-absolute bottom-0 end-0 p-5">
            <i className="bi bi-arrow-up-circle h1"></i>
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Home;
