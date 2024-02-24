
import express from 'express'

import JobPostings from '../models/jobPostingsModel'
import JobSeeker from '../models/JobSeekerModel'
import Employer from '../models/EmployerModel'
import Assets from '../models/AssetsModel'
import AssetProvider from '../models/AssetProviderModel'

const router = express.Router()

router.get('/assets', assetsController.getAssets), async (req, res) => {
    // Get all assets
    res.status(200).json(['test'])
}

router.get('/assets/:id', assetsController.getAsset), async (req, res) => {
    // Get an asset by id
    res.status(200).json(['test'])
}

router.get('/assets/:id/applicants', assetsController.getApplicants), async (req, res) => {
    // Get all applicants for an asset
    res.status(200).json(['test'])
}

router.get('/assets/:id/applicants/:id', assetsController.getApplicant), async (req, res) => {
    // Get an applicant by id
    res.status(200).json(['test'])
}
export default router