const mongoose = require('mongoose');

const jobPostingSchema = new mongoose.Schema({
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employer',
    },
    jobTitle: {
        type: String,
        required: true
    },
    applicants: [{
        jobSeeker: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'JobSeeker',
            required: true
        },
        status: {
            type: String,
            enum: ['Pending', 'Accepted', 'Rejected'],
            default: 'Pending'
        },
        notes: {
            type: String
        },
        // Additional fields for applicant assessment (e.g., test scores, interview feedback)
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
