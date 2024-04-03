const { mongo, default: mongoose } = require('mongoose');
const JobPosting = require('../models/jobPostingsModel');

// get all job postings
const getJobPostings = async (req, res) => {
    try {
        const jobPostings = await JobPosting.find({});
        res.status(200).json(jobPostings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// get a job posting by ID
const getJobPostingById = async (req, res) => {
    const { id } = req.params;

    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).send('Job posting not found');
        }

        const jobPosting = await JobPosting.findById(id);

        if (!jobPosting) {
            return res.status(404).send('Job posting not found');
        }

        res.status(200).json(jobPosting);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// create a new job posting
const createJobPosting = async (req, res) => {
    const { company, jobTitle, location, jobType, salary, details, noDegreeMentioned, benefits, applicants} = req.body;

    try {
        if (!company || !jobTitle || !location || !jobType || !details) {
            return res.status(400).json({ message: 'Please fill in all required fields' });
        }

        const newJobPosting = new JobPosting({
            company,
            jobTitle,
            location,
            jobType,
            salary,
            details,
            noDegreeMentioned,
            benefits,
            applicants
        });

        await newJobPosting.save();
        res.status(201).json(newJobPosting);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

// delete a job posting by ID
const deleteJobPosting = async (req, res) => {
    const { id } = req.params;

    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).send('Invalid job posting ID');
        }

        const jobPosting = await JobPosting.findOneAndDelete({ _id: id });

        if (!jobPosting) {
            return res.status(404).send('Job posting not found');
        }

        res.status(200).json({ message: 'Job posting deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// update a job posting by ID
const updateJobPosting = async (req, res) => {
    const { id } = req.params
    const { company, applicants, jobTitle, location, salary, jobType, details, noDegreeMentioned, benefits } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send('Invalid job posting ID')
    }

    // check if it exists
    const jP = await JobPosting.findById(id);
    if (!jP) {
        return res.status(404).send('Job posting not found')
    }

    const updatedJobPosting = { company, applicants, jobTitle, salary, location, jobType, details, noDegreeMentioned, benefits, _id: id };

    const jobPosting = await JobPosting.findByIdAndUpdate(id, updatedJobPosting, { new: true });

    if (!jobPosting) {
        return res.status(404).send('Job posting not found');
    }

    res.status(200).json(jobPosting);
}

module.exports = {
    getJobPostings,
    getJobPostingById,
    createJobPosting,
    deleteJobPosting,
    updateJobPosting
}
