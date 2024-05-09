const mongoose = require('mongoose');
const JobPosting = require('../models/jobPostingsModel');
const JobSeeker = require("../models/jobSeekerModel")
const KNN = require('ml-knn');
const natural = require('natural');
const { TfIdf } = natural;
const asyncHandler = require('express-async-handler');

// Create an instance of the TF-IDF class
const tfidfInstance = new TfIdf();

// A function to preprocess the details field
function preprocessText(text) {
    // Add the text to the TF-IDF instance
    tfidfInstance.addDocument(text);
    // Get the TF-IDF vector for the text
    const tfidfVector = [];
    tfidfInstance.listTerms(0).forEach(term => {
        tfidfVector.push(term.tfidf);
    });

    return tfidfVector;
}

// A function to preprocess the details (description, responsibilities, requirements, benefits)
function preprocessDetails(details) {
    const allText = `${details.description} ${details.responsibilities.join(' ')} ${details.requirements.join(' ')} ${details.benefits.join(' ')}`;
    return preprocessText(allText);
}


function oneHotEncode(value, possibleValues) {
    const encoding = new Array(possibleValues.length).fill(0);
    const index = possibleValues.indexOf(value);
    if (index !== -1) {
        encoding[index] = 1;
    }
    return encoding;
}

function preprocessJobPosting(jobPosting) {
    const text = [
        ...jobPosting.details.description,
        jobPosting.jobTitle,
        jobPosting.jobType,
        jobPosting.location,
    ].join(' ');

    return preprocessText(text);
    // Preprocess the categorical features
    // const categoricalFeatures = preprocessCategoricalFeatures(jobPosting.location, jobPosting.jobType);
    
    // // Preprocess the details
    // const textFeatures = preprocessDetails(jobPosting.details);
    
    // // Combine all features into a single array
    // return [...categoricalFeatures, ...textFeatures];
}

function preprocessJobSeeker(jobSeeker) {
    // Combine skills and job preferences
    const text = [
        ...jobSeeker.professionalProfile.skills,
        jobSeeker.jobPreferences.desiredIndustry,
        jobSeeker.jobPreferences.jobType,
        jobSeeker.location.city,
    ].join(' ');

    return preprocessText(text);
}

const recommendCurrentJobSeeker = asyncHandler(async (req, res) => {
    try {
        // Access user information from req.user
        const user = req.user;
        // console.log(user)
    if (user.type === "employer") {
        res.status(404).json({
            message: "User must be a jobSeeker",
        });
    } else {
        jobApplicant = await JobSeeker.findOne({ userId: user._id })
        // console.log(jobApplicant)
        if (jobApplicant == null) {
            res.status(404).json({
                message: "User does not exist",
            });
            return;
        }
        const allJobPostings = await JobPosting.find({});
        const preprocessedJobPostings = allJobPostings.map(preprocessJobPosting);
        const preprocessedJobSeeker = preprocessJobSeeker(jobApplicant);
        // Fit KNN model
        const top5MatchingJobs = [];

        // Loop 5 times to find the nearest neighbor and remove it each time
        for (let i = 0; i < 10; i++) {
            const knn = new KNN(preprocessedJobPostings, allJobPostings.map((_, index) => index), { k: 1 });
            // Predict the nearest neighbor for the job seeker
            const nearestNeighborIndex = knn.predict(preprocessedJobSeeker);

            // Retrieve the nearest job posting
            const nearestJobPosting = allJobPostings[nearestNeighborIndex];

            // Add the nearest job posting to the result array
            top5MatchingJobs.push(nearestJobPosting);
            console.log(nearestJobPosting);

            // Remove the nearest neighbor from the job postings and preprocessed data
            allJobPostings.splice(nearestNeighborIndex, 1);
            preprocessedJobPostings.splice(nearestNeighborIndex, 1);
            // Remove the nearest neighbor from the job postings and preprocessed data

            // Update the KNN model with the new data
        }
        res.json(top5MatchingJobs)
    } 
    } catch (error) {
        console.error('Error recommending jobs for job seeker:', error);
        res.status(500).json({ error: 'Server error' });
    }
}
);

module.exports = {
    recommendCurrentJobSeeker
};
