import { validateAddNewJobData } from "../../utils/v1/dataValidations.js"
import Job from "../../models/v1/job.js"


export const addNewJobController = async function (req, res) {
    try {
        validateAddNewJobData(req)

        const user = req.user
        const {
            title,
            description,
            isRemote,
            deadline,
            skills,
            company,
            vacancies,
            location,
            experience,
            type,
            industry,
            minSalary,
            maxSalary,
            currency
        } = req.body


        const skillsArr =
            skills.split(" ")
                .map(skill => skill.trim())
                .filter(skill => skill)

        const newJob = new Job({
            title, description, recruiter: user._id,
            skills: skillsArr, company, vacancies,
            deadline, status: "active", location,
            experience, industry,
            salaryRange: {
                min: Number(minSalary),
                max: Number(maxSalary),
                currency: currency || "₹"
            },
            isRemote
        })

        const savedJob = await newJob.save()

        res.status(201).send({
            status: "success",
            message: "Job created successfully",
            data: savedJob
        })
    }
    catch (err) {
        res.status(400).send({
            status: "fail",
            message: err.message
        })
    }
}