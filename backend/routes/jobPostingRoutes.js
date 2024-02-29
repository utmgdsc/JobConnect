const express = require('express')

const {
    getJobPostings,
    createJobPosting,
    deleteJobPosting,
    getJobPostingById,
    updateJobPosting
} = require('../controllers/jobsController')

const router = express.Router()

// GET all job postings
router.get('/', getJobPostings)

// GET a job posting by ID
router.get('/:id', getJobPostingById)

// POST a new job posting
router.post('/', createJobPosting)

// DELETE a job posting by ID
router.delete('/:id', deleteJobPosting)

// PUT (update) a job posting by ID
router.put('/:id', updateJobPosting)

module.exports = router