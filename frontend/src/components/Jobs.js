import React, { useState, useEffect } from 'react';
import jobPostingsService from '../services/jobPostingsService';
import '../jobs.css';
import { useNavigate } from 'react-router-dom';

const Jobs = () => {
    const [jobPostings, setJobPostings] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState('All');
    const [expandedJobId, setExpandedJobId] = useState(null); // State to track which job is expanded

    const navigate = useNavigate();

    const navigateToApplication = () => {
        navigate('/application');
    }

    useEffect(() => {
        fetchJobPostings();
    }, []);

    const fetchJobPostings = async () => {
        try {
            const data = await jobPostingsService.getAllJobPostings();
            setJobPostings(data);
        } catch (error) {
            console.error('Error fetching job postings:', error);
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

    const filteredJobPostings = jobPostings.filter(posting => {
        return posting.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) && (filter === 'All' || posting.jobType === filter);
    });

    return (
        <div className="jobs-page">
            <h1>Job Postings</h1>
            <input type="text" placeholder="Search jobs..." value={searchTerm} onChange={handleSearchChange} />
            <select value={filter} onChange={handleFilterChange}>
                <option value="All">All Types</option>
                <option value="Full-Time">Full-Time</option>
                <option value="Part-Time">Part-Time</option>
                <option value="Contract">Contract</option>
                <option value="Temporary">Temporary</option>
                <option value="Internship">Internship</option>
            </select>
            <div className="job-listings">
                {filteredJobPostings.map(posting => (
                    <div key={posting._id} className="job-posting">
                        <div className="job-title-container" onClick={() => toggleExpandJob(posting._id)}>
                            <h3>{posting.jobTitle}</h3>
                            <span className={`arrow-icon ${expandedJobId === posting._id ? 'expanded' : ''}`}>&#9660;</span> {/* Unicode downward arrow */}
                        </div>
                        <p>Posted by: {posting.company.name}</p>
                        <p>{posting.location}</p>
                        <p>Type: {posting.jobType}</p>
                        {expandedJobId === posting._id && (
                            <div className="job-details">
                                {/* Render expanded job details here */}
                                <p>Description: {posting.details.description}</p>
                                <p>Responsibilities:</p>
                                <ul>
                                    {posting.details.responsibilities.map((item, index) => (
                                        <li key={index}>{item}</li>
                                    ))}
                                </ul>
                                <p>Requirements:</p>
                                <ul>
                                    {posting.details.requirements.map((item, index) => (
                                        <li key={index}>{item}</li>
                                    ))}
                                </ul>
                                <button className="apply-button" onClick={navigateToApplication}>Apply Now</button>
                                {/* Add more details as needed */}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Jobs;
