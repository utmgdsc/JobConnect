const express = require('express')
const router = express.Router()
const {                 
    getJobSeeker,
    setJobSeeker,
    updateJobSeeker,
    deleteCandidate,
} = require('../controllers/jobSeekersController')

// router.route("/:id").get(getJobSeeker)
router.get('/', (req, res) => {
    res.status(200).json({message: "Get Goals"})
})


export default router