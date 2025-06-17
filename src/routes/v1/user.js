import express from "express"
import isLoggedIn from "../../middlewares/v1/isLoggedIn.js"
import { getProfileController } from "../../controllers/v1/user.js"

const router = express.Router()

router.get("/profile", getProfileController)


export default router