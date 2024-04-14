import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import AssetPostingsService from '../services/AssetPostingsService';
import jobSeekersService from '../services/jobSeekersService';
import '../ApplyAsset.css';
import Navbar from './Navbar';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ApplyAsset = () => {
  const { assetId } = useParams();
  const [assetDetails, setAssetDetails] = useState(null);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchAssetDetails();
    fetchCurrentUserDetails();
  }, [assetId]);

  const fetchAssetDetails = async () => {
    try {
      const data = await AssetPostingsService.getAssetPostingById(assetId);
      setAssetDetails(data);
    } catch (error) {
      console.error('Error fetching asset details:', error);
    }
  };

  const fetchCurrentUserDetails = async () => {
    try {
      const user = await jobSeekersService.fetchCurrentUser();
      setCurrentUser(user);
    } catch (error) {
      console.error('Error fetching current user details:', error);
    }
  };

  const handleApplyNow = async () => {
    if (!termsAccepted || !currentUser || !assetDetails) {
      alert('Please accept the terms and make sure you are logged in to apply.');
      return;
    }
  
    if (isSubmitting) {
      // Prevent further execution if a submission is already in progress
      return;
    }
  
    setIsSubmitting(true); // Disable further submissions
  
    try {
      const application = {
        assetPosting: assetDetails._id,
        jobSeeker: currentUser._id,
        status: "Accepted",
      };
  
      await applicationService.addApplication(application);
  
      const app = await applicationService.getApplications();
      // Grab the latest application
      const latestApplication = app[app.length - 1];
  
      const updatedApplications = [...currentUser.applicationHistory];
      updatedApplications.push(latestApplication._id);
      await jobSeekersService.addInfo(currentUser._id, { applicationHistory: updatedApplications });
  
      // Update asset posting with the new application
      const updatedApplicants = [...assetDetails.applicants];
      updatedApplicants.push(latestApplication._id);
      await AssetPostingsService.updateAssetPosting(assetDetails._id, { applicants: updatedApplicants });
  
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
  
      navigate("/");
    } catch (error) {
      console.error('Error submitting application:', error);
      // Optionally, show an error toast here
    }
  
    setIsSubmitting(false); // Re-enable submissions
  };
    
  const handleTermsAcceptance = () => {
    setTermsAccepted(!termsAccepted);
  };

  if (!assetDetails || !currentUser) {
    return <div>Loading...</div>;
  }


  return (
    <div className="apply-asset-container">
      <Navbar />
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
      <h2 className="apply-asset-title">Asset Details Overview</h2>

      {/* Asset Details Section */}
      <div className="apply-asset-section">
        <p><span>Type:</span> {assetDetails.assetType}</p>
        <p><span>Location:</span> {assetDetails.location}</p>
        <p><span>Description:</span> {assetDetails.details.description}</p>
      </div>

      {/* User Confirmation Section */}
      <div className="apply-asset-section">
        <h3>Confirm these details are correct</h3>
        <p><span>Name:</span> {currentUser.personalInformation.name}</p>
        <p><span>Email:</span> {currentUser.personalInformation.contactDetails.email}</p>
        <p><span>Phone:</span> {currentUser.personalInformation.contactDetails.phone}</p>
        {/* Link to user's profile */}
        <Link to="/user" className="profile-link">View Profile</Link>
      </div>

      {/* Action Section */}
      <div className="apply-asset-action">
        <div>
          <input
            type="checkbox"
            id="termsAccepted"
            className="apply-asset-checkbox"
            checked={termsAccepted}
            onChange={handleTermsAcceptance}
          />
          <label htmlFor="termsAccepted">
            I am above 16 years old and agree to the terms and conditions.
          </label>
        </div>
        <button className="apply-asset-button" onClick={handleApplyNow}>
          Apply Now
        </button>
      </div>
    </div>
  );
};

export default ApplyAsset;