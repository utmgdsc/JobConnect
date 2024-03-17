import React, { useState } from "react";
import "../job-connect.css";
import newsletterService from "../services/newsletterService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  // temp variable to check error
  var temp = false;

  const validateEmail = (email) => {
    if (!email) {
      return "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      temp = true;
    } else {
      return "";
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const error = validateEmail(email);
    setEmailError(error);
    try {
      const data = await newsletterService.subscribeToNewsletter(email);
      // Handle success here
      toast.success("Successfully subscribed!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      setEmail(""); // Clear the input field after successful subscription
      // Show a success message with toast, use toast container and toast
    } catch (error) {
      if (temp) {
        toast.warning("Please enter a valid email address.");
      } else {
        toast.error("Subscription failed. Please try again.");
      }
      console.error("Failed to subscribe to newsletter:", error);
    }
  };

  return (
    <section className="bg-primary text-light p-5">
      <div className="container">
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
        <div className="d-md-flex justify-content-between align-items-center">
          <h3 className="mb-3 mb-md-0">Sign Up For Our Newsletter</h3>

          <form
            className="input-group news-input"
            onSubmit={handleSubmit}
            noValidate
          >
            <input
              type="email"
              className="form-control"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button className="btn btn-dark btn-lg" type="submit">
              Submit
            </button>
            {emailError && (
              <div className="email-error-message">{emailError}</div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
