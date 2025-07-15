import mongoose from "mongoose"
import commentSchema from "./comment.js"


const experienceSchema = new mongoose.Schema({
    author: {
        type: mongoose.SchemaTypes.ObjectId ,
        ref: "User"
    },
    title: {
        type: String,
        trim: true,
        maxLength: [120, "Title should not exceed than 120"],
        required: [true, "Title is required for sharing experience"],
    },
    description: {
        type: String,
        trim: true,
        maxLength: [9000, "Description should not exceed than 9000 characters"],
        required: [true, "Please share your experience in detail"],
    },
    companyName: {
        type:String,
        trim: true,
        lowercase: true,
        required: true,
    },
    likes: {
        type: [mongoose.Types.ObjectId],
        ref: 'User'
    },
    type: {
        type: String,
        enum: {
            values: ["interview","process","scam", "feedback"],
            message: "{VALUE} is not a valid experience type"
        }
    },
    isAnonymous : {
        type: Boolean,
        default: false,
    },
}, {timestamps: true})


const Experience = mongoose.model("Experience", experienceSchema)

export default Experience