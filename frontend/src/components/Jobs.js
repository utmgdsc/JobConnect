import React, { useState, useEffect } from "react";
import jobPostingsService from "../services/jobPostingsService";
import "../jobs.css";
import { useNavigate } from "react-router-dom";
import toronto from "../images/toronto.jpg";

const Jobs = () => {
  const [jobPostings, setJobPostings] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("All");
  const [selectedJobId, setSelectedJobId] = useState(null); // State to track the selected job
  const [selectedJob, setSelectedJob] = useState(null); // State to store the selected job details
  const [locationInput, setLocationInput] = useState("");
  const [locationSuggestions, setLocationSuggestions] = useState([]);
  // Assuming you have a list of all possible locations
  const [allLocations, setAllLocations] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetchJobPostings();
  }, []);

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

  const selectJob = (job) => {
    setSelectedJobId(job._id); // Update the selected job ID
    setSelectedJob(job); // Update the selected job details
  };

  const handleLocationInputChange = (e) => {
    const input = e.target.value;
    setLocationInput(input);
    if (input.length > 0) {
      // Filter locations based on input
      const suggestions = allLocations.filter((loc) =>
        loc.toLowerCase().includes(input.toLowerCase()),
      );
      setLocationSuggestions(suggestions);
    } else {
      setLocationSuggestions([]);
    }
  };

  // Handler for selecting a location suggestion
  const handleLocationSelect = (location) => {
    setLocationInput(location);
    setLocationSuggestions([]);
    // Set the filter to the selected location and filter the job postings
    setFilter(location);
  };

  const filteredJobPostings = jobPostings.filter((posting) => {
    return (
      posting.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filter === "All" || posting.jobType === filter) &&
      posting.location.toLowerCase().includes(locationInput.toLowerCase())
    );
  });

  return (
    <div className="jobs-container">
      <div className="container">
        <div className="search-and-filter mb-3">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Search jobs..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <input
              type="text"
              className="form-control"
              placeholder="Search by location..."
              value={locationInput}
              onChange={handleLocationInputChange}
            />
            <button
              className="btn btn-outline-secondary dropdown-toggle btn-variant-1"
              type="button"
              data-bs-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Filter
            </button>
            <ul className="dropdown-menu">
              {locationSuggestions.length > 0 &&
                locationSuggestions.map((suggestion, index) => (
                  <li
                    key={index}
                    className="dropdown-item"
                    onClick={() => handleLocationSelect(suggestion)}
                  >
                    {suggestion}
                  </li>
                ))}
            </ul>
          </div>
          <div className="input-group">
            <select
              className="form-control"
              value={filter}
              onChange={handleFilterChange}
            >
              <option value="All">All Types</option>
              <option value="Full-Time">Full-Time</option>
              <option value="Part-Time">Part-Time</option>
              <option value="Contract">Contract</option>
              <option value="Temporary">Temporary</option>
              <option value="Internship">Internship</option>
            </select>
            <div className="input-group-append">
              <button className="btn btn-outline-secondary btn-variant-1" type="button">
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            {filteredJobPostings.map((posting) => (
              <div
                key={posting._id}
                className={`job-posting ${selectedJobId === posting._id ? "selected" : ""}`}
                onClick={() => selectJob(posting)}
              >
                <h3>{posting.jobTitle}</h3>
                <p>Posted by: {posting.company}</p>
                <p>{posting.location}</p>
                <p>Type: {posting.jobType}</p>
              </div>
            ))}
          </div>
          {selectedJobId && (
            <div className="col">
              {/* <img src={toronto} class="img-fluid" />{" "} */}
              {/* Company image or something?}
              {/* Assuming job details are accessed by ID */}
              <h3>
                {jobPostings.find((job) => job._id === selectedJobId).jobTitle}
              </h3>
              <p>Description: {selectedJob.details?.description}</p>
              <p>Responsibilities:</p>
              <ul>
                {selectedJob.details?.responsibilities.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
              <p>Requirements:</p>
              <ul>
                {selectedJob.details?.requirements.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
              <button
                className="btn btn-primary btn-md"
                onClick={() => navigate(`/job/${selectedJobId}`)}
              >
                Details
              </button>
            </div>
          )}
        </div>
      </div>
      {/* Footer */}
      <footer className="p-5 bg-dark text-white text-center position-relative">
        <div className="container">
          <p className="lead">Copyright &copy; 2024 JobConnect</p>

          <a href="#" className="position-absolute bottom-0 end-0 p-5">
            <i className="bi bi-arrow-up-circle h1"></i>
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Jobs;
