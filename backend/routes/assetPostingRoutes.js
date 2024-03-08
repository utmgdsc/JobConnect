import express from 'express'

 import JobPostings from '../models/jobPostingsModel'
 import JobSeeker from '../models/JobSeekerModel'
 import Employer from '../models/EmployerModel'
 import Assets from '../models/AssetsModel'
 import AssetProvider from '../models/AssetProviderModel'
 import AssetPosting from '../models/AssetsPostingsModel'

 const router = express.Router()

 router.get('/assets-posting', assetsPostingController.getAssets), async (req, res) => {
     // Get all assets posting
     res.status(200).json(['test'])
 }

 router.get('/assets-posting/:id', assetsPostingController.getAsset), async (req, res) => {
     // Get an asset posting by id
     res.status(200).json(['test'])
 }

 export default router 