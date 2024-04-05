import React, { useState, useEffect } from "react";
import EmployerService from "../services/EmployerService";
import JobPostingService from "../services/jobPostingsService";
import AssetPostingService from "../services/AssetPostingsService";
import EventService from "../services/EventServices";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
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
                rating: 0,
                review: "",
            },
        ],
        jobs: [],
        assets: [],
        events: [],
    });

    const [jobs, setJobs] = useState([{
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
    }]);

    const [assets, setAssets] = useState([{
        owner: "",
        title: "",
        assetType: "",
        location: "",
        availability: "Available",
        details: {
            description: "",
        },
        price: 0,
        benefits: [],
    }]);

    const [events, setEvents] = useState([{
        eventName: "",
        organizer: "",
        location: "",
        eventType: "",
        startDate: "",
        endDate: "",
        details: {
            description: "",
            targetAudience: [],
            accessibilityOptions: [],
            speakers: [],
            sponsors: [],
        },
        registrationRequired: false,
        registrationLink: "",
    }]);

    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const getData = () => {
            axios
                .get(apiList.user, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                })
                .then((response) => {
                    navigate(`/manage-postings/${response.data._id}`);
                })
                .catch((err) => {
                    console.log(err.response.data);
                });
        };

        getData()

        const fetchJob = async () => {
            try {
                const jobData = await JobPostingService.getJobPostingById(id);
                setJobs(jobData);
                const assetData = await AssetPostingService.getAssetPostingById(id);
                setAssets(assetData);
                const eventData = await EventService.getEvent(id);
                setEvents(eventData);
            } catch (error) {
                console.error("Failed to fetch posting details:", error);
                // Handle error (e.g., show an error message)
            }
        };

        if (id) {
            fetchJob();
        }
    }, [id]);

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
            <section className="container rounded bg-white px-4 mt-5 mb-5 border border-1">
                <div className="row col-md-12">
                    <div className="mb-3 px-4 pt-4">
                        <div className="d-flex justify-content-between align-items-center mb-1">
                            <h1 className="text-right">{jobs.jobTitle}</h1>
                        </div>
                        <div className="d-flex">
                            {jobs.company &&
                                <h3>{jobs.company}</h3>
                            }
                            {jobs.location &&
                                <h5 className="ms-auto">{jobs.location}</h5>
                            }
                        </div>
                        <h5>{jobs.jobType}</h5>
                        {jobs.salary && jobs.salary > 0 &&
                            <h5>${jobs.salary}</h5>
                        }
                    </div>
                </div>
            </section>
        </div>
    );
}

export default JobDetails;
