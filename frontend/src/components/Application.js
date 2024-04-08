import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import jobPostingsService from "../services/jobPostingsService";
import jobSeekersService from "../services/jobSeekersService";
import uploadService from "../services/uploadService"; // Import the upload service
import applicationService from "../services/applicationService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../Application.css"; // Ensure your CSS styles are set up for this page
import { all } from "axios";

const Application = () => {
  const navigate = useNavigate();
  const [jobDetails, setJobDetails] = useState(null);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [file, setFile] = useState("");
  const [location, setLocation] = useState({
    streetAddress: '',
    city: '',
    province: '',
    postalCode: ''
  });
  const [title, setTitle] = useState("");
  const { id } = useParams();
  const [isAuthorized, setIsAuthorized] = useState(false); // For authorization to work
  const [experience, setExperience] = useState(""); // For experience
  const [relocation, setRelocation] = useState(false); // For relocation
  const [allImages, setAllImages] = useState(null);

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

  useEffect(() => {
    getPdf();
  }, []);
    const getPdf = async () => {
      const pdf = await uploadService.getFiles();
      setAllImages(pdf.data);
    };

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
      console.log(currentUser._id, "current user id")
      // create application object

      // get resume object
      // grab the latest resume from allImages
      const resume = allImages[allImages.length - 1];
      
      const application = {
        jobPosting: jobDetails._id,
        jobSeeker: currentUser._id,
        resume: resume._id,
        location,
        relocation,
        authorized: isAuthorized,
        experience,
        status: "Pending",
      };

      await applicationService.addApplication(application);

      submitImage();
      const app = await applicationService.getApplication(application._id);
      //grab the latest application
      const latestApplication = app[app.length - 1];

      const updatedApplications = [...currentUser.applicationHistory];
      updatedApplications.push(latestApplication._id);
      await jobSeekersService.addInfo(currentUser._id, { applicationHistory: updatedApplications });


      // update job posting with the new application
      const updatedApplicants = [...jobDetails.applicants];
      updatedApplicants.push({
        jobSeeker: currentUser._id,
        status: "Pending",
        notes: "",
      });

      await jobPostingsService.updateJobPosting(id, { applicants: updatedApplicants });

      // as a test lets get the application's resume
      // print the job posting object
      console.log(jobDetails, "job details")
      // grab the applicant's object from the applicants array by _id
      const applicant = updatedApplicants.find(applicant => applicant.jobSeeker === currentUser._id);
      console.log(applicant, "applicant") 

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

  const handleRelocationChange = (e) => {
    setRelocation(e.target.value === "yes");
  };

  const handleAuthorizationChange = (e) => {
    setIsAuthorized(e.target.value === "yes");
  };

  const handleExperienceChange = (e) => {
    setExperience(e.target.value);
  };

  if (!jobDetails || !currentUser) {
    return <div>Loading...</div>;
  }

  return (
    <div className="application-container">
      <ToastContainer />
      <h2 className="application-title">{jobDetails.jobTitle}</h2>
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
        <input name="streetAddress" value={location.streetAddress} onChange={handleLocationChange} placeholder="Street address" />
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
      <div class="mb-3 form-check">
          <input type="checkbox" class="form-check-input" id="termsAccepted" checked={termsAccepted} onChange={handleTermsAcceptance} />
          <label class="form-check-label" for="exampleCheck1">I agree to the terms and conditions.</label>
        </div>
      <div className="application-action">
        <button className="application-button" onClick={handleApplyNow}>Apply Now</button>
      </div>
    </div>
  );
};



export default Application;
