const express = require('express')
const jwtAuth = require("../lib/jwtAuth");
const {
    getJobPostings,
    createJobPosting,
    deleteJobPosting,
    getJobPostingById,
    updateJobPosting,
} = require('../controllers/jobPostingsController')

const {recommendCurrentJobSeeker} = require('../controllers/recommendController')

const router = express.Router()

// GET all job postings
router.get('/', getJobPostings)
router.get('/recommend', jwtAuth, recommendCurrentJobSeeker)
// GET a job posting by ID
router.get('/:id', getJobPostingById)

// POST a new job posting
router.post('/', createJobPosting)

// DELETE a job posting by ID
router.delete('/:id', deleteJobPosting)

// PUT (update) a job posting by ID
router.put('/:id', updateJobPosting)

module.exports = router