const asyncHandler = require('express-async-handler');
const employer = require('../models/employerModel');

const registerEmployer = async (req, res) => {
    // Destructuring nested properties from req.body
    const { company,
        email,
        description,
        location,
        category,
        website,
        phone,
        reviews
    } = req.body;

    // Basic validation to check if essential fields are present
    if (!company || !email || !description || !location || !category) {
        return res.status(400).json({ message: 'Please add all required fields' });
    }

    // Check if job employer already exists
    try {
        const employerExists = await employer.findOne({ email: email });

        if (employerExists) {
            return res.status(400).json({ message: 'Employer with this email already exists' });
        }

        // Create a new employer record
        const employer = await employer.create({
            _id: ObjectId(),
            company,

        });

        if (employer) {
            res.status(201).json({
                _id: employer._id,
                company: employer.company,
                email: employer.email,
                description: employer.description,
            });
        } else {
            res.status(400).json({ message: 'Invalid job employer data' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

const deleteEmployer = asyncHandler(async (req, res) => {
    await employer.findOneAndDelete({ "_id": req.params.id }, (err, employer) => {
        if (err) {
            res.status(500).json({ message: 'Error deleting user ' });
        } else {
            res.status(200).json({ message: 'Usser deleted successfully' });
        }
    })

});

const getEmployer = asyncHandler(async (req, res) => {
    employer = await employer.findOne({ "_id": req.params.id })
    if (!employer) {
        res.status(404).json({ message: "Job employer not found" });
    } else {
        res.status(200).json(employer);
    }

});
const updateEmployer = asyncHandler(async (req, res) => {
    const updates = req.body;
    const { id } = req.params;

    // Optionally validate the updates against the schema, and handle errors or forbidden updates

    try {
        const employer = await employer.findOneAndUpdate(
            { _id: id },
            { $set: updates },
            { new: true, runValidators: false }
        );

        if (!employer) {
            return res.status(404).json({ message: "Job employer not found" });
        }

        res.status(200).json(employer);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

const addEmployerInfo = asyncHandler(async (req, res) => {
    const updates = req.body;
    const { id } = req.params;
    const updateQuery = {};

    // Check and build update query for responsibilities
    if (updates.reviews && Array.isArray(updates.reviews)) {
        updateQuery['reviews'] = { $each: updates.reviews };
    }

    try {
        const employer = await employer.findOneAndUpdate(
            { _id: id },
            { $addToSet: updateQuery },
            { new: true, runValidators: true }
        );

        if (!employer) {
            return res.status(404).json({ message: "Job employer not found" });
        }

        res.status(200).json(employer);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});



module.exports = {
    registerEmployer,
    deleteEmployer,
    getEmployer,
    updateEmployer,
    addEmployerInfo
};
