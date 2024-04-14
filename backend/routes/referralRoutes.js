const express = require('express')
const router = express.Router()
const jwtAuth = require("../lib/jwtAuth");
const {                 
    addReferral,
} = require('../controllers/referralController.js')

// router.get('/', jwtAuth, getCurrentJobSeeker)
router.get('/:id', jwtAuth, addReferral)


module.exports = router