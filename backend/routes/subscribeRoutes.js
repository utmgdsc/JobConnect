const express = require('express')
const router = express.Router()
const {
    subscribe,
    getSubscriptions
} = require('../controllers/subscribeController')

router.post('/', subscribe)
router.get('/', getSubscriptions)

module.exports = router