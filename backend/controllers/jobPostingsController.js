const { mongo, default: mongoose } = require('mongoose');
const JobPosting = require('../models/jobPostingsModel');

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

    if (!company || !jobTitle || !location || !jobType || !details) {
        return res.status(400).json({ message: 'Please fill in all required fields' });
    }

    const newJobPosting = new JobPosting({
        company,
        jobTitle,
        location,
        jobType,
        details,
        noDegreeMentioned,
        benefits,
        applicants
    })

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
        return res.status(404).send('Invalid job posting ID')
    }

    // check if it exists
    const jP = await JobPosting.findById(id);
    if (!jP) {
        return res.status(404).send('Job posting not found')
    }

    const jobPosting = await JobPosting.findOneAndDelete({ _id: id });

    // check if job posting was found
    if (!jobPosting) {
        return res.status(404).send('Job posting not found')
    }

    res.status(200).json({ message: 'Job posting deleted successfully' });
}

// update a job posting by ID
const updateJobPosting = async (req, res) => {
    const { id } = req.params
    const { company, applicants, jobTitle, location, jobType, details, noDegreeMentioned, benefits } = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send('Invalid job posting ID')
    }

    // check if it exists
    const jP = await JobPosting.findById(id);
    if (!jP) {
        return res.status(404).send('Job posting not found')
    }

    const updatedJobPosting = { company, applicants, jobTitle, location, jobType, details, noDegreeMentioned, benefits, _id: id };

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