const asyncHandler = require('express-async-handler');
const JobSeeker = require('../models/JobSeekerModel'); // Ensure this path is correct

const registerJobSeeker = async (req, res) => {
    // Destructuring nested properties from req.body
    const { personalInformation, professionalProfile, resume, jobPreferences } = req.body;

    // Further destructuring to get name, email, and other fields from personalInformation
    const { name, contactDetails, age, username } = personalInformation || {};
    const { email, phone } = contactDetails || {};

    // Basic validation to check if essential fields are present
    if (!name || !email || !age || !username) {
        console.log(name);
        console.log(contactDetails);
        return res.status(400).json({ message: 'Please add all required fields' });
    }

    // Check if job seeker already exists with the given email
    try {
        const jobSeekerExists = await JobSeeker.findOne({ 'personalInformation.contactDetails.email': email });

        if (jobSeekerExists) {
            return res.status(400).json({ message: 'Job seeker with this email already exists' });
        }

        // Create a new JobSeeker record
        const jobSeeker = await JobSeeker.create({
            personalInformation,
            professionalProfile,
            resume,
            jobPreferences
        });

        if (jobSeeker) {
            res.status(201).json({
                _id: jobSeeker._id,
                name: jobSeeker.personalInformation.name,
                email: jobSeeker.personalInformation.contactDetails.email,
                username: jobSeeker.personalInformation.username,
            });
        } else {
            res.status(400).json({ message: 'Invalid job seeker data' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { registerJobSeeker };
