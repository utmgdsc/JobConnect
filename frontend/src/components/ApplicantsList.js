import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import JobsService from "../services/ApplicantsService";
import jobSeekersService from "../services/jobSeekersService";


function ApplicantsList() {
  let { jobId } = useParams();
  const [applicants, setApplicants] = useState([]);

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const jobData = await JobsService.getJob(jobId);
        const applicantPromises = jobData.applicants.map((applicantId) =>
          jobSeekersService.getJobSeeker(applicantId),
        );
        const applicantDetails = await Promise.all(applicantPromises);
        setApplicants(applicantDetails); // Now contains full details of each applicant
      } catch (error) {
        console.error("Failed to fetch applicants:", error);
        // Handle error (e.g., show an error message)
      }
    };

    fetchApplicants();
  }, [jobId]); // Run this effect when jobId changes

  return (
    <div>
      <h2>Applicants for Job ID: {jobId}</h2>
      {applicants.length > 0 ? (
        <ul>
          {applicants.map((applicant) => (
            <li key={applicant._id}>
              {/* Link to the applicant's profile using their ID */}
              <Link to={`/profile/${applicant._id}`}>
                {console.log(applicant)}
                {applicant.personalInformation.name}
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No applicants found for this job.</p>
      )}
    </div>
  );
}

export default ApplicantsList;
