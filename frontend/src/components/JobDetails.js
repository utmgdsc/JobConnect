import React, { useState, useEffect } from "react";
import JobPostingService from "../services/jobPostingsService";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../App.css"; // Import the new CSS styles

function JobDetails() {
    const [job, setJob] = useState({
        company: "",
        jobTitle: "",
        location: "",
        jobType: "",
        noDegreeMentioned: false,
        salary: 0,
        details: {
            description: "",
            responsibilities: [],
            requirements: [],
            benefits: [],
        },
    });

    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchJob = async () => {
            try {
                const data = await JobPostingService.getJobPostingById(id);
                setJob(data); // Assuming data is the job seeker's information
            } catch (error) {
                console.error("Failed to fetch job details:", error);
                // Handle error (e.g., show an error message)
            }
        };

        if (id) {
            fetchJob();
        }
    }, [id]);

    return (
        <div className="container rounded bg-white px-4 mt-5 mb-5 border border-1">
            <div className="row col-md-12">
                <div className="mb-3 px-4 pt-4">
                    <div className="d-flex justify-content-between align-items-center mb-1">
                        <h1 className="text-right">{job.jobTitle}</h1>
                    </div>
                    <div className="d-flex">
                        {job.company &&
                            <h3>{job.company}</h3>
                        }
                        {job.location &&
                            <h5 className="ms-auto">{job.location}</h5>
                        }
                    </div>
                    <h5>{job.jobType}</h5>
                    {job.salary &&
                        <h5>${job.salary}</h5>
                    }
                </div>
                <div className="mb-1 px-4">
                    <h4>Description</h4>
                    <p>{job.details.description}</p>
                </div>
                {job.details?.responsibilities.length > 0 && (
                    <div className="mb-1 px-4">
                        <h4>Responsibilities:</h4>
                        <ul className="mb-3">
                            {job.details?.responsibilities.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                    </div>
                )}
                {job.details?.requirements.length > 0 && (
                    <div className="mb-1 px-4">
                        <h4>Requirements:</h4>
                        <ul className="mb-3">
                            {job.details?.requirements.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                    </div>
                )}
                {job.details?.benefits.length > 0 && (
                    <div className="mb-1 px-4">
                        <h4>Benefits:</h4>
                        <ul className="mb-3">
                            {job.details?.benefits.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                    </div>
                )}
                <div className="px-4">
                    <button
                        className="btn btn-primary btn-md"
                        onClick={() => navigate(`/application/${id}`)}
                    >
                        Apply Now
                    </button>
                </div>
            </div>
        </div>
    );
}

export default JobDetails;
