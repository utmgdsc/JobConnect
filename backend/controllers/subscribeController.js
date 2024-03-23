const asyncHandler = require('express-async-handler');
const Newsletter = require('../models/subscribeModel');

const subscribe = asyncHandler(async (req, res) => {
    const { email } = req.body;
    
    try {
        const subscription = await Newsletter.create({ email });
    
        if (subscription) {
        res.status(201).json(subscription);
        } else {
        res.status(400).json({ message: 'Invalid subscription data' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
    }
)

const getSubscriptions = asyncHandler(async (req, res) => {
    const subscriptions = await Newsletter.find({});
    res.json(subscriptions);
});

module.exports = {
    subscribe,
    getSubscriptions
};