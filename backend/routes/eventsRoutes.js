const express = require('express');
const router = express.Router();
const {
    createEvent,
    getEvent,
    updateEvent,
    getAllEvents,
    deleteEvent,
} = require('../controllers/eventsController');

// Routes for the Event model
router.post('/', createEvent);
router.get('/:id', getEvent);
router.get('/', getAllEvents)
router.put('/:id', updateEvent);
router.delete('/:id', deleteEvent);

module.exports = router;
