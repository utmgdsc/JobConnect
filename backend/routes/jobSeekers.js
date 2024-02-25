const express = require('express')
const router = express.Router()
const {                 
    getJobSeeker,
    registerJobSeeker,
    updateJobSeeker,
    deleteCandidate,
} = require('../controllers/jobSeekersController')

// router.route("/:id").get(getJobSeeker)
router.get('/:id', (req, res) => {
    res.status(200).json({message: `Get info on ${req.params.id}`})
})

router.get('/', (req, res) => {
    res.status(200).json({message: "Get info on all job seekers"})
})

router.post('/', registerJobSeeker)

router.put('/:id', (req, res) => {
    res.status(200).json({message: "Create a new account"})
})


router.delete('/:id', (req, res) => {
    res.status(200).json({message: "Delete a new account"})
})






module.exports = router