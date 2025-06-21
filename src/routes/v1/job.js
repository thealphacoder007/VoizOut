import express from 'express'
import { addNewJobController, deleteJobController, filterJobController, getJobController } from '../../controllers/v1/job.js'
import isLoggedIn from '../../middlewares/v1/isLoggedIn.js'

const router = express.Router()

router.post("/new", isLoggedIn, addNewJobController)
router.get("/search", filterJobController)
router.get("/job/:jobId", getJobController)
router.delete("/job/:jobId", isLoggedIn,deleteJobController)


export default router