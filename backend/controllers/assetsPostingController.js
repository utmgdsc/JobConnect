const { mongo, default: mongoose } = require('mongoose');
const AssetPosting = require('../models/assetPostingModel');

// get all asset postings
const getAssetPostings = async (req, res) => {
    const assetPostings = await AssetPosting.find({});
    res.status(200).json(assetPostings);
}

// get an asset posting by ID
const getAssetPostingById = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send('Asset posting not found')
    }

    const assetPosting = await AssetPosting.findById(id);

    if (!assetPosting) {
        return res.status(404).send('Asset posting not found')
    }

    res.status(200).json(assetPosting);
}

// create a new asset posting
const createAssetPosting = async (req, res) => {
    const { company, assetType, location, availability, details, value, benefits } = req.body;


    if (!company || !assetType || !location || !availability || !details || !value) {
        return res.status(400).json({ message: 'Please fill in all required fields' });
    }

    // check if asset already exists
    try {
        const existingAssetPosting = await existingAssetPosting.findOne({ assetTitle });

        if (existingAssetPosting) {
            return res.status(400).json({ message: 'Asset posting already exists' });
        }
    } catch (error) {
            res.status(500).json({ message: 'Error checking for existing asset posting' });
    }
    const newAssetPosting = new AssetPosting({
        company,
        assetType,
        location,
        availability,
        details,
        value,
        benefits
    });

    try {
        await newAssetPosting.save();
        res.status(201).json(newAssetPosting);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

// delete an asset posting by ID
const deleteAssetPosting = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send('Asset posting not found')
    }

    const assetPosting = await AssetPosting.findOneAndDelete({ _id: id });

    if (!assetPosting) {
        return res.status(404).send('Asset posting not found')
    }

    res.status(200).json({ message: 'Asset posting deleted successfully' });
}

// update an asset posting by ID
const updateAssetPosting = async (req, res) => {
    const { id } = req.params
    const { company, assetType, location, availability, details, value, benefits } = req.body;


    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send('Please input a valid id!')
    }

    const assetPosting = await AssetPosting.findById(id);

    if (!assetPosting) {
        return res.status(404).send('Asset posting not found')
    }

    const updatedAssetPosting = { company, assetType, location, availability, details, value, benefits, _id: id };

    await AssetPosting.findByIdAndUpdate(id, updatedAssetPosting, { new: true });

    res.status(200).json(updatedAssetPosting);
}

module.exports = {
    getAssetPostings,
    getAssetPostingById,
    createAssetPosting,
    deleteAssetPosting,
    updateAssetPosting
}