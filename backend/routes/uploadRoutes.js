const express = require('express');
const router = express.Router();
const { uploadResume } = require('../controllers/uploadController');

router.post("/", uploadResume);

module.exports = router;