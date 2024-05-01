import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import JobsService from "../services/ApplicantsService";
import jobSeekersService from "../services/jobSeekersService";
import jobPostingsService from "../services/jobPostingsService";
import { userType } from "../lib/isAuth";
import Navbar from "./Navbar";
import ApplicationsService from "../services/applicationService";
import isAuth from "../lib/isAuth";
import {useNavigate } from "react-router-dom";

function ApplicantsList() {
  let { jobId } = useParams();
  const [applicants, setApplicants] = useState([]);
  const [jobDetails, setJobDetails] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const loggedIn = userType();
  const navigate = useNavigate();
  const [sortOrder, setSortOrder] = useState("DESC"); // Default to descending

 

const toggleSortOrder = () => {
  setSortOrder(prevOrder => (prevOrder === "ASC" ? "DESC" : "ASC"));
};
  
useEffect(() => {
    const fetchJobDetailsAndApplications = async () => {

      try {
        const token = isAuth();
        console.log(token, 'token2')
        if (!token) {
          throw new Error('User is not authenticated');
        }
  
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
  
        // Fetching the current user's details with the token
        const currentUser = await jobSeekersService.fetchCurrentUser();
        console.log(currentUser._id, 'currentUser')

  
        // Assuming jobDetails have an employerId that indicates who posted the job
        const jobData = await JobsService.getJob(jobId);
        console.log(jobData, 'jobData');  
        console.log(jobData.company, 'jobData.company')
        // Verify if the current user is the employer who posted the job
        if (currentUser._id === jobData.employer) {
          setJobDetails(jobData);
          // Proceed to fetch and set applicants as before
        } else {
          alert("You are not authorized to view this page.");
          navigate('/')
          // Handle unauthorized access appropriately
        }
      } catch (error) {
        console.error("Error: ", error);
        // Handle errors appropriately
      }
    
        const jobData = await JobsService.getJob(jobId);
        setJobDetails(jobData); // Set job details
        
        const applicationPromises = jobData.applicants.map(applicationId =>
            ApplicationsService.getApplicationByID(applicationId)
        );

        const applications = await Promise.all(applicationPromises);

        const jobSeekerPromises = applications.map(app =>
            jobSeekersService.getJobSeeker(app.jobSeeker) // Assuming this returns full job seeker details
        );

        const jobSeekersDetails = await Promise.all(jobSeekerPromises);

        // Merge application with job seeker details
        const mergedApplications = applications.map((app, index) => ({
            ...app,
            jobSeekerDetails: jobSeekersDetails[index] // Add fetched job seeker details to each application
        }));

        setApplicants(mergedApplications);
    };

    fetchJobDetailsAndApplications();
}, [jobId]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const createMailtoLink = (email, subject, body) => {
  return `mailto:${encodeURIComponent(email)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
};

const handleStatusChange = (applicationId, newStatus) => {
  setApplicants(applicants.map(application => {
      if (application._id === applicationId) {
          return { ...application, status: newStatus };
      }
      return application;
  }));
};


  const handleNameChange = (applicantId, newName) => {
    setApplicants(applicants.map(applicant => {
      if (applicant._id === applicantId) {
        return { ...applicant, personalInformation: { ...applicant.personalInformation, name: newName } };
      }
      return applicant;
    }));
  };

  const handleNotesChange = (applicantId, newNotes) => {
  setApplicants(applicants.map(applicant => {
    if (applicant._id === applicantId) {
      return { ...applicant, notes: newNotes };
    }
    return applicant;
  }));
};

const handleRatingChange = (applicationId, newRating) => {
  const validRating = newRating ? parseFloat(newRating) : 0; // Convert to float, default to 0 if empty

  setApplicants(applicants.map(application => {
      if (application._id === applicationId) {
          return { ...application, rating: validRating };
      }
      return application;
  }));
};



const handleSubmitChanges = async () => {
  try {
      for (const application of applicants) {
          await ApplicationsService.updateApplication(application._id, {
              status: application.status,
              notes: application.notes,
              rating: application.rating // Include the rating in the update
          });
      }
      alert('Application details updated successfully.');
  } catch (error) {
      console.error('Failed to update application details:', error);
      alert('Failed to update application details. Please try again.');
  }
};




  if (!loggedIn || loggedIn === "applicant") {
    return <p>Access denied. You must be logged in as an employer to view this page.</p>;
  }

    // Adjusted part of the return statement to include filtering
    return (
      <div className="jobs-container">
          <Navbar />
          <div className="container">
              <button onClick={toggleSortOrder} className="btn btn-secondary mb-3">
                  Sort by Rating {sortOrder === "ASC" ? "Ascending" : "Descending"}
              </button>
              <div className="search-and-filter mb-3">
                  <input
                      type="text"
                      className="form-control"
                      placeholder="Search by name"
                      value={searchQuery}
                      onChange={handleSearchChange}
                  />
              </div>
              {jobDetails && (
    <>
        <h2 className="mb-3">{jobDetails.jobTitle} - {jobDetails.location}</h2>
        {applicants.length > 0 ? (
            [...applicants] // Create a copy to sort without mutating the original state
            .sort((a, b) => sortOrder === "ASC" ? a.rating - b.rating : b.rating - a.rating)
            .filter(application =>
                application.jobSeekerDetails.personalInformation.name.toLowerCase().includes(searchQuery.toLowerCase())
            )
    .map((application) => (
        <div key={application._id} className="applicant-section mb-3">
            <Link to={`/applicant-profile/${application.jobSeekerDetails._id}`} className="applicant-name">
                <h4>{application.jobSeekerDetails.personalInformation.name}</h4>
            </Link>
            <div className="applicant-details">
                <p>Location: {application.location.city}, {application.location.state}</p>
                <p>Relocation: {application.relocation ? "Yes" : "No"}</p>
                <p>Authorized: {application.authorized ? "Yes" : "No"}</p>
                <p>Experience: {application.experience}</p>
                <p>Referrals:</p>
                <ul>
                {application.referrals.map((referral, index) => (
                  <li key={index}>
                    <div style={{ border: "1px solid #ccc", padding: "10px", borderRadius: "5px", marginBottom: "10px" }}>
                      <p><strong>Referrer Name:</strong> {referral.name}</p>
                      <p><strong>Referrer Email:</strong> {referral.email}</p>
                      <p><strong>Relationship:</strong> {referral.relationship}</p>
                      <p><strong>Recommendation:</strong> {referral.recommendation}</p>
                    </div>
                  </li>
                ))}
              </ul>

            </div>
            <input
    type="number"
    step="0.1"  // Allow decimal entries
    className="form-control mb-2"
    value={application.rating || ''}  // Use empty string to allow clear input
    onChange={(e) => handleRatingChange(application._id, e.target.value)}  // Pass the value directly
    placeholder="Rate Applicant"
/>

            <select
                className="form-control mb-2"
                value={application.status}
                onChange={(e) => handleStatusChange(application._id, e.target.value)}
            >
                <option value="Pending">Pending</option>
                <option value="Accepted">Accepted</option>
                <option value="Rejected">Rejected</option>
            </select>
            <textarea
                className="form-control"
                value={application.notes}
                onChange={(e) => handleNotesChange(application._id, e.target.value)}
                placeholder="Enter notes here..."
            />
        </div>
    ))


  
) : (
    <p>No applicants found for this job.</p>
)}

              <button className="btn btn-primary mt-3" onClick={handleSubmitChanges}>Save Changes</button>
            </>
          )}
        </div>
        {/* Footer component or element here */}
      </div>
    );
    
}


export default ApplicantsList;