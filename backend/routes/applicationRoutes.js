const express = require('express')

const {
    getApplications,
    createApplication,
    deleteApplication,
    getApplicationById,
    updateApplication
} = require('../controllers/applicationController')

const router = express.Router()

// GET all applications
router.get('/', getApplications)

// GET an application by ID
router.get('/:id', getApplicationById)

// POST a new application
router.post('/', createApplication)

// DELETE an application by ID
router.delete('/:id', deleteApplication)

// PUT (update) an application by ID
router.put('/replace/:id', updateApplication)

module.exports = router