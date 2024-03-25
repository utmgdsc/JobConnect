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
    const jobSeeker = await JobSeeker.findOne({ "_id": req.params.id })
    if (!jobSeeker) {
        res.status(404).json({ message: "Job seeker not found" });
    } else {
        res.status(200).json(jobSeeker);
    }

    try {
        // Access user information from req.user
        const userId = req.user.id;

        // Use userId to fetch job seeker data from your database
        const jobSeeker = await JobSeeker.findOne({ _id: userId });

        if (!jobSeeker) {
            return res.status(404).json({ message: 'Job seeker not found' });
        }

        // Return the job seeker data
        res.status(200).json(jobSeeker);
    } catch (error) {
        console.error('Error fetching job seeker:', error);
        res.status(500).json({ error: 'Server error' });
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

    // Check and build update query for professionalProfile.skills
    if (updates.professionalProfile && Array.isArray(updates.professionalProfile.skills)) {
        updateQuery['professionalProfile.skills'] = { $each: updates.professionalProfile.skills };
    }

    // Check and build update query for professionalProfile.experience
    if (updates.professionalProfile && Array.isArray(updates.professionalProfile.experience)) {
        updateQuery['professionalProfile.experience'] = { $each: updates.professionalProfile.experience };
    }

    // Check and build update query for professionalProfile.education
    if (updates.professionalProfile && Array.isArray(updates.professionalProfile.education)) {
        updateQuery['professionalProfile.education'] = { $each: updates.professionalProfile.education };
    }

    // Check and build update query for jobPreferences
    if (updates.jobPreferences) {
        updateQuery['jobPreferences'] = updates.jobPreferences;
    }

    // Check and build update query for eventRegistrations
    if (updates.eventRegistrations && Array.isArray(updates.eventRegistrations)) {
        updateQuery['eventRegistrations'] = { $each: updates.eventRegistrations };
    }

    try {
        const jobSeeker = await JobSeeker.findOneAndUpdate(
            { _id: id },
            { $addToSet: updateQuery },
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
};

