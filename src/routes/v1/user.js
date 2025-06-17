import express from "express"
import isLoggedIn from "../../middlewares/v1/isLoggedIn.js"
import { editProfileController, getProfileController } from "../../controllers/v1/user.js"
import { editPasswordController } from "../../controllers/v1/auth.js"

const router = express.Router()

router.get("/profile", getProfileController)
router.patch("/profile", editProfileController)
router.patch("/profile/password", editPasswordController)


export default router