import Experience from "../../models/v1/experience.js"
import { hideFieldsInAnonymousExperience } from "../../utils/v1/constants.js"
import { sendExperienceData, validatePostExperienceData } from "../../utils/v1/experienceValidator.js"


export const postExperience = async (req, res) => {
    try {
        const loggedInUser = req.user
        const experienceData = validatePostExperienceData(req)
        const isAnonymous = req.body.isAnonymous || false

        experienceData.author = loggedInUser._id
        experienceData.isAnonymous = isAnonymous

        const experience = new Experience(experienceData)

        const savedExperience = await experience.save()

        const toSendExperienceData = sendExperienceData(savedExperience)


        return res.send({
            message: "Your experience has been posted successfully",
            data: toSendExperienceData
        })

    }
    catch (err) {
        return res.status(400).send({
            error: "Something went wrong while posting experience",
            message: err.message
        })
    }
}


export const getExperience = async (req, res) => {
    try {
        const experienceId = req.params.experienceId   

        const experience = await Experience.findById(experienceId)
        
        if(!experience) {
            throw new Error("Cannot find experience")
        }
        
        if(!experience.isAnonymous) {
            await experience.populate("author",hideFieldsInAnonymousExperience)
        }
        
        const toSendExperienceData = sendExperienceData(experience)
        
        res.send({
            message: "Experience found",
            data: toSendExperienceData
        })

    }
    catch(err) {
        res.send({
            error: "Something went wrong while getting the experience",
            message: err.message
        })
    }
}

export const getAllExperiences = async(req,res) => {
    try {
        const limit = 10;
        const page = req.query.page || 0
        const experiences = await Experience.find().sort({createdAt: -1}).select("-description").skip(page*limit).limit(limit)

        await Promise.all(
            experiences.map(async(exp) => {
                if(!exp.isAnonymous) {
                    await exp.populate("author", hideFieldsInAnonymousExperience)
                }
                return sendExperienceData(exp);
            })
        )

        res.send({
            data: experiences
        })

    }
    catch(err) {
        console.log(err)
    }
}