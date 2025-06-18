import express from 'express'
import { addNewJobController, deleteJobController, filterJobController, getJobController } from '../../controllers/v1/job.js'

const router = express.Router()

router.post("/new", addNewJobController)
router.get("/search", filterJobController)
router.get("/:jobId", getJobController)
router.delete("/:jobId", deleteJobController)


export default router