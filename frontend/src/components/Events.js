import React, { useState, useEffect } from "react";
import EventPostingsService from "../services/EventServices";
import "../jobs.css"; // Using the same CSS file for styling consistency
import { useNavigate, Link } from "react-router-dom";

const Events = () => {
  const [eventPostings, setEventPostings] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("All");

  const navigate = useNavigate();

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

  const navigateToDetails = (id) => {
    navigate(`/event/${id}`);
  };

  const filteredEventPostings = eventPostings.filter((event) => {
    return (
      event.eventName.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filter === "All" || event.eventType === filter)
    );
  });

  return (
    <div className="events-page container">
      <div className="search-and-filter mb-3">
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Search events..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <select className="custom-select rounded-dropdown" value={filter} onChange={handleFilterChange}>
              <option value="All">All Types</option>
              <option value="Workshop">Workshop</option>
              <option value="Seminar">Seminar</option>
              <option value="Job Fair">Job Fair</option>
              <option value="Networking Event">Networking Event</option>
              <option value="Webinar">Webinar</option>
          </select>

        </div>
      </div>
      {localStorage.getItem("type") === "employer" &&
        <div className="row">
          <div className="col">
            <Link to="/create/event" className="btn btn-primary mb-3 w-100">
              Create Event
            </Link>
          </div>
        </div>
      }
      <div className="row row-cols-1 row-cols-md-2 g-4">
        {filteredEventPostings.map((event) => (
          <div key={event._id} className="col">
            <div className="card h-100 mb-3">
              <div className="card-header">
                <h3>{event.eventName}</h3>
              </div>
              <div className="card-body">
                <p>Organized by: {event.organizer}</p>
                <p>{event.location}</p>
                <p>Type: {event.eventType}</p>
                <p>Description: {event.details.description}</p>
              </div>
              <div className="card-footer">
                <button className="btn btn-primary" onClick={() => navigateToDetails(event._id)}>
                  Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Events;