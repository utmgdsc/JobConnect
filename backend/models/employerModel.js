const mongoose = require('mongoose');

const EmployerSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
      },
    company: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    phone: {
        type: Number,
    },
    location: {
        type: String, // Could be a string or a nested schema for detailed location (even remote?) or loc object
        required: false
    },
    category: {
        type: String,
        required: false,
    },
    website: {
        type: String,
    },
    phone: {
        type: Number,
    },
    jobs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'JobPosting'
    }],
    assets: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'AssetPosting'
    }],
    events: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event'
    }],
    reviews: [{
        review: String,
        rating: Number,
        timestamp: {
            type: Date,
            default: Date.now
        }
    }],
}, { timestamps: true });

const employer = mongoose.model('Employer', EmployerSchema);

module.exports = employer;