import { validateAddNewJobData } from "../../utils/v1/dataValidations.js"
import Job from "../../models/v1/job.js"


export const addNewJobController = async function (req, res) {
    try {
        validateAddNewJobData(req)

        const user = req.user
        const {
            title,
            contact,
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
            skills.split(",")
                .map(skill => skill.trim())
                .filter(skill => skill)

        const newJob = new Job({
            title, description, recruiter: user._id,
            skills: skillsArr, company, vacancies,
            contact,
            deadline, status: "active", location,
            experience, industry,
            salaryRange: {
                min: Number(minSalary),
                max: Number(maxSalary),
                currency: currency || "₹"
            },
            type,
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

export const getJobController = async function (req, res) {
    try {
        const { jobId } = req.params

        if (!jobId) {
            throw new Error("Invalid job id")
        }

        const postedJob = await Job.findById(jobId).populate("recruiter", "-password -__v -emailId -skills -isDeleted ").lean()

        if (!postedJob) {
            throw new Error("No job found with this id")
        }

        res.send({
            status: "success",
            data: postedJob
        })

    }
    catch (err) {
        res.status(400).send({
            status: "fail",
            error: "Something went wrong while getting the job ",
            message: err.message
        })
    }
}

export const deleteJobController = async function (req, res) {
    try {
        const user = req.user
        const { jobId } = req.params

        if (!jobId) {
            throw new Error("Invalid job id")
        }


        const jobPost = await Job.findById(jobId).populate("recruiter", "-password -emailId -__v ").lean()

        if (!jobPost) {
            throw new Error("No job found with given id")
        }

        if (!(user._id.equals(jobPost.recruiter._id))) {
            throw new Error("You cannot delete this job")
        }

        const deletedJob = await Job.findByIdAndUpdate(jobId, {
            $set: {
                isDeleted: true
            }
        })

        if (!deletedJob) {
            throw new Error("Something went wrong")
        }

        res.send({
            message: "Job deleted successfuly"
        })
    }
    catch (err) {
        res.status(400).send({
            error: "Something went wrong during deleting the job",
            message: err.message
        })
    }
}

export const filterJobController = async function (req, res) {
    try {
        const query = req.query;
        const searchFilters = {};

        // 🔍 Skills - partial match for at least one skill
        if (query.skills) {
            searchFilters.skills = {
                $elemMatch: {
                    $regex: new RegExp(query.skills, "i")
                }
            };
        }

        // 📍 Location (exact match)
        if (query.location) {
            searchFilters.location = {
                $regex: new RegExp(query.location, "i")
            }
        }

        // 🕒 Type of job (Full-time, Internship, etc.)
        if (query.type) {
            searchFilters.type = {
                $regex: new RegExp(query.type, "i")
            }
        }

        // 🏭 Industry
        if (query.industry) {
            searchFilters.industry = {
                $regex: new RegExp(query.industry, "i")
            }
        }

        // ✅ Remote filter
        if (query.isRemote !== undefined) {
            searchFilters.isRemote = query.isRemote === 'true';
        }

        // 🧠 Experience (greater than or equal)
        if (query.experience) {
            searchFilters.experience = { $gte: Number(query.experience) };
        }

        // 💰 Salary range (optional)
        if (query.minSalary || query.maxSalary) {
            if (query.minSalary) {
                searchFilters["salaryRange.min"] = { $gte: Number(query.minSalary) };
            }
            if (query.maxSalary) {
                searchFilters["salaryRange.max"] = { $lte: Number(query.maxSalary) };
            }
        }

        // 👤 Status check
        if (query.status) {
            searchFilters.status = query.status;
        }

        // ❌ Exclude deleted jobs
        searchFilters.isDeleted = false;

        // 📤 Final fetch
        const filteredJobs = await Job.find(searchFilters)
            .populate("recruiter", "-password -bio -emailId -skills -isDeleted -__v")
            .select("-description -isDeleted");

        res.send({ data: filteredJobs });
    }
    catch (err) {
        res.status(500).send({
            error: "Something went wrong while filtering jobs",
            message: err.message
        });
    }
};