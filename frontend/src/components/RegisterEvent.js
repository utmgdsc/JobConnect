import React, { useState, useEffect } from "react";
import EventPostingsService from "../services/EventServices";
import jobSeekersService from "../services/jobSeekersService";
import { useParams } from "react-router-dom";

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
    if (termsAccepted) {
      try {
        // Update event details
        const updatedEventApplicants = [...eventDetails.applicants, currentUser._id];
        await EventPostingsService.updateEvents(eventId, { applicants: updatedEventApplicants });
  
        // Update user's event registration
        const updatedUserRegistrations = [...currentUser.eventRegistrations];
        updatedUserRegistrations.push(eventId);
        await jobSeekersService.addInfo(currentUser._id, { eventRegistrations: updatedUserRegistrations });
  
        console.log("Successfully registered for the event!");
      } catch (error) {
        console.error("Error registering for the event:", error);
      }
    } else {
      alert("Please accept the terms to register for the event.");
    }
  };
  
  const handleTermsAcceptance = () => {
    setTermsAccepted(!termsAccepted);
  };

  if (!eventDetails || !currentUser) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Event Details Overview</h2>
      <p>Event Name: {eventDetails.eventName}</p>
      <p>Organizer: {eventDetails.organizer}</p>
      <p>Location: {eventDetails.location}</p>
      <p>Type: {eventDetails.eventType}</p>
      {/* Display other event details as needed */}

      <h3>Confirm these details are correct</h3>
      <p>Name: {currentUser.personalInformation.name}</p>
      <p>Email: {currentUser.personalInformation.contactDetails.email}</p>
      <p>Phone: {currentUser.personalInformation.contactDetails.phone}</p>
      {/* Display other user details as needed */}

      <div>
        <input
          type="checkbox"
          id="termsAccepted"
          checked={termsAccepted}
          onChange={handleTermsAcceptance}
        />
        <label htmlFor="termsAccepted">
          I agree to the terms and conditions.
        </label>
      </div>

      <button onClick={handleRegister}>Register for Event</button>
    </div>
  );
};

export default RegisterEvent;
