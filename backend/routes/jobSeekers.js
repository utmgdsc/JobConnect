const express = require('express')
const router = express.Router()
const {                 
    getJobSeeker, 
    registerJobSeeker,
    updateJobSeeker,
    deleteJobSeeker,
} = require('../controllers/jobSeekersController')

// router.route("/:id").get(getJobSeeker)
router.get('/:id', getJobSeeker)

router.post('/', registerJobSeeker)

router.put('/:id', updateJobSeeker);


router.delete('/:id', deleteJobSeeker);



module.exports = router