const express = require('express')
const router = express.Router()
const authMiddleware = require('../middleware/auth');
const {                 
    getJobSeeker, 
    registerJobSeeker,
    updateJobSeeker,
    addJobSeekerInfo,
    deleteJobSeeker,
} = require('../controllers/jobSeekersController')

// router.route("/:id").get(getJobSeeker)
router.get('/:id', authMiddleware, getJobSeeker)

router.post('/', registerJobSeeker)

router.put('/replace/:id', updateJobSeeker);
router.patch('/add/:id', addJobSeekerInfo);


router.delete('/:id', deleteJobSeeker);


module.exports = router