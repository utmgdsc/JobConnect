import express from 'express'

import JobPostings from '../models/jobPostingsModel'
import JobSeeker from '../models/JobSeekerModel'
import Employer from '../models/EmployerModel'
import Assets from '../models/AssetsModel'
import AssetProvider from '../models/AssetProviderModel'

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