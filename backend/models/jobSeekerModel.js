const mongoose = require('mongoose')

const jobSeekerSchema = mongoose.Schema({
    personalInformation: {
        name: {
            type:String,
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
        username: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        address: {
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
            startDate: Date,
            endDate: Date, // Can be null if it's the current position
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
            startDate: Date,
            endDate: Date,
        }]
    },
    resume: {
        type: String, // Could be a URL to the stored resume or binary data
        required: false // Depending on your application's requirements
    },
    jobPreferences: {
        desiredIndustry: String,
        location: String,
        jobType: {
            type: String,
            enum: ['Full-time', 'Part-time', 'Contract', 'Temporary'] // Example job types
        }
    },
    applicationHistory: [{
        jobPosting: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'JobPosting',
            required: false
        },
        applyDate: Date,
        status: {
            type: String,
            enum: ['Applied', 'Interviewing', 'Offered', 'Rejected', 'Accepted']
        }
    }]
});


const JobSeeker = mongoose.model('JobSeeker', jobSeekerSchema);

module.exports = JobSeeker;