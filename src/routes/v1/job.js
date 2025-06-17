import express from 'express'
import { addNewJobController } from '../../controllers/v1/job.js'

const router = express.Router()

router.post("/new", addNewJobController)


export default router