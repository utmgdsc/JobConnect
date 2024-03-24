const express = require('express')
const router = express.Router()
const jwtAuth = require("../lib/jwtAuth");
const {                 
    getJobSeeker, 
    registerJobSeeker,
    updateJobSeeker,
    addJobSeekerInfo,
    deleteJobSeeker,
    getCurrentJobSeeker
} = require('../controllers/jobSeekersController')

// router.route("/:id").get(getJobSeeker)
router.get('/', jwtAuth, getCurrentJobSeeker)
router.get('/:id', jwtAuth, getJobSeeker)

// router.post('/', registerJobSeeker)

router.put('/replace/:id', updateJobSeeker);
router.patch('/add/:id', addJobSeekerInfo);


router.delete('/:id', deleteJobSeeker);


module.exports = router