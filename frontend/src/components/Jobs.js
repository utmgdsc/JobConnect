import React, { useState, useEffect } from "react";
import jobPostingsService from "../services/jobPostingsService";
import "../jobs.css";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const Jobs = () => {
  const [jobPostings, setJobPostings] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("All");
  const [expandedJobId, setExpandedJobId] = useState(null); // State to track which job is expanded

  const navigate = useNavigate();

  const navigateToApplication = () => {
    navigate("/application");
  };

  useEffect(() => {
    fetchJobPostings();
  }, []);

  const [selectedJob, setSelectedJob] = useState(null);

  const fetchJobPostings = async () => {
    try {
      const data = await jobPostingsService.getAllJobPostings();
      setJobPostings(data);
    } catch (error) {
      console.error("Error fetching job postings:", error);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const toggleExpandJob = (id) => {
    // Toggle the expanded view for the job with the given id
    setExpandedJobId(expandedJobId === id ? null : id);
  };

  const filteredJobPostings = jobPostings.filter((posting) => {
    return (
      posting.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filter === "All" || posting.jobType === filter)
    );
  });

  const selectJob = (job) => {
    setSelectedJob(job);
  };

  return (
    <div className="jobs-container">
      <Navbar />
      <div className="search-and-filter">
        <input
          type="text"
          placeholder="Search jobs..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-input"
        />
        <select
          value={filter}
          onChange={handleFilterChange}
          className="filter-select"
        >
          <option value="All">All Types</option>
          <option value="Full-Time">Full-Time</option>
          <option value="Part-Time">Part-Time</option>
          <option value="Contract">Contract</option>
          <option value="Temporary">Temporary</option>
          <option value="Internship">Internship</option>
        </select>
      </div>
      <div className="jobs-layout">
        <div className="job-listings">
          {filteredJobPostings.map((posting) => (
            <div
              key={posting._id}
              className="job-posting"
              onClick={() => selectJob(posting)}
            >
              <h3>{posting.jobTitle}</h3>
              <p>Posted by: {posting.company.name}</p>
              <p>{posting.location}</p>
              <p>Type: {posting.jobType}</p>
            </div>
          ))}
        </div>
        {selectedJob && (
          <div className="job-details-panel">
            <h3>{selectedJob.jobTitle}</h3>
            <p>Description: {selectedJob.details.description}</p>
            <p>Responsibilities:</p>
            <ul>
              {selectedJob.details.responsibilities.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
            <p>Requirements:</p>
            <ul>
              {selectedJob.details.requirements.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
            <button className="apply-button" onClick={navigateToApplication}>
              Apply Now
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Jobs;