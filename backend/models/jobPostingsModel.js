const mongoose = require('mongoose');

const jobPostingSchema = new mongoose.Schema({
    company: {
        type:  mongoose.Schema.Types.ObjectId,
        ref: 'Employer',
        required: true
    },
    applicants: {
        type:  [mongoose.Schema.Types.ObjectId],
        ref: 'jobSeeker',
        required: true,
    },
    jobTitle: {
        type: String,
        required: true
    },
    location: {
        type: String, // Could be a string or a nested schema for detailed location (even remote?) or loc object
        required: true
    },
    jobType: {
        type: String,
        required: true,
        enum: ['Full-Time', 'Part-Time', 'Contract', 'Temporary', 'Internship']
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
        // Add additional fields for detailed view as needed
    }, // This is the nested schema for detailed view
    // Additional fields for summary view
    noDegreeMentioned: {
        type: Boolean,
        default: false
    },
    benefits: [String]
}, {
    timestamps: true
});

const JobPosting = mongoose.model('JobPosting', jobPostingSchema);

module.exports = JobPosting;