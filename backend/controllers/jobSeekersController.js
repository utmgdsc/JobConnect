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

const deleteJobSeeker = asyncHandler(async (req, res) => {
    await JobSeeker.findOneAndDelete({"_id": req.params.id}, (err, JobSeeker) => {
        if(err){
            console.log("error while deleting user");
        }else{
            console.log("User deleted successfully");  
        }
    }) 
        
});

const getJobSeeker = asyncHandler(async (req, res) => {
    jobSeeker = await JobSeeker.findOne({"_id": req.params.id})
    if (!jobSeeker) {
        res.status(404).json({ message: "Job seeker not found" });
    } else {
        res.status(200).json(jobSeeker);
    }
        
});
const updateJobSeeker = asyncHandler(async (req, res) => {
    const updates = req.body;
    const { id } = req.params;

    // Optionally validate the updates against the schema, and handle errors or forbidden updates

    try {
        const jobSeeker = await JobSeeker.findOneAndUpdate(
            { _id: id },
            { $set: updates },
            { new: true, runValidators: false }
        );

        if (!jobSeeker) {
            return res.status(404).json({ message: "Job seeker not found" });
        }

        res.status(200).json(jobSeeker);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = { 
    registerJobSeeker,
    deleteJobSeeker,
    getJobSeeker,
    updateJobSeeker
 };
