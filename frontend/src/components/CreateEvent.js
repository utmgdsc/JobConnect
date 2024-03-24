import React, { useState, useEffect } from "react";
import EventService from "../services/EventServices";
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../App.css"; // Import the new CSS styles

function CreateEvent() {
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
    const [details, setDetails] = useState({
        targetAudience: "",
        accessibilityOptions: "",
        speakers: "",
        sponsors: "",
    });

    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const data = await EventService.getEventById(id);
                setEvent(data); // Assuming data is the event seeker's information
                const { targetAudience, accessibilityOptions, speakers, sponsors } = data.details;
                setDetails({
                    targetAudience: targetAudience.join("\n"),
                    accessibilityOptions: accessibilityOptions.join("\n"),
                    speakers: speakers.join("\n"),
                    sponsors: sponsors.join("\n"),
                });
            } catch (error) {
                console.error("Failed to fetch event seeker:", error);
                // Handle error (e.g., show an error message)
            }
        };

        if (id) {
            fetchEvent();
        }
    }, [id]);

    function handleChange(e) {
        const { name, value, type, checked } = e.target;
        if (name === "startDate" || name === "endDate") {
            console.log(value)
            console.log(new Date(value).toLocaleDateString())
        }
        if (name === "description") {
            setEvent((prevEvent) => {
                return {
                    ...prevEvent,
                    details: {
                        ...prevEvent.details,
                        description: value,
                    },
                };
            });
        }
        else {
            setEvent((prevEvent) => {
                return {
                    ...prevEvent,
                    [name]: type === "checkbox" ? checked : value
                };
            });
        }
    }

    const handleTextChange = (e) => {
        setDetails({ ...details, [e.target.name]: e.target.value });
    };

    function handleBlur(e) {
        const { name, value } = e.target;
        setEvent(prevEvent => ({
            ...prevEvent,
            details: {
                ...prevEvent.details,
                [name]: details[name].split("\n").map(item => item.trim()),
            },
        }));
    }

    async function handleSubmit(e) {
        e.preventDefault();
        if (event.startDate > event.endDate) {
            toast.error("Start date must be less than end date");
            return;
        }
        try {
            let res = {}
            if (id) {
                await EventService.updateEvent(event._id, event);
            }
            else {
                res = await EventService.createEvent(event);
            }
            navigate(`/event/${id ? id : res._id}`)
                .then(() => {
                    toast.success(`Event successfully ${id ? "updated" : "created"}!`);
                })
                .catch(error => {
                    toast.error(`An error occurred while ${id ? "updating" : "creating"} the event.`);
                });
        } catch (error) {
            console.error("Failed to create event posting:", error);
        };
    }

    useEffect(() => {
        console.log(event);
    }, [event])

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
                    <h4 className="text-right">{id ? "Update Event" : "Create Event"}</h4>
                </div>
                <div className="mb-3">
                    <label className="form-label">Event Name:</label>
                    <input required type="text" name="eventName" value={event.eventName} onChange={handleChange} className="form-control" />
                </div>
                <div className="mb-3">
                    <label className="form-label">Organizer:</label>
                    <input required type="text" name="organizer" value={event.organizer} onChange={handleChange} className="form-control" />
                </div>
                <div className="mb-3">
                    <label className="form-label">Event Type:</label>
                    <select name="eventType" value={event.eventType} onChange={handleChange} className="form-select">
                        <option value="">Select</option>
                        <option value="Workshop">Workshop</option>
                        <option value="Seminar">Seminar</option>
                        <option value="Job Fair">Job Fair</option>
                        <option value="Networking Event">Networking Event</option>
                        <option value="Webinar">Webinar</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label className="form-label">Location:</label>
                    <input required type="text" name="location" value={event.location} onChange={handleChange} className="form-control" />
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <label className="form-label">Start Date:</label>
                        <input required type="text" className="form-control" name="startDate" onFocus={(e) => e.target.type = 'date'} onBlur={(e) => e.target.type = 'text'} onChange={handleChange} />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">End Date:</label>
                        <input required type="text" className="form-control" name="endDate" onFocus={(e) => e.target.type = 'date'} onBlur={(e) => e.target.type = 'text'} onChange={handleChange} />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <label className="form-label">Registration Link:</label>
                        <input name="registrationLink" value={event.registrationLink} onChange={handleChange} className="form-control" />
                    </div>
                    <div className="col-md-6 d-flex align-items-end">
                        <div className="mb-3 form-check">
                            <input type="checkbox" name="registrationRequired" checked={event.registrationRequired} onChange={handleChange} className="form-check-input" />
                            <label className="form-check-label">Registration Required</label>
                        </div>
                    </div>
                </div>
                <div className="mb-3">
                    <label className="form-label">Description:</label>
                    <textarea required name="description" value={event.details.description} onChange={handleChange} className="form-control" />
                </div>
                <div className="row">
                    <div className="mb-3 col-md-3">
                        <label className="form-label">Target Audience:</label>
                        <div className="form-text text-muted">Each item should go on a separate line.</div>
                        <textarea name="targetAudience" value={details.targetAudience} onChange={handleTextChange} onBlur={handleBlur} className="form-control" />
                    </div>
                    <div className="mb-3 col-md-3">
                        <label className="form-label">Accessibility Options:</label>
                        <div className="form-text text-muted">Each item should go on a separate line.</div>
                        <textarea name="accessibilityOptions" value={details.accessibilityOptions} onChange={handleTextChange} onBlur={handleBlur} className="form-control" />
                    </div>
                    <div className="mb-3 col-md-3">
                        <label className="form-label">Speakers:</label>
                        <div className="form-text text-muted">Each item should go on a separate line.</div>
                        <textarea name="speakers" value={details.speakers} onChange={handleTextChange} onBlur={handleBlur} className="form-control" />
                    </div>
                    <div className="mb-3 col-md-3">
                        <label className="form-label">Sponsors:</label>
                        <div className="form-text text-muted">Each item should go on a separate line.</div>
                        <textarea name="sponsors" value={details.sponsors} onChange={handleTextChange} onBlur={handleBlur} className="form-control" />
                    </div>
                </div>
                <button type="submit" className="btn btn-primary">{id ? "Update Event Posting" : "Create Event Posting"}</button>
            </form>
        </section>
    );
}

export default CreateEvent;
