import mongoose from "mongoose";

const userExperienceSchema = new mongoose.Schema({
    companyName: {
        type: String,
        trim: true,
    },
    position: {
        type: String,
        trim: true,
        minLength: [3,"Position field should have minimum 3 characters"]
    },
    from: {
        month: {
            trim: true,
            type: String,
        },
        year: {
            type: Number,
            max: (new Date(Date.now())).getFullYear()
        },
    },
    to: {
        month: {
            type: String,
            trim: true,
        },
        year: {
            type: Number,
            max: (new Date(Date.now())).getFullYear()
        }
    },
    skills: {
        type: String,
        trim: true,

    },
    description: {
        type:String,
        trim: true,
        default: ""
    }
})


export default userExperienceSchema