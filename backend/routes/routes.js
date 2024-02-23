import express from 'express'

import JobPostings from '../models/jobPostingsModel'
import JobSeeker from '../models/JobSeekerModel'
import Employer from '../models/EmployerModel'
import Assets from '../models/AssetsModel'
import AssetProvider from '../models/AssetProviderModel'

const router = express.Router()

router.get('/jobs', jobsController.getJobs), async (req, res) => {
    // Get all jobs
    res.status(200).json(['test'])
}

router.get('/jobs/:id', jobsController.getJob), async (req, res) => {
    // Get a job by id
    res.status(200).json(['test'])
}

router.get('/jobs/:id/applicants', jobsController.getApplicants), async (req, res) => {
    // Get all applicants for a job
    res.status(200).json(['test'])
}


router.get('/jobs/:id/applicants/:id', jobsController.getApplicant), async (req, res) => {
    // Get an applicant by id
    res.status(200).json(['test'])
}

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

router.get('/assetprov', assetprovController.getAssetprov), async (req, res) => {
    // Get all assetprov
    res.status(200).json(['test'])
}

router.get('/assetprov/:id', assetprovController.getAssetprov), async (req, res) => {
    // Get an assetprov by id
    res.status(200).json(['test'])
}

export default router