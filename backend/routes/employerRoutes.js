import express from 'express'

import JobPostings from '../models/jobPostingsModel'
import JobSeeker from '../models/JobSeekerModel'
import Employer from '../models/EmployerModel'
import Assets from '../models/AssetsModel'
import AssetProvider from '../models/AssetProviderModel'

const router = express.Router()

export default router