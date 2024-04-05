import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
  const [resume, setResume] = useState(null);
  const [location, setLocation] = useState({
    streetAddress: '',
    city: '',
    state: '',
    postalCode: ''
  });
  const { id } = useParams();

  useEffect(() => {
    fetchJobDetails();
    fetchCurrentUserDetails();
  }, [id]);

  useEffect(() => {
    // Prefill the location state with the current user's address when the user data is fetched
    if (currentUser?.personalInformation?.address) {
      setLocation((prevLocation) => ({
        ...prevLocation,
        streetAddress: currentUser.personalInformation.address,
      }));
    }
  }, [currentUser]);

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
    if (termsAccepted && jobDetails && currentUser) {
      const updatedApplicants = [...jobDetails.applicants];
      updatedApplicants.push({
        jobSeeker: currentUser._id,
        status: "Pending",
        notes: "",
      });
      
      // Handle file upload logic here, e.g. uploading to a server or cloud storage.
      // After uploading, you should have a URL or some identifier for the resume file.
      // Let's assume the function 'uploadResume' returns a URL or path of the uploaded resume.
      const resumePath = resume ? await uploadResume(resume) : '';

      await jobPostingsService.updateJobPosting(id, { applicants: updatedApplicants });
      
      const updatedApplicationHistory = [...currentUser.applicationHistory];
      updatedApplicationHistory.push({
        jobPosting: jobDetails._id,
        applyDate: new Date(),
        status: "Applied",
        resume: resumePath, // Use the resume URL or path
        location: location, // Include the location details
      });

      await jobSeekersService.addInfo(currentUser._id, { applicationHistory: updatedApplicationHistory });

      // After successful application
      toast.success("Application Submitted Successfully!", {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      navigate('/application-success'); // Navigate to a success page if you have one
    }
  };

  const handleResumeUpload = (event) => {
    setResume(event.target.files[0]);
  };

  const handleLocationChange = (e) => {
    const { name, value } = e.target;
    setLocation(prevLocation => ({
      ...prevLocation,
      [name]: value
    }));
  };

  const handleTermsAcceptance = () => {
    setTermsAccepted(!termsAccepted);
  };

  if (!jobDetails || !currentUser) {
    return <div>Loading...</div>;
  }

  return (
    <div className="application-container">
      <ToastContainer />
      <h2 className="application-title">{jobDetails.jobTitle}</h2>
      {/* ... existing elements */}
      <p><strong>Your Name:</strong> {currentUser.personalInformation.name}</p>
        <p><strong>Your Email:</strong> {currentUser.personalInformation.contactDetails.email}</p>
        <p><strong>Your Phone:</strong> {currentUser.personalInformation.contactDetails.phone}</p>
      {/* Location Details Section */}
      <div className="application-section">
        {/* Include inputs for street address, city, state, and postal code */}
        <input
          name="streetAddress"
          value={location.streetAddress}
          onChange={handleLocationChange}
          placeholder="Street address"
        />
        <input
          name="city"
          value={location.city}
          onChange={handleLocationChange}
          placeholder="City"
        />
        <input
          name="state"
          value={location.state}
          onChange={handleLocationChange}
          placeholder="State"
        />
        <input
          name="postalCode"
          value={location.postalCode}
          onChange={handleLocationChange}
          placeholder="Postal code"
        />
      </div>

      {/* Resume Upload Section */}
      <div className="application-section">
        <input type="file" onChange={handleResumeUpload} />
        {resume && <span>{resume.name}</span>}
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

// Placeholder function for uploading resume
// Replace with actual logic for uploading to your server or cloud storage
async function uploadResume(file) {
  const formData = new FormData();
  formData.append("resume", file);

  // store in mongodb
  const response = await fetch("/api/upload", {
    method: "POST",
    body: formData,
  });
  const data = await response.json();
  return data.url;
}

export default Application;
