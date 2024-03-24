import React, { useState, useEffect } from "react";
import JobPostingService from "../services/jobPostingsService";
import AssetPostingService from "../services/AssetPostingsService";
import EventService from "../services/EventServices";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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

    const [asset, setAsset] = useState({
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
    });

    const [event, setEvent] = useState({
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
    });

    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchJob = async () => {
            try {
                const job = await JobPostingService.getJobPostingById(id);
                setJob(job);
                const asset = await AssetPostingService.getAssetPostingById(id);
                setAsset(asset);
                const event = await EventService.getEvent(id);
                setEvent(event);
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
                        {job.salary && job.salary > 0 &&
                            <h5>${job.salary}</h5>
                        }
                    </div>
                </div>
            </section>
        </div>
    );
}

export default JobDetails;
