const asyncHandler = require('express-async-handler');
const Event = require('../models/eventsModel'); // Ensure this path is correct

// Create an event
const createEvent = asyncHandler(async (req, res) => {
    const { eventOwner, eventName, organizer, location, eventType, date, details, registrationRequired, registrationLink, postedBy, startTime, 
    endTime } = req.body;

    // Basic validation
    if (!eventOwner || !eventName || !organizer || !location || !eventType || !date || !startTime || !endTime) {
        return res.status(400).json({ message: 'Please add all required fields' });
    }

    try {
        const event = await Event.create({
            eventOwner,
            eventName,
            organizer,
            location,
            eventType,
            date,
            startTime,
            endTime,
            details,
            registrationRequired,
            registrationLink,
            postedBy
        });

        if (event) {
            res.status(201).json(event);
        } else {
            res.status(400).json({ message: 'Invalid event data' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get an event by ID
const getEvent = asyncHandler(async (req, res) => {
    const event = await Event.findById(req.params.id);

    if (event) {
        res.status(200).json(event);
    } else {
        res.status(404).json({ message: "Event not found" });
    }
});

// Get all events
const getAllEvents = asyncHandler(async (req, res) => {
    try {
        const events = await Event.find({});
        if (events) {
            res.status(200).json(events);
        } else {
            res.status(404).json({ message: 'No events found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});


// Update an event
const updateEvent = asyncHandler(async (req, res) => {
    const event = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

    if (event) {
        res.status(200).json(event);
    } else {
        res.status(404).json({ message: "Event not found" });
    }
});

// Delete an event
const deleteEvent = asyncHandler(async (req, res) => {
    const event = await Event.findByIdAndDelete(req.params.id);

    if (event) {
        res.status(200).json({ message: "Event deleted successfully" });
    } else {
        res.status(404).json({ message: "Event not found" });
    }
});

module.exports = {
    createEvent,
    getEvent,
    updateEvent,
    deleteEvent,
    getAllEvents
};
