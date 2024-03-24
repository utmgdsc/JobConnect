import React, { useState, useEffect } from "react";
import JobPostingsService from "../services/jobPostingsService";
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../App.css"; // Import the new CSS styles
import jobPostingsService from "../services/jobPostingsService";

function CreateJobPosting() {
    const [jobPosting, setJobPosting] = useState({
        company: "",
        jobTitle: "",
        location: "",
        jobType: "",
        noDegreeMentioned: false,
        details: {
            description: "",
            responsibilities: [],
            requirements: [],
            benefits: [],
        },
        applicants: [],
    });
    const [details, setDetails] = useState({
        responsibilities: "",
        requirements: "",
        benefits: "",
    });

    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchJobPosting = async () => {
            try {
                const data = await jobPostingsService.getJobPostingById(id);
                setJobPosting(data); // Assuming data is the job seeker's information
                const { responsibilities, requirements, benefits } = data.details;
                setDetails({
                    responsibilities: responsibilities.join("\n"),
                    requirements: requirements.join("\n"),
                    benefits: benefits.join("\n"),
                });
            } catch (error) {
                console.error("Failed to fetch job seeker:", error);
                // Handle error (e.g., show an error message)
            }
        };

        if (id) {
            fetchJobPosting();
        }
    }, [id]);

    function handleChange(event) {
        const { name, value } = event.target;
        if (name === "description") {
            setJobPosting((prevJobPosting) => {
                return {
                    ...prevJobPosting,
                    details: {
                        ...prevJobPosting.details,
                        description: value,
                    },
                };
            });
        }
        else {
            setJobPosting((prevJobPosting) => {
                return {
                    ...prevJobPosting,
                    [name]: value,
                };
            });
        }
    }

    const handleTextChange = (e) => {
        setDetails({ ...details, [e.target.name]: e.target.value });
    };

    function handleBlur(event) {
        const { name, value } = event.target;
        setJobPosting(prevJobPosting => ({
            ...prevJobPosting,
            details: {
                ...prevJobPosting.details,
                [name]: details[name].split("\n").map(item => item.trim()),
            },
        }));
    }

    async function handleSubmit(event) {
        event.preventDefault();
        try {
            let res = {}
            if (id) {
                await jobPostingsService.updateJobPosting(jobPosting._id, jobPosting);
            }
            else {
                res = await JobPostingsService.createJobPosting(jobPosting);
            }
            navigate(`/job/${id ? id : res._id}`)
                .then(() => {
                    toast.success(`Job successfully ${id ? "updated" : "created"}!`);
                })
                .catch(error => {
                    toast.error(`An error occurred while ${id ? "updating" : "creating"} the job.`);
                });
        } catch (error) {
            console.error("Failed to create job posting:", error);
        }
    }

    return (
        <section className="container rounded bg-white p-4 mt-5 mb-5 border border-1">
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
            <form onSubmit={handleSubmit} className="form">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h4 className="text-right">{id ? "Update Job" : "Create Job"}</h4>
                </div>
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
                <div className="mb-3 form-check">
                    <input type="checkbox" name="noDegreeMentioned" checked={jobPosting.noDegreeMentioned} onChange={handleChange} className="form-check-input" />
                    <label className="form-check-label">No Degree Mentioned</label>
                </div>
                <div className="mb-3">
                    <label className="form-label">Description:</label>
                    <textarea name="description" value={jobPosting.details.description} onChange={handleChange} className="form-control" />
                </div>
                <div className="mb-3">
                    <label className="form-label">Responsibilities:</label>
                    <div className="form-text text-muted">Each item should go on a separate line.</div>
                    <textarea name="responsibilities" value={details.responsibilities} onChange={handleTextChange} onBlur={handleBlur} className="form-control" />
                </div>
                <div className="mb-3">
                    <label className="form-label">Requirements:</label>
                    <div className="form-text text-muted">Each item should go on a separate line.</div>
                    <textarea name="requirements" value={details.requirements} onChange={handleTextChange} onBlur={handleBlur} className="form-control" />
                </div>
                <div className="mb-3">
                    <label className="form-label">Benefits:</label>
                    <div className="form-text text-muted">Each item should go on a separate line.</div>
                    <textarea name="benefits" value={details.benefits} onChange={handleTextChange} onBlur={handleBlur} className="form-control" />
                </div>
                <button type="submit" className="btn btn-primary">{id ? "Update Job Posting" : "Create Job Posting"}</button>
            </form>
        </section>
    );
}

export default CreateJobPosting;
