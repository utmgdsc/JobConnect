import React from "react";
import { Link } from "react-router-dom";
import "../job-connect.css";

const Navbar = () => {
  return (
    <div>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg bg-dark navbar-dark py-3 fixed-top">
        <div className="container">
          <a href="#" className="navbar-brand">
            JobConnect
          </a>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navmenu"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navmenu">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link to="/" className="nav-link">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <a href="#questions" className="nav-link">
                  FAQ
                </a>{" "}
                {/* Using an anchor link */}
              </li>
              <li className="nav-item">
                <Link to="/login" className="nav-link">
                  Sign Up
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;