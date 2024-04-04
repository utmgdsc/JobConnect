const asyncHandler = require('express-async-handler');
const JobSeeker = require('../models/jobSeekerModel'); // Ensure this path is correct

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
    await JobSeeker.findOneAndDelete({ "_id": req.params.id }, (err, JobSeeker) => {
        if (err) {
            res.status(500).json({ message: 'Error deleting user ' });
        } else {
            res.status(200).json({ message: 'Usser deleted successfully' });
        }
    })

});

const getJobSeeker = asyncHandler(async (req, res) => {
    jobSeeker = await JobSeeker.findOne({ "_id": req.params.id })
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

const addJobSeekerInfo = asyncHandler(async (req, res) => {
    const updates = req.body;
    const { id } = req.params;
    const updateQuery = {};

    // Handle updates to professionalProfile.skills
    if (updates.professionalProfile && Array.isArray(updates.professionalProfile.skills)) {
        updateQuery['$addToSet'] = {
            'professionalProfile.skills': { $each: updates.professionalProfile.skills }
        };
    }

    // Handle updates to professionalProfile.experience
    if (updates.professionalProfile && Array.isArray(updates.professionalProfile.experience)) {
        if (!updateQuery['$push']) updateQuery['$push'] = {};
        updateQuery['$push']['professionalProfile.experience'] = { $each: updates.professionalProfile.experience };
    }

    // Handle updates to professionalProfile.education
    if (updates.professionalProfile && Array.isArray(updates.professionalProfile.education)) {
        if (!updateQuery['$push']) updateQuery['$push'] = {};
        updateQuery['$push']['professionalProfile.education'] = { $each: updates.professionalProfile.education };
    }

    // Handle updates to jobPreferences
    if (updates.jobPreferences) {
        updateQuery['$set'] = { jobPreferences: updates.jobPreferences };
    }

    // Handle updates to eventRegistrations
    if (updates.eventRegistrations && Array.isArray(updates.eventRegistrations)) {
        if (!updateQuery['$addToSet']) updateQuery['$addToSet'] = {};
        updateQuery['$addToSet']['eventRegistrations'] = { $each: updates.eventRegistrations };
    }

    // Handle updates to applicationHistory
    if (updates.applicationHistory && Array.isArray(updates.applicationHistory)) {
        if (!updateQuery['$push']) updateQuery['$push'] = {};
        updateQuery['$push']['applicationHistory'] = { $each: updates.applicationHistory };
    }

    try {
        const jobSeeker = await JobSeeker.findOneAndUpdate(
            { _id: id },
            updateQuery,
            { new: true, runValidators: true }
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

const getCurrentJobSeeker = asyncHandler(async (req, res) => {
    try {
        // Access user information from req.user
        const user = req.user;
    if (user.type === "recruiter") {
        Employer.findOne({ userId: user._id })
        .then((recruiter) => {
            if (recruiter == null) {
            res.status(404).json({
                message: "User does not exist",
            });
            return;
            }
            res.json(recruiter);
        })
        .catch((err) => {
            res.status(400).json(err);
        });
    } else {
        JobSeeker.findOne({ userId: user._id })
        .then((jobApplicant) => {
            if (jobApplicant == null) {
            res.status(404).json({
                message: "User does not exist",
            });
            return;
            }
            res.json(jobApplicant);
        })
        .catch((err) => {
            res.status(400).json(err);
        });
    }
        } catch (error) {
            console.error('Error fetching job seeker:', error);
            res.status(500).json({ error: 'Server error' });
        }
        
});


module.exports = {
    registerJobSeeker,
    deleteJobSeeker,
    getJobSeeker,
    updateJobSeeker,
    addJobSeekerInfo,
    getCurrentJobSeeker
};