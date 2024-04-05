import React, { useState, useEffect } from "react";
import EventPostingsService from "../services/EventServices";
import { useNavigate } from "react-router-dom";

const Events = () => {
  const [eventPostings, setEventPostings] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("All");
  const [expandedEventId, setExpandedEventId] = useState(null); // State to track which event is expanded

  const navigate = useNavigate();

  const navigateToDetails = (id) => {
    navigate(`/event/${id}`);
  };

  useEffect(() => {
    fetchEventPostings();
  }, []);

  const fetchEventPostings = async () => {
    try {
      const data = await EventPostingsService.getAllEvents();
      setEventPostings(data);
    } catch (error) {
      console.error("Error fetching event postings:", error);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const toggleExpandEvent = (id) => {
    setExpandedEventId(expandedEventId === id ? null : id);
  };

  const navigateToRegistration = (eventId) => {
    navigate(`/register-event/${eventId}`);
  };

  const filteredEventPostings = eventPostings.filter((event) => {
    return (
      event.eventName.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filter === "All" || event.eventType === filter)
    );
  });

  return (
    <div className="events-page container p-5">
      <h1>Event Postings</h1>
      <input
        type="text"
        placeholder="Search events..."
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <select value={filter} onChange={handleFilterChange}>
        <option value="All">All Types</option>
        <option value="Workshop">Workshop</option>
        <option value="Seminar">Seminar</option>
        <option value="Job Fair">Job Fair</option>
        <option value="Networking Event">Networking Event</option>
        <option value="Webinar">Webinar</option>
      </select>
      <div className="event-listings">
        {filteredEventPostings.map((event) => (
          <div key={event._id} className="event-posting">
            <div
              className="event-title-container"
              onClick={() => toggleExpandEvent(event._id)}
            >
              <h3>{event.eventName}</h3>
              <span
                className={`arrow-icon ${expandedEventId === event._id ? "expanded" : ""}`}
              >
                &#9660;
              </span>
            </div>
            <p>Organized by: {event.organizer}</p>
            <p>{event.location}</p>
            <p>Type: {event.eventType}</p>
            {expandedEventId === event._id && (
              <div className="event-details">
                <p>Description: {event.details.description}</p>
                {event.registrationRequired && (
                  <button
                    className="register-button"
                    onClick={() =>
                      navigateToRegistration(event._id)
                    }
                  >
                    Register
                  </button>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Events;
