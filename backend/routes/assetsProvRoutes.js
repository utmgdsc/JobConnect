const express = require('express')

const router = express.Router()
router.get('/assetprov', assetprovController.getAssetprov), async (req, res) => {
    // Get all assetprov
    res.status(200).json(['test'])
}

router.get('/assetprov/:id', assetprovController.getAssetprov), async (req, res) => {
    // Get an assetprov by id
    res.status(200).json(['test'])
}

export default router