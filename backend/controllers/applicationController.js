const asyncHandler = require('express-async-handler');
const Application = require('../models/applicationModel');

const getApplications = asyncHandler(async (req, res) => {
    const applications = await Application.find({});
    res.json(applications);
});

const getApplicationById = asyncHandler(async (req, res) => {
    const application = await Application.findOne({ "_id": req.params.id })
    if (application) {
        res.json(application);
    } else {
        res.status(404);
        throw new Error('Application not found');
    }
});

const createApplication = asyncHandler(async (req, res) => {
    const application = new Application(req.body);
    const createdApplication = await application.save();
    res.status(201).json(createdApplication);
});

const deleteApplication = asyncHandler(async (req, res) => {
    const application = await Application.findById(req.params.id);
    if (application) {
        await application.remove();
        res.json({ message: 'Application removed' });
    } else {
        res.status(404);
        throw new Error('Application not found');
    }
});

const updateApplication = asyncHandler(async (req, res) => {
    const application = await Application.findById(req.params.id);
    if (application) {
        application.status = req.body.status || application.status;
        application.location = req.body.location || application.location;

        const updatedApplication = await application.save();
        res.json(updatedApplication);
    } else {
        res.status(404);
        throw new Error('Application not found');
    }
});

module.exports = {
    getApplications,
    getApplicationById,
    createApplication,
    deleteApplication,
    updateApplication
};