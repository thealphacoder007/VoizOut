import express from "express";
import { getExperience, postExperience } from "../../controllers/v1/experience.js";
import isLoggedIn from "../../middlewares/v1/isLoggedIn.js";

const router = express.Router()

router.post("/new", isLoggedIn, postExperience)
router.get("/all", isLoggedIn, getExperience)
router.get("/:experienceId", isLoggedIn, getExperience)

export default router