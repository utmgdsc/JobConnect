const mongoose = require('mongoose');

const referralSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    relationship: String,
    recommendation: String
});

const applicationSchema = new mongoose.Schema({
    jobPosting: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'JobPosting',
        required: false
    },
    assetPosting: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'AssetPosting',
        required: false,
    },
    jobSeeker: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'JobSeeker',
        required: true
    },
    resume: {
        type: mongoose.Schema.Types.ObjectId,
        required: false
    },
    location: {
        address: String,
        city: String,
        state: String,
        postalCode: String
    },
    referrals: [referralSchema],
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
    rating: {
        type: Number, 
        default: 0
    },
     notes: String,
    
    // Any other relevant fields
}, {
    timestamps: true
});

const Application = mongoose.model('Application', applicationSchema);

module.exports = Application;
