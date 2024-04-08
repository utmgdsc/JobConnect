const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
    jobPosting: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'JobPosting',
        required: true
    },
    jobSeeker: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'JobSeeker',
        required: true
    },
    resume: {
        type: String, // Assuming the resume is stored as a URL or file path
        required: false
    },
    location: {
        streetAddress: String,
        city: String,
        state: String,
        postalCode: String
    },
    relocation: {
        type: Boolean,
        default: false
    },
    authorized: {
        type: Boolean,
        default: false
    },
    experience: {
        type: String,
    },
    status: {
        type: String,
        enum: ['Pending', 'Accepted', 'Rejected'],
        default: 'Pending'
    },
    notes: String,
    // Any other relevant fields
}, {
    timestamps: true
});

const Application = mongoose.model('Application', applicationSchema);

module.exports = Application;
