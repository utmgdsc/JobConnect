const express = require('express')
const router = express.Router()
const {                 
    getJobSeeker, 
    registerJobSeeker,
    updateJobSeeker,
    addJobSeekerInfo,
    deleteJobSeeker,
} = require('../controllers/jobSeekersController')

// router.route("/:id").get(getJobSeeker)
router.get('/:id', getJobSeeker)

router.post('/', registerJobSeeker)

router.put('/replace/:id', updateJobSeeker);
router.patch('/add/:id', addJobSeekerInfo);


router.delete('/:id', deleteJobSeeker);


module.exports = router