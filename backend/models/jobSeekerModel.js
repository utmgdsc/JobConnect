const mongoose = require('mongoose')

const jobSeekerSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },
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
            required: true

        },
        username: {
            type: String,
            required: true
        }
    },
    professionalProfile: {
        experience: [{
            title: {
                type: String,
                required: true
            },
            company: {
                type: String,
                required: true
            },
            startDate: Date,
            endDate: Date, // Can be null if it's the current position
            description: String,
        }],
        skills: [String], // Array of strings to list skills
        education: [{
            institution: {
                type: String,
                required: true
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
            required: true
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