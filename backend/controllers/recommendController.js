const mongoose = require('mongoose');
const JobPosting = require('../models/jobPostingsModel');
const JobSeeker = require("../models/jobSeekerModel")

const asyncHandler = require('express-async-handler');
const { CohereRerank } = require("@langchain/cohere");
const { Document } = require("@langchain/core/documents"); 

function preprocessJobPosting(jobPosting) {
    const text = [
        ...jobPosting.details.description,
        jobPosting.jobTitle,
        jobPosting.jobType,
        jobPosting.location,
    ].join(' ');
    text = `job description : ${jobPosting.details.description}. Job Title :${jobPosting.jobTitle}. Job type: ${jobPosting.jobType}. Job location: ${jobPosting.location}`

    return new Document({pageContent: text});
}

function preprocessJobSeeker(jobSeeker) {
    // Combine skills and job preferences
    text = `User skills : ${jobSeeker.professionalProfile.skills}. User desired industry :${jobSeeker.jobPreferences.desiredIndustry}. User desired job type: ${jobSeeker.jobPreferences.jobType}. User's city: ${jobSeeker.location.city}`
    return text
}

const recommendCurrentJobSeeker = asyncHandler(async (req, res) => {
    try {
        const cohereRerank = new CohereRerank({
            apiKey: process.env.COHERE_API_KEY, // Default
            model: "rerank-english-v2.0", // Default
        });
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
        const query = `Recommend a job for this user : ${preprocessedJobSeeker}`
        const rerankedDocuments = await cohereRerank.rerank(preprocessedJobPostings, query, {
            topN: 5,
          });
          
        console.log(rerankedDocuments);
        const top5MatchingJobs = rerankedDocuments.map(doc => {
            const job = allJobPostings[doc.index];
            return { ...doc, job };
          });

        console.log(top5MatchingJobs)
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
