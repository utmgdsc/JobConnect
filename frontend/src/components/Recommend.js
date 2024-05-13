import React, { useState, useEffect } from "react";
import jobPostingsService from "../services/jobPostingsService";
import "../jobs.css";
import { useNavigate, Link } from "react-router-dom";
import toronto from "../images/toronto.jpg";


const Recommend = () => {
  const [jobPostings, setJobPostings] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("All");
  const [selectedJobId, setSelectedJobId] = useState(null); // State to track the selected job
  const [selectedJob, setSelectedJob] = useState(null); // State to store the selected job details
  const [locationInput, setLocationInput] = useState("");
  const [locationSuggestions, setLocationSuggestions] = useState([]);
  // Assuming you have a list of all possible locations
  const [allLocations, setAllLocations] = useState([]);
  const [postalCode, setPostalCode] = useState("");
  const [cityFromPostalCode, setCityFromPostalCode] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    fetchJobPostings();
  }, []);

  const fetchJobPostings = async () => {
    try {
      const data = await jobPostingsService.recommendJobPosting();
      setJobPostings(data);
    } catch (error) {
      console.error("Error fetching job postings:", error);
    }
  };
  // const fetchJobPostings = async () => {
  //   try {
  //     const data = await fetch('http://localhost:5000/recommend', {
  //       method: 'GET', // or 'POST', 'PUT', 'DELETE', etc.
  //       headers: {
  //         'Content-Type': 'application/json',
  //         // You can add any additional headers if required
  //       },
  //       // You can include a request body for POST or PUT requests
  //       // body: JSON.stringify({ key: 'value' })
  //     })

  //     console.log(data)
    
  //     setJobPostings(data);
  //   } catch (error) {
  //     console.error("Error fetching job postings:", error);
  //   }
  // };

  

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
    const titleMatch = posting.jobTitle.toLowerCase().includes(searchTerm.toLowerCase());
    const keywordMatch = posting.keywords && posting.keywords.some(keyword =>
      keyword.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const locationMatch = posting.location.toLowerCase().includes(locationInput.toLowerCase());
    const typeMatch = (filter === "All" || posting.jobType === filter);

    return (titleMatch || keywordMatch) && locationMatch && typeMatch;
  });

  const handlePostalCodeChange = async (e) => {
    const code = e.target.value;
    setPostalCode(code);
    let city = ""
    if (code.length === 5 && /^\d+$/.test(code)) {
      city = await convertPostalCodeToCity(code);
    }
    else if (code.length >= 3 && !/^\d+$/.test(code)) {
      city = await convertPostalCodeToCity(code.substring(0, 3));
    }
    if (city === null) {
      return null;
    }
    else if (city.includes("(")) {
      const trimcity = city.split(" (")[0];
      setCityFromPostalCode(trimcity);
      setLocationInput(trimcity);
    } else {
      setCityFromPostalCode(city);
      setLocationInput(city);
    }
  };

  const convertPostalCodeToCity = async (postalCode) => {
    let url = "";

    if (postalCode.length === 5) {
      // us postal code
      url = `https://api.zippopotam.us/US/${postalCode}`;
    } else if (postalCode.length === 3) {
      // canada postal code
      url = `https://api.zippopotam.us/CA/${postalCode}`;
    }
    try {
      const response = await fetch(url);
      const data = await response.json();
      let cityName = data.places[0]["place name"];

      const normalizedCityName = cityName.replace(/\b(North|South|East|West|Northeast|Northwest|Southeast|Southwest)\b/gi, '').trim();
      return normalizedCityName;
    } catch (error) {
      console.error("Error fetching city from postal code:", error);
      return null;
    }
  };


  return (
    <div>
    <h1
      style={{
        textAlign: "center",
        color: "#4b5563",
        fontWeight: "bold",
        marginTop: "20px", // Adjust the value to increase or decrease the space
      }}
    >
      Recommended Jobs for you
    </h1>
    <div className="jobs-container">
      <div className="container">
        <div className="search-and-filter mb-3">
          <div className="input-group">
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
            <div className="input-group-append">
            </div>
          </div>
          <div className="postal-code-input">

            {cityFromPostalCode && <p>Jobs in {cityFromPostalCode}</p>}
          </div>
        </div>
        {localStorage.getItem("type") === "employer" &&
          <div className="row">
            <div className="col">
              <Link to="/create/job" className="btn btn-primary mb-3 w-100">
                Create job
              </Link>
            </div>
          </div>
        }
        <div className="row">
          <div className="col">
            {filteredJobPostings.map((posting) => (
              <div
                key={posting._id}
                className={`job-posting ${selectedJobId === posting._id ? "selected" : ""}`}
                onClick={() => selectJob(posting)}
              >
                <h3>{posting.jobTitle}</h3>
                <p>Posted by: <a href={`/employer-dashboard/${posting.employer}`}>{posting.company}</a></p>
                <p>{posting.location}</p>
                <p>Type: {posting.jobType}</p>
              </div>
            ))}
          </div>
          {selectedJobId && (
            <div className="col">
              {/* <img src={toronto} className="img-fluid" />{" "} */}
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
              <br />
              <p>Tags: {selectedJob.keywords.join(", ")}</p>
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
    </div>
    
  );
};

export default Recommend;
