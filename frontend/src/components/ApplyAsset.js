import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import AssetPostingsService from '../services/AssetPostingsService';
import jobSeekersService from '../services/jobSeekersService';
import applicationService from "../services/applicationService";
import uploadService from "../services/uploadService"; // Import the upload service
import "../Application.css";
import Navbar from './Navbar';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ApplyAsset = () => {
  const navigate = useNavigate();
  const { assetId } = useParams();
  const [assetDetails, setAssetDetails] = useState(null);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [file, setFile] = useState(null); // For file upload
  const [allImages, setAllImages] = useState(null); // To store uploaded files
  const [location, setLocation] = useState({
    streetAddress: '',
    city: '',
    province: '',
    postalCode: ''
  });
  const [isWillingToRelocate, setIsWillingToRelocate] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [experience, setExperience] = useState('');

  useEffect(() => {
    fetchAssetDetails();
    fetchCurrentUserDetails();
    getPdf();
  }, [assetId]);

  const getPdf = async () => {
    const pdf = await uploadService.getFiles();
    setAllImages(pdf.data);
  };

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

  const handleLocationChange = (e) => {
    const { name, value } = e.target;
    setLocation(prev => ({ ...prev, [name]: value }));
  };

  const handleRelocationChange = (value) => {
    setIsWillingToRelocate(value === 'yes');
  };

  const handleAuthorizationChange = (value) => {
    setIsAuthorized(value === 'yes');
  };

  const handleExperienceChange = (value) => {
    setExperience(value);
  };
  const handleApplyNow = async () => {
    if (!termsAccepted) {
      toast.warn('Please accept the terms and conditions.');
      return;
    }
    if (!currentUser || !assetDetails) {
      toast.warn('Please make sure you are logged in to apply.');
      return;
    }
    if (assetDetails.applicants && assetDetails.applicants.includes(currentUser._id)) {
      toast.warn('You have already applied to this asset posting.');
      return;
    }
  
    const latestFile = allImages[allImages.length - 1];
    const application = {
      assetPosting: assetDetails._id,
      jobSeeker: currentUser._id,
      resume: latestFile._id, // Assuming there is a resume requirement
      status: "Pending",
    };
  
    try {
      const allApplications = await applicationService.getApplications();
    
      // Filter applications for the current asset posting
      const relatedApplications = allApplications.filter(app => app.assetPosting === assetDetails._id);
  
      // Check if the current user has already applied
      const hasApplied = relatedApplications.some(app => app.jobSeeker === currentUser._id);
      if (hasApplied) {
        toast.warn('You have already applied to this asset posting.');
        return;
      }
      
      await applicationService.addApplication(application);
      const app = await applicationService.getApplications();
      const latestApplication = app[app.length - 1];
  
      const updatedApplications = [...currentUser.applicationHistory, latestApplication._id];
      await jobSeekersService.addInfo(currentUser._id, { applicationHistory: updatedApplications });
  
      const updatedApplicants = [...assetDetails.applicants, latestApplication._id];
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
    } catch (error) {
      console.error("Failed to submit application:", error);
      toast.error('Failed to submit application.');
    }
  };

  const handleResumeUpload = (event) => {
    setFile(event.target.files[0]);
  };

  const submitImage = async () => {
    if (file) {
      try {
        const response = await uploadService.uploadResume(file);
        getPdf(); // Refresh uploaded files list
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }
  };

  const handleTermsAcceptance = () => {
    setTermsAccepted(!termsAccepted);
  };

  if (!assetDetails || !currentUser) {
    return <div>Loading...</div>;
  }

  return (
    <div className="application-container">
      <ToastContainer />
      <h2 className="application-title">{assetDetails.owner}</h2>
      <div className="application-section">
        <h3>Contact Information</h3>
        <div>
          <strong>Name:</strong><br></br>
          <span>{currentUser.personalInformation.name}</span>
        </div>
        <br></br>
        <div>
          <strong>Email address:</strong><br></br>
          <span>{currentUser.personalInformation.contactDetails.email}</span>
        </div>
        <br></br>
        <div>
          <strong>Phone number:</strong><br></br>
          <span>{currentUser.personalInformation.contactDetails.phone}</span>
        </div>
      </div>
      <div className="application-section">
        <h4>Location</h4>
        <input name="address" value={location.address} onChange={handleLocationChange} placeholder="Street address" />
        <input name="city" value={location.city} onChange={handleLocationChange} placeholder="City" />
        <input name="province" value={location.province} onChange={handleLocationChange} placeholder="Province" />
        <input name="postalCode" value={location.postalCode} onChange={handleLocationChange} placeholder="Postal code" />
      </div>
      <strong>Are you willing to relocate?</strong><br></br>
      <div className="radio-group">
        <div className="form-check form-check-inline yes-option">
          <input className="form-check-input" type="radio" name="relocationOptions" id="inlineRadio1" value="yes" onChange={handleRelocationChange} />
          <label className="form-check-label" htmlFor="inlineRadio1">Yes</label>
        </div>
        <div className="form-check form-check-inline no-option">
          <input className="form-check-input" type="radio" name="relocationOptions" id="inlineRadio2" value="no" onChange={handleRelocationChange} />
          <label className="form-check-label" htmlFor="inlineRadio2">No</label>
        </div>
      </div>
      <br></br>
      <strong>Are you legally authorized to work in Canada?</strong><br></br>
      <div className="radio-group">
        <div className="form-check form-check-inline yes-option">
          <input className="form-check-input" type="radio" name="workAuthorizationOptions" id="inlineRadio3" value="yes" onChange={handleAuthorizationChange} />
          <label className="form-check-label" htmlFor="inlineRadio3">Yes</label>
        </div>
        <div className="form-check form-check-inline no-option">
          <input className="form-check-input" type="radio" name="workAuthorizationOptions" id="inlineRadio4" value="no" onChange={handleAuthorizationChange} />
          <label className="form-check-label" htmlFor="inlineRadio4">No</label>
        </div>
      </div>
      <br></br>
      <strong> How many years of experience do you have in this field?</strong><br></br>
      <div className="radio-group">
        <div className="form-check form-check-inline yes-option">
          <input className="form-check-input" type="radio" name="experienceOptions" id="inlineRadio5" value="0-1" onChange={handleExperienceChange} />
          <label className="form-check-label" htmlFor="inlineRadio5">0-1</label>
        </div>
        <div className="form-check form-check-inline no-option">
          <input className="form-check-input" type="radio" name="experienceOptions" id="inlineRadio6" value="1-3" onChange={handleExperienceChange} />
          <label className="form-check-label" htmlFor="inlineRadio6">1-3</label>
        </div>
      </div>
      <div className="radio-group">
        <div className="form-check form-check-inline yes-option">
          <input className="form-check-input" type="radio" name="experienceOptions" id="inlineRadio7" value="3-5" onChange={handleExperienceChange} />
          <label className="form-check-label" htmlFor="inlineRadio7">3-5</label>
        </div>
        <div className="form-check form-check-inline no-option">
          <input className="form-check-input" type="radio" name="experienceOptions" id="inlineRadio8" value="5+" onChange={handleExperienceChange} />
          <label className="form-check-label" htmlFor="inlineRadio8">5+</label>
        </div>
      </div>
      <br></br>
      <div className="application-section">
        <h4>Add a resume for the employer</h4>
        <div className="application-file-upload">
          <input type="file" id="resumeUpload" onChange={handleResumeUpload} accept="application/pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document" />
          <label htmlFor="resumeUpload">Please upload your resume in PDF or Word format</label>
        </div>
        {file && <span className="application-file-name">{file.name}</span>}
      </div>
      <div className="mb-3 form-check">
        <input type="checkbox" className="form-check-input" id="termsAccepted" checked={termsAccepted} onChange={handleTermsAcceptance} required />
        <label className="form-check-label" for="exampleCheck1">I agree to the terms and conditions.</label>
      </div>
       <div className="application-action">
        <button className="application-button" onClick={handleApplyNow}>Apply Now</button>
      </div>
    </div>
  );
};

export default ApplyAsset;
