const mongoose = require('mongoose');

const CareerEventSchema = new mongoose.Schema({

    eventName: { 
        type: String,
        required: true
    },
    organizer: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
        // Consider using a nested schema if you need to store detailed location information, such as address, city, and zip code.
    },
    eventType: {
        type: String,
        required: true,
        enum: ['Workshop', 'Seminar', 'Job Fair', 'Networking Event', 'Webinar']
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    details: {
        description: {
            type: String,
            required: true
        },
        targetAudience: [String],
        // Consider including fields such as 'agenda', 'speakers' (which could be an array of strings or a nested schema for more detail), 'sponsors', etc.
    },
    accessibilityOptions: {
        type: [String],
        required: true
        // Examples: 'Wheelchair accessible', 'Sign language interpreter', 'Materials in Braille'
    },
    registrationRequired: {
        type: Boolean,
        default: false
    },
    registrationLink: {
        type: String,
        // Consider making this required if registrationRequired is true
    },
    // Additional fields for managing the event posting
    
}, {
    timestamps: true // Adds createdAt and updatedAt timestamps
});

const CareerEvent = mongoose.model('CareerEvent', CareerEventSchema);

module.exports = CareerEvent;
