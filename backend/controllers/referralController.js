const asyncHandler = require('express-async-handler');
const Application = require('../models/applicationModel')
const JobSeeker = require('../models/jobSeekerModel'); // Ensure this path is correct

const addReferral = asyncHandler(async (req, res) => {
    const {name, email, phone} = req.user;
    const { how, description } = req.body; 
    const jobSeeker = await JobSeeker.findOne({ email });
    referralInfo = {name: name, email: email, phone: phone, how: how, description: description}
    const { id } = req.params;
    try {
        const application = await Application.findOneAndUpdate(
            {
                jobPosting: id,
                jobSeeker: jobSeeker.userId
            },
            // Add the new referral to the referrals array
            { $addToSet: { referrals: referralInfo } },
            { new: true }
        );

        // Check if application exists
        if (application) {
            return res.status(200).json(referralInfo)
        } else {
            return res.status(404).json({ message: "Application is not found" });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }

});

module.exports = {
    addReferral
};