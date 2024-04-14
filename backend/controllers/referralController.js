const asyncHandler = require('express-async-handler');
const Application = require('../models/applicationModel')
const JobSeeker = require('../models/jobSeekerModel'); // Ensure this path is correct
const User = require('../models/User')
const addReferral = asyncHandler(async (req, res) => {
    const {name, email, phone} = req.user;
    const { relationship, description} = req.body; 
    applicantEmail = req.body.email
    console.log(applicantEmail)
    let jobSeeker = await User.findOne({ email: applicantEmail });
    jobSeeker = await JobSeeker.findOne({ userId: jobSeeker._id });
    console.log(jobSeeker)
    referralInfo = {name: name, email: email, phone: phone, relationship: relationship, recommendation: description}
    const { id } = req.params;
    console.log(id)
    try {
        const application = await Application.findOneAndUpdate(
            {
                jobPosting: id,
                jobSeeker: jobSeeker._id
            },
            // Add the new referral to the referrals array
            { $addToSet: { referrals: referralInfo } },
            { new: true }
        );

        // Check if application exists
        console.log("here")
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