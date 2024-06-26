const mongoose = require('mongoose');

const jobSeekerSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    personalInformation: {
        name: {
            type: String,
            required: true
        },
        contactDetails: {
            email: {
                type: String,
                required: true
            },
            phone: String,
        },
        age: {
            type: String,
            required: false
        },
    },
    professionalProfile: {
        experience: [{
            title: {
                type: String,
                required: false
            },
            company: {
                type: String,
                required: false
            },
            startYear: String,
            endYear: String, // Can be null if it's the current position
            description: String,
        }],
        skills: [String], // Array of strings to list skills
        education: [{
            institution: {
                type: String,
                required: false
            },
            degree: String,
            fieldOfStudy: String,
            startYear: String,
            endYear: String,
        }]
    },
    resume: {
        type: String, // Could be a URL to the stored resume or binary data
        required: false // Depending on your application's requirements
    },
    jobPreferences: {
        desiredIndustry: String,
        jobType: {
            type: String,
            enum: ['Full-time', 'Part-time', 'Contract', 'Temporary'] // Example job types
        }
    },
    location: {
        address: String,
        city: String,
        state: String,
        postalCode: String
    },
    eventRegistrations: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CareerEvent',
    }],
    applicationHistory: [{ // Modified part
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Application',
    }],
    notifications: [{
        message: String,
        isRead: {
            type: Boolean,
            default: false,
        },
        date: {
            type: Date,
            default: Date.now,
        }
    }]
}, {
    timestamps: true // Adds createdAt and updatedAt timestamps
});

const JobSeeker = mongoose.model('JobSeeker', jobSeekerSchema);

module.exports = JobSeeker;