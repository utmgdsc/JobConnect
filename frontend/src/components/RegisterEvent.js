import React, { useState, useEffect } from "react";
import EventPostingsService from "../services/EventServices";
import jobSeekersService from "../services/jobSeekersService";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
    if (termsAccepted && eventDetails && currentUser) {
      try {
        const updatedEventApplicants = [...eventDetails.applicants, currentUser._id];
        await EventPostingsService.updateEvent(eventId, { applicants: updatedEventApplicants });
        const updatedUserRegistrations = [...currentUser.eventRegistrations];
        updatedUserRegistrations.push(eventDetails._id); // Assuming eventDetails has _id field
        await jobSeekersService.addInfo(currentUser._id, { eventRegistrations: updatedUserRegistrations });

        toast.success("Application Submitted", {
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });         } catch (error) {
        console.error("Error registering for the event:", error);
      }
    } else {
      toast.error("Please accept the terms to apply for the job", {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
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
