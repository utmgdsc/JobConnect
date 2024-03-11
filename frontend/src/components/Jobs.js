import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jobPostingsService from '../services/jobPostingsService';
import '../jobs.css';

const Jobs = () => {
    const [jobPostings, setJobPostings] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState('All'); // Example filter state

    useEffect(() => {
        fetchJobPostings();
    }, []);

    const fetchJobPostings = async () => {
        try {
            const data = await jobPostingsService.getAllJobPostings();
            console.log(data)
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
                        <h3>{posting.jobTitle}</h3>
                        <p>{posting.location}</p>
                        <p>Type: {posting.jobType}</p>
                        {/* Additional job posting details as needed */}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Jobs;
