import express from "express"
import isLoggedIn from "../../middlewares/v1/isLoggedIn.js"
import { editProfileController, getProfileController, getUserProfileController } from "../../controllers/v1/user.js"
import { editPasswordController } from "../../controllers/v1/auth.js"

const router = express.Router()

router.get("/profile",isLoggedIn, getProfileController)
router.get("/profile/:userId", getUserProfileController)
router.patch("/profile", isLoggedIn, editProfileController)
router.patch("/profile/password", isLoggedIn, editPasswordController)


export default router