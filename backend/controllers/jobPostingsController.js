const { mongo, default: mongoose } = require('mongoose');
const JobPosting = require('../models/jobPostingModel');

// get all job postings
const getJobPostings = async (req, res) => {
    const jobPostings = await JobPosting.find({});

    res.status(200).json(jobPostings);
}

// get a job posting by ID
const getJobPostingById = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send('Job posting not found')
    }

    const jobPosting = await JobPosting.findById(id);

    if (!jobPosting) {
        return res.status(404).send('Job posting not found')
    }

    res.status(200).json(jobPosting);
}

// create a new job posting
const createJobPosting = async (req, res) => {
    const { company, jobTitle, location, jobType, details, noDegreeMentioned, benefits } = req.body;

    const newJobPosting = new JobPosting({
        company,
        jobTitle,
        location,
        jobType,
        details,
        noDegreeMentioned,
        benefits
    });

    if (!company || !jobTitle || !location || !jobType || !details) {
        return res.status(400).json({ message: 'Please fill in all required fields' });
    }

    // check if job already exists
    try {
        const existingJob = await JobPosting.findOne({ jobTitle });

        if (existingJob) {
            return res.status(400).json({ message: 'Job posting already exists' });
        }
    } catch (error) {
            res.status(500).json({ message: 'Error checking for existing job posting' });
    }

    try {
        await newJobPosting.save();
        res.status(201).json(newJobPosting);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

// delete a job posting by ID
const deleteJobPosting = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send('Job posting not found')
    }

    const jobPosting = await JobPosting.findOneAndDelete({ _id: id });

    if (!jobPosting) {
        return res.status(404).send('Job posting not found')
    }

    res.status(200).json({ message: 'Job posting deleted successfully' });
}

// update a job posting by ID
const updateJobPosting = async (req, res) => {
    const { id } = req.params
    const { company, jobTitle, location, jobType, details, noDegreeMentioned, benefits } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send('Job posting not found')
    }

    const updatedJobPosting = { company, jobTitle, location, jobType, details, noDegreeMentioned, benefits, _id: id };

    await JobPosting.findByIdAndUpdate(id, updatedJobPosting, { new: true });

    res.status(200).json(updatedJobPosting);
}

module.exports = {
    getJobPostings,
    getJobPostingById,
    createJobPosting,
    deleteJobPosting,
    updateJobPosting
}