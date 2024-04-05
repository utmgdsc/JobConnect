import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import jobPostingsService from "../services/jobPostingsService";
import jobSeekersService from "../services/jobSeekersService";
import uploadService from "../services/uploadService"; // Import the upload service
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../Application.css"; // Ensure your CSS styles are set up for this page

const Application = () => {
  const navigate = useNavigate();
  const [jobDetails, setJobDetails] = useState(null);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [file, setFile] = useState("");
  const [location, setLocation] = useState({
    streetAddress: '',
    city: '',
    state: '',
    postalCode: ''
  });
  const [title, setTitle] = useState("");
  const { id } = useParams();

  useEffect(() => {
    fetchJobDetails();
    fetchCurrentUserDetails();
  }, [id]);

  useEffect(() => {
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

      await jobPostingsService.updateJobPosting(id, { applicants: updatedApplicants });

      const updatedApplicationHistory = [...currentUser.applicationHistory];
      updatedApplicationHistory.push({
        jobPosting: jobDetails._id,
        applyDate: new Date(),
        status: "Applied",
        location: location,
      });

      await jobSeekersService.addInfo(currentUser._id, { applicationHistory: updatedApplicationHistory });

      submitImage();

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
    }
  };

  const handleResumeUpload = (event) => {
    setTitle(event.target.value);
    setFile(event.target.files[0]);
  };

  const submitImage = async (e) => {
    try {
      const response = await uploadService.uploadResume(file);
      console.log(response);
    } catch (error) {
      console.error("Error uploading file:", error);
    }

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
      <div className="application-section">
        <p><strong>Your Name:</strong> {currentUser.personalInformation.name}</p>
        <p><strong>Your Email:</strong> {currentUser.personalInformation.contactDetails.email}</p>
        <p><strong>Your Phone:</strong> {currentUser.personalInformation.contactDetails.phone}</p>
      </div>
      <div className="application-section">
        <input name="streetAddress" value={location.streetAddress} onChange={handleLocationChange} placeholder="Street address" />
        <input name="city" value={location.city} onChange={handleLocationChange} placeholder="City" />
        <input name="state" value={location.state} onChange={handleLocationChange} placeholder="State" />
        <input name="postalCode" value={location.postalCode} onChange={handleLocationChange} placeholder="Postal code" />
      </div>
      <div className="application-section">
        <input type="file" onChange={handleResumeUpload} accept="application/pdf" />
        {file && <span>{file.name}</span>}
      </div>
      <div className="application-action">
        <div>
          <input type="checkbox" id="termsAccepted" className="application-checkbox" checked={termsAccepted} onChange={handleTermsAcceptance} />
          <label htmlFor="termsAccepted"> I agree to the terms and conditions.</label>
        </div>
        <button className="application-button" onClick={handleApplyNow}>Apply Now</button>
      </div>
    </div>
  );
};

export default Application;
