import mongoose from "mongoose";
import { industryCategories, validJobTypes } from "../../utils/v1/constants.js";

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        maxLength: [90, "Job title should not exceed 90 characters"]
    },
    recruiter: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, "Recruiter id is required"],
    },
    description: {
        type: String,
        trim: true,
        maxLength: [3500, "Job description must have at max 3500 character"]
    },
    skills: {
        type: [String],
        validate: {
            validator: (skills) => skills.every(skill => typeof skill === 'string' && skill.trim() != ''),
            message: "Invalid skills mentioned"
        }
    },
    company: {
        type: String,
        required: [true, "Company name is required"],
        trim: true,
        maxLength: [200, "Company name can have at max 200 characters"]
    },
    vacancies: {
        type: Number,
        required: true,
        min: [1, "Minimum vacancy should be 1"]
    },
    deadline: {
        type: Date,
        validate: {
            validator: function (value) {
                return value > new Date(Date.now())
            },
            message: "Deadline date must be of future"
        }
    },
    status: {
        type: String,
        enum: {
            values: ["active", "inactive"],
            message: `Job status must be either active or inactive`
        },
        default: "active"
    },
    location: {
        type: String,
        trim: true,
    },
    experience: {
        type: Number,
        min: [0, "Experience must be either 0 or greator than 0"],
        default: 0
    },
    type: {
        type: String,
        enum: {
            values: validJobTypes,
            message: ""
        }
    },
    salaryRange: {
        min: { type: Number },
        max: { type: Number },
        currency: {
            type: String, default: "INR"
        }
    },
    industry: {
        type: String,
        enum: {
            values: industryCategories,
            message: `{VALUE} is not a valid industry category`
        }
    },
    isRemote: {
        type: Boolean,
        default: false,
        enum: {
            values: [true, false],
            message: "isRemote can be a true or false"
        }
    },
    contact: {
        type: String,
        trim: true,
        required: true,
    },
    isDeleted: {
        type: Boolean,
        default: false,
        enum: {
            values: [true, false],
            message: "isDelete can only be true or false"
        }
    }

}, { timestamps: true })

const Job = mongoose.model("Job", jobSchema)

export default Job