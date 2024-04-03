import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import JobsService from "../services/ApplicantsService";
import jobSeekersService from "../services/jobSeekersService";
import jobPostingsService from "../services/jobPostingsService";
import { userType } from "../lib/isAuth";
import Navbar from "./Navbar";

function ApplicantsList() {
  let { jobId } = useParams();
  const [applicants, setApplicants] = useState([]);
  const [jobDetails, setJobDetails] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const loggedIn = userType();

  useEffect(() => {
    const fetchJobDetailsAndApplicants = async () => {
      const jobData = await JobsService.getJob(jobId);
      setJobDetails(jobData); // Set job details

      const applicantPromises = jobData.applicants.map((applicant) =>
        jobSeekersService.getJobSeeker(applicant.jobSeeker) // Fetch full details for each applicant
      );

      const applicantDetails = await Promise.all(applicantPromises);

      // Merge applicant details with their status and notes from the job data
      const mergedApplicants = applicantDetails.map((applicantDetail) => {
        const application = jobData.applicants.find(app => app.jobSeeker === applicantDetail._id);
        return {
          ...applicantDetail,
          status: application.status,
          notes: application.notes,
        };
      });
      const user = userType();
      console.log(user)
      setApplicants(mergedApplicants);
    };

    fetchJobDetailsAndApplicants();
  }, [jobId]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const createMailtoLink = (email, subject, body) => {
  return `mailto:${encodeURIComponent(email)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
};

  const handleStatusChange = (applicantId, newStatus) => {
    setApplicants(applicants.map(applicant => {
      if (applicant._id === applicantId) {
        return { ...applicant, status: newStatus };
      }
      return applicant;
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

  const handleSubmitChanges = async () => {
    // Prepare the updated applicants array with the modified details
    const updatedApplicants = jobDetails.applicants.map(applicant => {
        const updatedApplicant = applicants.find(a => a._id === applicant.jobSeeker);
        return {
            ...applicant,
            status: updatedApplicant.status,
            // Assuming you allow editing notes as well, similar to status and name
            notes: updatedApplicant.notes,
        };
    });

    // Prepare the updated job details object
    const updatedJobDetails = { ...jobDetails, applicants: updatedApplicants };

    try {
        // Use the updateJobPosting function from the jobPostingsService to send the update request
        await jobPostingsService.updateJobPosting(jobId, updatedJobDetails);
        alert('Applicant details updated successfully.');

        // Optionally, you could re-fetch the job details here to ensure the UI is in sync with the database
    } catch (error) {
        console.error('Failed to update applicant details:', error);
        alert('Failed to update applicant details. Please try again.');
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
  applicants
    .filter(applicant =>
      applicant.personalInformation.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .map((applicant) => (
      <div key={applicant._id} className="applicant-section mb-3">
        {/* Update this part to include a link to the applicant's profile */}
        <Link to={`/applicant-profile/${applicant._id}`} className="applicant-name">
          <h4>{applicant.personalInformation.name}</h4>
        </Link>
        <select
          className="form-control mb-2"
          value={applicant.status}
          onChange={(e) => handleStatusChange(applicant._id, e.target.value)}
        >
          <option value="Pending">Pending</option>
          <option value="Accepted">Accepted</option>
          <option value="Rejected">Rejected</option>
        </select>
        <textarea
          className="form-control"
          value={applicant.notes}
          onChange={(e) => handleNotesChange(applicant._id, e.target.value)}
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