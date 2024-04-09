import React, { useState, useEffect } from "react";
import EventService from "../services/EventServices";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../App.css"; // Import the new CSS styles

function EventDetails() {
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

    const navigateToRegistration = (registrationLink) => {
        navigate("/application");
    };

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const data = await EventService.getEventById(id);
                setEvent(data); // Assuming data is the event seeker's information
            } catch (error) {
                console.error("Failed to fetch event details:", error);
                // Handle error (e.g., show an error message)
            }
        };

        if (id) {
            fetchEvent();
        }
    }, [id]);

    return (
        <div className="container rounded bg-white px-4 mt-5 mb-5 border border-1">
            <div className="row col-md-12">
                <div className="mb-3 px-4 pt-4">
                    <div className="d-flex justify-content-between align-items-center mb-1">
                        <h1 className="text-right">{event.eventName}</h1>
                    </div>
                    <div className="d-flex">
                        {event.organizer &&
                            <h3>{event.organizer}</h3>
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
                <div className="mb-1 px-4">
                    <h4>Description</h4>
                    <p>{event.details.description}</p>
                </div>
                {event.details?.targetAudience.length > 0 && (
                    <div className="mb-1 px-4">
                        <h4>Audience:</h4>
                        <ul className="mb-3">
                            {event.details?.targetAudience.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                    </div>
                )}
                {event.details?.accessibilityOptions.length > 0 && (
                    <div className="mb-1 px-4">
                        <h4>Accessibility Options:</h4>
                        <ul className="mb-3">
                            {event.details?.accessibilityOptions.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                    </div>
                )}
                {event.details?.speakers.length > 0 && (
                    <div className="mb-1 px-4">
                        <h4>Speakers:</h4>
                        <ul className="mb-3">
                            {event.details?.speakers.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                    </div>
                )}
                {event.details?.sponsors.length > 0 && (
                    <div className="mb-1 px-4">
                        <h4>Sponsors:</h4>
                        <ul className="mb-3">
                            {event.details?.sponsors.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                    </div>
                )}
                <div className="px-4">
                    <button
                        className="btn btn-primary btn-md"
                        onClick={() => navigateToRegistration(event.registrationLink)}
                    >
                        Register
                    </button>
                </div>
            </div>
        </div>
    );
}

export default EventDetails;
