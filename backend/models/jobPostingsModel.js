const mongoose = require('mongoose');

const jobPostingSchema = new mongoose.Schema({
    employer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employer',
    },
    company: {
        type: String,
        required: true
    },
    jobTitle: {
        type: String,
        required: true
    },
    applicants: [{ // Modified part
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Application',
        required: false
    }],
    location: {
        type: String,
        required: true
    },
    jobType: {
        type: String,
        required: true,
        enum: ['Full-Time', 'Part-Time', 'Contract', 'Temporary', 'Internship']
    },
    salary: {
        type: Number,
    },
    postedAt: {
        type: Date,
        default: Date.now
    },
    details: {
        description: {
            type: String,
            required: true
        },
        responsibilities: [String],
        requirements: [String],
        benefits: [String]
        // Add additional fields for detailed view as needed
    }, // This is the nested schema for detailed view
    // Additional fields for summary view
    noDegreeMentioned: {
        type: Boolean,
        default: false
    },
}, {
    timestamps: true
});

const JobPosting = mongoose.model('JobPosting', jobPostingSchema);

module.exports = JobPosting;