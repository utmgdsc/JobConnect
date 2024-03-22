const mongoose = require('mongoose');

// Define the schema for the newsletter subscription
const newsletterSubscriptionSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true, // ensures the email is not already in the database
    trim: true,
    lowercase: true,
    match: [/.+\@.+\..+/, 'Please fill a valid email address'] // simple regex for email validation
  },
  subscribedAt: {
    type: Date,
    default: Date.now
  },
  // You can add more fields if needed
});

// Create the model from the schema
const NewsletterSubscription = mongoose.model('NewsletterSubscription', newsletterSubscriptionSchema);

module.exports = NewsletterSubscription;
