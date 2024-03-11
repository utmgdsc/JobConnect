const mongoose = require('mongoose');

 const AssetsProviderSchema = new mongoose.Schema({
     company: {
         type: String,
         required: true
     },
     jobTitle: {
         type: String,
         required: true
     },
     location: {
         type: String, // Could be a string or a nested schema for detailed location (even remote?) or loc object
         required: true
     },
     jobType: {
         type: String,
         required: true,
         enum: ['Full-Time', 'Part-Time', 'Contract', 'Temporary', 'Internship']
     },
     postedAt: {
         type: Date,
         default: Date.now
     },
     details: {
         description: {
             type: String,
             required: true
         },
         responsibilities: [String],
         requirements: [String],
         // Add additional fields for detailed view as needed
     }, // This is the nested schema for detailed view
     // Additional fields for summary view
     noDegreeMentioned: {
         type: Boolean,
         default: false
     },
     benefits: [String]
 }, {
     timestamps: true
 });

 const AssetsProvider = mongoose.model('AssetsProvider', AssetsProviderSchema);

 module.exports = AssetsProvider;