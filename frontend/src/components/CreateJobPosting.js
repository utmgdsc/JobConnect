import React, { useState, useEffect } from "react";
import JobPostingsService from "../services/jobPostingsService";
import { toast } from "react-toastify";
import "../App.css"; // Import the new CSS styles

function CreateJobPosting() {
    const [jobPosting, setJobPosting] = useState({
        details: {}
    });

    function handleChange(event) {
        const { name, value, type, checked } = event.target;
        setJobPosting((prevemployer) => {
            return {
                ...prevemployer,
                [name]: type === "checkbox" ? checked : value,
            };
        });
    }

    function handleArrayChange(event, field) {
        const { name, value } = event.target;
        setJobPosting(prevJobPosting => ({
            ...prevJobPosting,
            details: {
                ...prevJobPosting.details,
                [name]: [...prevJobPosting.details[name], value],
            },
        }));
    }

    useEffect(() => {
        console.log(jobPosting);
    }, [jobPosting]);

    async function handleSubmit(event) {
        event.preventDefault();
        try {
            JobPostingsService.createJobPosting(jobPosting)
                .then(() => {
                    toast.success("Job successfully created!");
                })
                .catch(error => {
                    toast.error(`An error occurred while creating the job. ${error}`);
                });
        } catch (error) {
            console.error("Failed to create job posting:", error);
        }
    }

    return (
        <header>
            <form onSubmit={handleSubmit} className="container mt-5">
                <div className="mb-3">
                    <label className="form-label">Company:</label>
                    <input type="text" name="company" value={jobPosting.company} onChange={handleChange} className="form-control" />
                </div>
                <div className="mb-3">
                    <label className="form-label">Job Title:</label>
                    <input type="text" name="jobTitle" value={jobPosting.jobTitle} onChange={handleChange} className="form-control" />
                </div>
                <div className="mb-3">
                    <label className="form-label">Location:</label>
                    <input type="text" name="location" value={jobPosting.location} onChange={handleChange} className="form-control" />
                </div>
                <div className="mb-3">
                    <label className="form-label">Job Type:</label>
                    <select name="jobType" value={jobPosting.jobType} onChange={handleChange} className="form-select">
                        <option value="">Select</option>
                        <option value="Full-Time">Full-Time</option>
                        <option value="Part-Time">Part-Time</option>
                        <option value="Contract">Contract</option>
                        <option value="Temporary">Temporary</option>
                        <option value="Internship">Internship</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label className="form-label">Description:</label>
                    <textarea name="description" value={jobPosting.details.description} onChange={handleChange} className="form-control" />
                </div>
                <div className="mb-3">
                    <label className="form-label">Responsibilities:</label>
                    <textarea name="responsibilities" value={jobPosting.details.responsibilities} onChange={(e) => handleArrayChange(e, 'responsibilities')} className="form-control" />
                </div>
                <div className="mb-3">
                    <label className="form-label">Requirements:</label>
                    <textarea name="requirements" value={jobPosting.details.requirements} onChange={(e) => handleArrayChange(e, 'requirements')} className="form-control" />
                </div>
                <div className="mb-3 form-check">
                    <input type="checkbox" name="noDegreeMentioned" checked={jobPosting.noDegreeMentioned} onChange={handleChange} className="form-check-input" />
                    <label className="form-check-label">No Degree Mentioned</label>
                </div>
                <div className="mb-3">
                    <label className="form-label">Benefits:</label>
                    <textarea name="benefits" value={jobPosting.details.benefits} onChange={(e) => handleArrayChange(e, 'benefits')} className="form-control" />
                </div>
                <button type="submit" className="btn btn-primary">Create Job Posting</button>
            </form>
        </header>
    );
}

export default CreateJobPosting;
