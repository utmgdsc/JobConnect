import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import jobPostingsService from "../services/jobPostingsService";
import jobSeekersService from "../services/jobSeekersService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "../Application.css"; // Ensure your CSS styles are set up for this page

const Application = () => {
  const navigate = useNavigate();
  const [jobDetails, setJobDetails] = useState(null);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    fetchJobDetails();
    fetchCurrentUserDetails();
  }, [id]);

  const fetchJobDetails = async () => {
    try {
      const data = await jobPostingsService.getJobPostingById(id);
      setJobDetails(data);
    } catch (error) {
      console.error("Error fetching job details:", error);
    }
  };

  const fetchCurrentUserDetails = async () => {
    try {
      const user = await jobSeekersService.fetchCurrentUser();
      setCurrentUser(user);
    } catch (error) {
      console.error("Error fetching current user details:", error);
    }
  };

  const handleApplyNow = async () => {
    if (termsAccepted && currentUser && jobDetails) {
      try {
        // Update asset posting with applicant's ID
        const updatedJob = { ...jobDetails };
        updatedJob.applicants.push(currentUser._id);
        await jobPostingsService.updateJobPosting(id, updatedJob);

        // Fetch current job seeker and update application history
        const user = await jobSeekersService.getJobSeeker(currentUser._id);
        if (user) {
          const applicationData = {
            jobPosting: id,
            applyDate: new Date(),
            status: 'Applied'
          };
          user.applicationHistory.push(applicationData);
          await jobSeekersService.addInfo(currentUser._id, { applicationHistory: user.applicationHistory });

          // Notify user of successful application
          console.log('Application submitted successfully!');
          toast.success("Application Submitted", {
            position: "bottom-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });

        } else {
          console.error('Error fetching current user');
        }
      } catch (error) {
        console.error('Error submitting application:', error);
      }
    } else {
      alert('Please accept the terms and make sure you are logged in to apply.');
    }
  };

  const handleTermsAcceptance = () => {
    setTermsAccepted(!termsAccepted);
  };

  if (!jobDetails || !currentUser) {
    return <div>Loading...</div>;
  }

  return (
    <div className="application-container">
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
      <h2 className="application-title">{jobDetails.jobTitle}</h2> {/* Job title */}

      <div className="application-section">
        <p><strong>Location:</strong> {jobDetails.location}</p>
        <p><strong>Company:</strong> {jobDetails.company}</p>
        <p><strong>Description:</strong> {jobDetails.details?.description}</p>
        <p><strong>Responsibilities:</strong></p>
        <ul>
          {jobDetails.details?.responsibilities.map((responsibility, index) => (
            <li key={index}>{responsibility}</li>
          ))}
        </ul>
        <br></br>
        <p><strong>Requirements:</strong></p>
        <ul>
          {jobDetails.details?.requirements.map((requirement, index) => (
            <li key={index}>{requirement}</li>
          ))}
        </ul>
      </div>
      <div className="application-section">
        <p><strong>Your Name:</strong> {currentUser.personalInformation.name}</p>
        <p><strong>Your Email:</strong> {currentUser.personalInformation.contactDetails.email}</p>
        <p><strong>Your Phone:</strong> {currentUser.personalInformation.contactDetails.phone}</p>
        {/* Additional user details here if necessary */}
      </div>

      <div className="application-action">
        <div>
          <input
            type="checkbox"
            id="termsAccepted"
            className="application-checkbox"
            checked={termsAccepted}
            onChange={handleTermsAcceptance}
          />
          <label htmlFor="termsAccepted"> I agree to the terms and conditions.</label>
        </div>
        <button className="application-button" onClick={handleApplyNow}>Apply Now</button>
      </div>
    </div>
  );
};

export default Application;
