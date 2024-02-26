const express = require('express')

const {
    getAssetPostings,
    createAssetPosting,
    deleteAssetPosting,
    getAssetPostingById,
    updateAssetPosting
} = require('../controllers/AssetsController')

const router = express.Router()

// GET all Asset postings
router.get('/', getAssetPostings)

// GET a Asset posting by ID
router.get('/:id', getAssetPostingById)

// POST a new Asset posting
router.post('/', createAssetPosting)

// DELETE a Asset posting by ID
router.delete('/:id', deleteAssetPosting)

// PUT (update) a Asset posting by ID
router.put('/:id', updateAssetPosting)

module.exports = router