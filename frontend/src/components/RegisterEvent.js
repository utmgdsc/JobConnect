import React, { useState, useEffect } from "react";
import EventPostingsService from "../services/EventServices";
import jobSeekersService from "../services/jobSeekersService";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../ApplyAsset.css";
const RegisterEvent = () => {
  const { eventId } = useParams();
  const [eventDetails, setEventDetails] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [termsAccepted, setTermsAccepted] = useState(false);

  useEffect(() => {
    fetchEventDetails();
    fetchCurrentUserDetails();
  }, []);

  const fetchEventDetails = async () => {
    try {
      const data = await EventPostingsService.getEventById(eventId);
      setEventDetails(data);
    } catch (error) {
      console.error("Error fetching event details:", error);
    }
  };

  const fetchCurrentUserDetails = async () => {
    try {
      const user = await jobSeekersService.fetchCurrentUser();
      setCurrentUser(user);
    } catch (error) {
      console.error("Error fetching current user details:", error);
    }
  };

  const handleRegister = async () => {
    if (!termsAccepted) {
      toast.error("Please accept the terms to apply for the event");
      return;
    }
    if (!eventDetails || !currentUser) {
      toast.warn("Please ensure event details and user are loaded correctly.");
      return;
    }
    if (eventDetails.registrants && eventDetails.registrants.includes(currentUser._id)) {
      toast.warn("You have already registered for this event.");
      return;
    }
  
    try {
      const updatedEventApplicants = [...eventDetails.registrants, currentUser._id];
      await EventPostingsService.updateEvent(eventId, { registrants: updatedEventApplicants });
      const updatedUserRegistrations = [...currentUser.eventRegistrations, eventId];
      await jobSeekersService.addInfo(currentUser._id, { eventRegistrations: updatedUserRegistrations });
  
      toast.success("Successfully registered for the event", {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } catch (error) {
      console.error("Error registering for the event:", error);
      toast.error("Error during event registration.");
    }
  };
  

  
  
  const handleTermsAcceptance = () => {
    setTermsAccepted(!termsAccepted);
  };

  if (!eventDetails || !currentUser) {
    return <div>Loading...</div>;
  }

  return (
    <div className="apply-asset-container">
      <h2 className="apply-asset-title">Event Details Overview</h2>
      
      {/* Event Details Section */}
      <div className="apply-asset-section">
        <Navbar />
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
        <p><span>Event Name:</span> {eventDetails.eventName}</p>
        <p><span>Organizer:</span> {eventDetails.organizer}</p>
        <p><span>Location:</span> {eventDetails.location}</p>
        <p><span>Type:</span> {eventDetails.eventType}</p>
        {/* Display other event details as needed */}
      </div>
      
      {/* User Confirmation Section */}
      <div className="apply-asset-section">
        <h3>Confirm these details are correct</h3>
        <p><span>Name:</span> {currentUser.personalInformation.name}</p>
        <p><span>Email:</span> {currentUser.personalInformation.contactDetails.email}</p>
        <p><span>Phone:</span> {currentUser.personalInformation.contactDetails.phone}</p>
        <p><span>Date:</span> {eventDetails.eventDate}</p>
        <p><span>Start Time:</span> {eventDetails.startTime}</p>
        <p><span>End Time:</span> {eventDetails.endTime}</p>
        {/* Display other user details as needed */}
      </div>
      
      {/* Action Section */}
      <div className="apply-asset-action">
        <div>
          <input
            type="checkbox"
            id="termsAccepted"
            className="apply-asset-checkbox"
            checked={termsAccepted}
            onChange={handleTermsAcceptance}
          />
          <label htmlFor="termsAccepted">
            I agree to the terms and conditions.
          </label>
        </div>
        <button className="apply-asset-button" onClick={handleRegister}>
          Register for Event
        </button>
      </div>
    </div>
  );
};


export default RegisterEvent;