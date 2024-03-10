const mongoose = require('mongoose');

 const assetPostingSchema = new mongoose.Schema({
     owner: {
         type: String,
         required: true
     },
     assetType: {
         type: String,
         required: true
     },
     location: {
         type: String, // Could be a string or a nested schema for detailed location
         required: true
     },
     availability: {
         type: String,
         enum: ['Available', 'Unavailable', 'Pending'], // You can adjust these options as needed
         default: 'Available'
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
         // Additional details specific to the asset can be added here
     },
     price: {
         type: Number,
         required: true
     },
     // Additional fields for summary view
     benefits: [String], // Any benefits associated with renting the asset
     // You can add more fields as needed
 }, {
     timestamps: true
 });

 const AssetPosting = mongoose.model('AssetPosting', assetPostingSchema);

 module.exports = AssetPosting;