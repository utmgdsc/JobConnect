import React, { useState, useEffect } from "react";
import EmployerService from "../services/EmployerService";
import JobPostingService from "../services/jobPostingsService";
import AssetPostingService from "../services/AssetPostingsService";
import EventService from "../services/EventServices";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import apiList from "../lib/apiList";
import "../App.css"; // Import the new CSS styles 

function ManagePostings() {
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
                console.log(err.response?.data);
            });
    };

    const fetchJobs = async () => {
        try {
            employer.jobs.forEach(async (jobId) => {
                const jobData = await JobPostingService.getJobPostingById(jobId);
                setJobs(prevJobs => [...prevJobs, jobData])
            });
        } catch (error) {
            console.error("Failed to fetch posting details:", error);
            // Handle error (e.g., show an error message)
        }
    };

    const fetchAssets = async () => {
        try {
            employer.assets.forEach(async (assetId) => {
                const assetData = await AssetPostingService.getAssetPostingById(assetId);
                setAssets(prevAssets => [...prevAssets, assetData])
            });
        } catch (error) {
            console.error("Failed to fetch posting details:", error);
            // Handle error (e.g., show an error message)
        }
    };

    const fetchEvents = async () => {
        try {
            employer.events.forEach(async (eventId) => {
                const eventData = await EventService.getEventById(eventId);
                setEvents(prevEvents => [...prevEvents, eventData])
            });
        } catch (error) {
            console.error("Failed to fetch posting details:", error);
            // Handle error (e.g., show an error message)
        }
    };

    useEffect(() => {
        getData()
    }, []);

    useEffect(() => {
        if (jobs.length === 0) {
            fetchJobs();
        }
        if (assets.length === 0) {
            fetchAssets();
        }
        if (events.length === 0) {
            fetchEvents();
        }
    }, [employer]);

    useEffect(() => {
        if (jobs.length > employer.jobs.length) {
            setJobs([]);
            fetchJobs();
        }
        if (assets.length > employer.assets.length) {
            setAssets([]);
            fetchAssets();
        }
        if (events.length > employer.events.length) {
            setEvents([]);
            fetchEvents();
        }
    }, [jobs, assets, events]);

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
    const deleteAsset = async (assetId) => {
        try {
            await AssetPostingService.deleteAssetPosting(assetId);
            const newAssets = employer.assets.filter((asset) => asset !== assetId);
            await EmployerService.addEmployerInfo(employer._id, { newAssets });
            toast.success("Asset deleted successfully");
        } catch (error) {
            console.error("Failed to delete asset:", error);
            toast.error("Failed to delete asset");
        }
    }
    const deleteEvent = async (eventId) => {
        try {
            await EventService.deleteEvent(eventId);
            const newEvents = employer.events.filter((event) => event !== eventId);
            await EmployerService.addEmployerInfo(employer._id, { newEvents });
            toast.success("Event deleted successfully");
        } catch (error) {
            console.error("Failed to delete event:", error);
            toast.error("Failed to delete event");
        }
    }

    function Postings(type, id) {
        return (
            <div className="d-flex justify-content-around align-items-center">
                <a
                    className="btn btn-secondary p-2 mx-3 w-25"
                    onClick={() => navigate(`/`)}
                >
                    Applicants <i className="bi bi-person-fill"></i>
                </a>
                <a
                    className="btn btn-primary p-2 mx-3 w-25"
                    onClick={() => navigate(`/create/${type}/${id}`)}
                >
                    Edit <i className="bi bi-pencil"></i>
                </a>
                <a
                    className="btn btn-danger p-2 mx-3 w-25"
                    onClick={() => {
                        if (type === "job") {
                            deleteJob(id);
                        } else if (type === "asset") {
                            deleteAsset(id);
                        } else if (type === "event") {
                            deleteEvent(id);
                        }
                    }}
                >
                    Delete <i className="bi bi-x-circle-fill"></i>
                </a>
            </div>
        )
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
                <div className="d-flex">
                    <h1>Jobs</h1>
                    <button className="btn btn-primary mb-3 ms-auto" onClick={() => navigate(`/create/job`)}>
                        Add new job
                    </button>
                </div>
                {jobs.length == 0 &&
                    <h4 className="d-flex justify-content-center">No jobs found</h4>
                }
                {
                    jobs.map((job, index) => {
                        return (
                            <section className="container rounded bg-white px-4 mt-3 mb-5 border border-1" key={index}>
                                <div className="row col-md-12 pb-3">
                                    <div className="mb-3 px-4 pt-4" onClick={() => navigate(`/job/${job._id}`)}>
                                        <div className="d-flex justify-content-between align-items-center mb-1">
                                            <h4 className="text-right">{job.jobTitle}</h4>
                                        </div>
                                        <div className="d-flex">
                                            {job.company &&
                                                <h5>{job.company}</h5>
                                            }
                                            {job.location &&
                                                <h5 className="ms-auto">{job.location}</h5>
                                            }
                                        </div>
                                        <div className="d-flex">
                                            {job.jobType &&
                                                <h6>{job.jobType}</h6>
                                            }
                                            {job.salary &&
                                                <h6 className="ms-auto">${job.salary}</h6>
                                            }
                                        </div>
                                    </div>
                                    {Postings("job", job._id)}
                                </div>
                            </section>
                        );
                    })
                }

                <div className="d-flex">
                    <h1>Assets</h1>
                    <button className="btn btn-primary mb-3 ms-auto" onClick={() => navigate(`/create/asset`)}>
                        Add new asset
                    </button>
                </div>
                {assets.length == 0 &&
                    <h4 className="d-flex justify-content-center">No assets found</h4>
                }
                {
                    assets.map((asset, index) => {
                        return (
                            <section className="container rounded bg-white px-4 mt-3 mb-5 border border-1" key={index}>
                                <div className="row col-md-12 d-flex pb-3">
                                    <div className="mb-3 px-4 pt-4" onClick={() => navigate(`/asset/${asset._id}`)}>
                                        <div className="d-flex justify-content-between align-items-center mb-1">
                                            <h4 className="text-right">{asset.title}</h4>
                                        </div>
                                        <div className="d-flex">
                                            {asset.owner &&
                                                <h5>{asset.owner}</h5>
                                            }
                                            {asset.location &&
                                                <h5 className="ms-auto">{asset.location}</h5>
                                            }
                                        </div>
                                        <div className="d-flex">
                                            <h5>{asset.assetType}</h5>
                                            {asset.condition && <h5 className="ms-auto">{asset.condition}</h5>}
                                        </div>
                                        {asset.price && asset.price > 0 &&
                                            <h5>${asset.price}</h5>
                                        }
                                    </div>
                                    {Postings("asset", asset._id)}
                                </div>
                            </section>
                        );
                    })
                }

                <div className="d-flex">
                    <h1>Events</h1>
                    <button className="btn btn-primary mb-3 ms-auto" onClick={() => navigate(`/create/event`)}>
                        Add new event
                    </button>
                </div>
                {events.length == 0 &&
                    <h4 className="d-flex justify-content-center">No events found</h4>
                }
                {
                    events.map((event, index) => {
                        return (
                            <section className="container rounded bg-white px-4 mt-3 mb-5 border border-1" key={index}>
                                <div className="row col-md-12 d-flex pb-3">
                                    <div className="mb-3 px-4 pt-4" onClick={() => navigate(`/event/${event._id}`)}>
                                        <div className="d-flex justify-content-between align-items-center mb-1">
                                            <h4 className="text-right">{event.eventName}</h4>
                                        </div>
                                        <div className="d-flex">
                                            {event.organizer &&
                                                <h5>{event.organizer}</h5>
                                            }
                                            {event.location &&
                                                <h5 className="ms-auto">{event.location}</h5>
                                            }
                                        </div>
                                        <div className="d-flex">
                                            <h5>{event.eventType}</h5>
                                            <h5 className="ms-auto">{new Date(event.startDate).toLocaleDateString()} - {new Date(event.endDate).toLocaleDateString()}</h5>
                                        </div>
                                    </div>
                                    {Postings("event", event._id)}
                                </div>
                            </section>
                        );
                    })
                }
            </section>
        </div>
    )
};

export default ManagePostings;
