
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // Import useParams
import jobSeekersService from "../services/jobSeekersService";
import "../dashboard.css";
import Navbar from "./Navbar";

function JobSeekerFetcher() {
  const [jobSeeker, setJobSeeker] = useState(null);
  const { id } = useParams();

  const fetchJobSeeker = async () => {
    try {
      const data = await jobSeekersService.getJobSeeker(id);
      console.log(data);
      setJobSeeker(data);
    } catch (error) {
      console.error("Failed to fetch job seeker:", error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchJobSeeker();
    }
  }, [id, fetchJobSeeker]);
  // ... inside your component's return statement
  return (
    <div className="dashboard">
      <Navbar />
      {jobSeeker && (
        <>
          <div className="section">
            <h3>Personal Details</h3>
            <p>Name: <strong>{jobSeeker.personalInformation.name}</strong></p>
          </div>

          <div className="section">
            <h3>Contact Details</h3>
            <p>Email: <a href={`mailto:${jobSeeker.personalInformation.contactDetails.email}`} style={{ color: '#59a6ff' }}>{jobSeeker.personalInformation.contactDetails.email}</a></p>
            <p>Phone: {jobSeeker.personalInformation.contactDetails.phone || "Not Provided"}</p>
          </div>

          <div className="section">
            <h3>Professional Profile</h3>
            <p>Skills: {jobSeeker.professionalProfile.skills.join(", ")}</p>
            {jobSeeker.professionalProfile.experience.map((exp, index) => (
              <p key={index}>
                <strong>{exp.title}</strong> at <strong>{exp.company}</strong> <span className="tagline">from {new Date(exp.startDate).toLocaleDateString()} - Provided high-quality service in a fast-paced environment.</span>
              </p>
            ))}
          </div>

          <div className="section">
            <h3>Job Preferences</h3>
            <p>Desired Industry: {jobSeeker.jobPreferences.desiredIndustry}</p>
            <p>Location: {jobSeeker.jobPreferences.location}</p>
            <p>Job Type: {jobSeeker.jobPreferences.jobType}</p>
          </div>
          {/* Additional buttons or functionality can be added here */}
        </>
      )}
    </div>
  );
}


export default JobSeekerFetcher;
