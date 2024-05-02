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
    try {
        const app = await Application.findOneAndDelete({ "_id": req.params.id });
        if (app) {
            res.status(200).json({ message: 'Application deleted successfully' });
        } else {
            res.status(404).json({ message: 'Application not found' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Error deleting app' });
    }
});

const updateApplication = asyncHandler(async (req, res) => {
    const application = await Application.findById(req.params.id);
    if (application) {
        application.status = req.body.status || application.status;
        application.location = req.body.location || application.location;
        application.notes = req.body.notes || application.notes;
        application.rating = req.body.rating || application.rating;

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