
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // Import useParams
import jobSeekersService from "../services/jobSeekersService";
import ApplicationsService from "../services/applicationService";
import JobPostingsService from "../services/jobPostingsService";
import "../dashboard.css";
import Navbar from "./Navbar";

function JobSeekerFetcher() {
  const [jobSeeker, setJobSeeker] = useState({
    personalInformation: {
      contactDetails: {},
    },
    location: {},
    jobPreferences: {},
    professionalProfile: {
      experience: [],
      education: [],
      skills: [],
    },
    applicationHistory: [],
    eventRegistrations: [],
  });
  const { id } = useParams();

  const fetchJobSeeker = async () => {
    try {
      const data = await jobSeekersService.getJobSeeker(id);
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

  const [applications, setApplications] = useState([])
  const [jobs, setJobs] = useState([])

  const fetchApplications = async () => {
    try {
      if (applications.length === 0 && jobs.length === 0 && jobSeeker.applicationHistory.length > 0) {
        jobSeeker.applicationHistory.map(async (application) => {
          const app = await ApplicationsService.getApplicationByID(application)
          const job = await JobPostingsService.getJobPostingById(app.jobPosting)
          if (applications.length < jobSeeker.applicationHistory.length && jobs.length < jobSeeker.applicationHistory.length) {
            console.log(jobSeeker.applicationHistory.length);
            setApplications((prevApplications) => [...prevApplications, app])
            setJobs((prevJobs) => [...prevJobs, job])
          }
        })
      }
    } catch (error) {
      console.error("Failed to fetch applications:", error);
    }
  }

  useEffect(() => {
    if (jobSeeker?.applicationHistory?.length > 0 && applications.length === 0 && jobs.length === 0) {
      fetchApplications()
    }
  }, [jobSeeker]);

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
            <p>
              Experience:{" "}
              {jobSeeker.professionalProfile.experience.length > 0
                ? jobSeeker.professionalProfile.experience
                  .map((exp) => {
                    const startDate = exp.startDate
                      ? new Date(exp.startDate).toLocaleDateString()
                      : "Not Provided";
                    return `${exp.title} at ${exp.company}, from ${startDate}, ${exp.description}`;
                  })
                  .join("; ")
                : "None"}
            </p>
            <p>
              Education:{" "}
              {jobSeeker.professionalProfile.education.length > 0
                ? jobSeeker.professionalProfile.education
                  .map((edu) => {
                    const startDate = edu.startDate
                      ? new Date(edu.startDate).toLocaleDateString()
                      : "Not Provided";
                    return `${edu.fieldOfStudy} at ${edu.institution}, from ${edu.startDate}, ${edu.endDate}`;
                  })
                  .join("; ")
                : "None"}
            </p>
          </div>

          <div className="section">
            <h3>Job Preferences</h3>
            <p>Desired Industry: {jobSeeker.jobPreferences?.desiredIndustry}</p>
            <p>Job Type: {jobSeeker.jobPreferences?.jobType}</p>
          </div>

          <div className="section">
            <h3>Location</h3>
            <p>Address: {jobSeeker.location?.address}</p>
            <p>City: {jobSeeker.location?.city}</p>
            <p>Province: {jobSeeker.location?.province}</p>
            <p>Postal Code: {jobSeeker.location?.postalCode}</p>
          </div>

          <div className="section">
            <h3>Application History</h3>
            <ul className="application-history">
              {jobSeeker.applicationHistory.length > 0 ?
                applications.map((app, i) => (
                  <li key={app._id}>
                    <p>Job Title: {jobs[i].jobTitle}</p>
                    <p>Company: {jobs[i].company}</p>
                    <p>
                      Apply Date:{" "}
                      {new Date(app.createdAt).toLocaleDateString()}
                    </p>
                    <p>Status: {app.status}</p>
                  </li>
                ))
                : <h3 className="text-center">None</h3>}
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

export default JobSeekerFetcher;
