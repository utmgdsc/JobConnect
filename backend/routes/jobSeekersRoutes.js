const express = require('express')
const router = express.Router()
const jwtAuth = require("../lib/jwtAuth");
const {                 
    getJobSeeker, 
    registerJobSeeker,
    updateJobSeeker,
    addJobSeekerInfo,
    deleteJobSeeker,
    getCurrentJobSeeker,
    recommendCurrentJobSeeker
} = require('../controllers/jobSeekersController')

// router.route("/:id").get(getJobSeeker)
router.get('/', jwtAuth, getCurrentJobSeeker)
router.get('/recommend', jwtAuth, recommendCurrentJobSeeker)
router.get('/:id', getJobSeeker)

// router.post('/', registerJobSeeker)

router.put('/replace/:id', updateJobSeeker);
router.patch('/add/:id', addJobSeekerInfo);


router.delete('/:id', deleteJobSeeker);


module.exports = router