import React, { useState, useEffect } from "react";
import EmployerService from "../services/EmployerService";
import JobPostingService from "../services/jobPostingsService";
import AssetPostingService from "../services/AssetPostingsService";
import EventService from "../services/EventServices";
import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import apiList from "../lib/apiList";
import "../App.css"; // Import the new CSS styles

function JobDetails() {
    const [employer, setEmployer] = useState({
        company: "",
        email: "",
        password: "",
        description: "",
        category: "",
        website: "",
        phone: "",
        location: "",
        reviews: [
            {
                review: "",
            },
        ],
        jobs: [],
        assets: [],
        events: [],
    });

    const [jobs, setJobs] = useState([]);
    const [assets, setAssets] = useState([]);
    const [events, setEvents] = useState([]);

    const { id } = useParams();
    const navigate = useNavigate();

    const getData = () => {
        axios
            .get(apiList.user, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            })
            .then((response) => {
                setEmployer(response.data);
            })
            .catch((err) => {
                console.log(err.response.data);
            });
    };

    const fetchJob = async () => {
        try {
            employer.jobs.forEach(async (jobId) => {
                const jobData = await JobPostingService.getJobPostingById(jobId);
                setJobs(prevJobs => [...prevJobs, jobData]);
            });
            employer.assets.forEach(async (assetId) => {
                const assetData = await AssetPostingService.getAssetPostingById(assetId);
                setAssets(prevAssets => [...prevAssets, assetData]);
            });
            employer.events.forEach(async (eventId) => {
                const eventData = await EventService.getEventById(eventId);
                setEvents(prevEvents => [...prevEvents, eventData]);
            });
        } catch (error) {
            console.error("Failed to fetch posting details:", error);
            // Handle error (e.g., show an error message)
        }
    };

    useEffect(() => {
        getData()
    }, []);

    if (employer.company !== "") {
        fetchJob();

    }

    const deleteJob = async (jobId) => {
        try {
            await JobPostingService.deleteJobPosting(jobId);
            const newJobs = employer.jobs.filter((job) => job !== jobId);
            await EmployerService.addEmployerInfo(employer._id, { newJobs });
            toast.success("Job deleted successfully");
        } catch (error) {
            console.error("Failed to delete job:", error);
            toast.error("Failed to delete job");
        }
    }


    return (
        <div>
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
            { }

            <section className="container px-4 mt-5">
                <h1>Jobs</h1>
                {
                    jobs.map((job, index) => {
                        return (
                            <section className="container rounded bg-white px-4 mt-3 mb-5 border border-1">
                                <div className="row col-md-12 d-flex">
                                    <div className="mb-3 px-4 pt-4">
                                        <div className="d-flex justify-content-between align-items-center mb-1">
                                            <h3 className="text-right">{job.jobTitle}</h3>
                                        </div>
                                        <div className="d-flex">
                                            {job.company &&
                                                <h5>{job.company}</h5>
                                            }
                                            {job.location &&
                                                <h5 className="ms-auto">{job.location}</h5>
                                            }
                                        </div>
                                        <h6>{job.jobType}</h6>
                                        <h6>${job.salary}</h6>
                                    </div>
                                    <a
                                        className="btn btn-primary rounded-circle p-2 mx-3 w-25 ms-auto"
                                        onClick={() => navigate(`/create/job/${job._id}`)}
                                    >
                                        <i class="bi bi-pencil"></i>
                                    </a>
                                    <a
                                        className="btn btn-danger rounded-circle p-2 mx-3 w-25"
                                        onClick={() => deleteJob(job._id)}
                                    >
                                        <i class="bi bi-x-circle-fill"></i>
                                    </a>
                                </div>
                            </section>
                        );
                    })
                }
            </section>
        </div>
    )
};

export default JobDetails;
