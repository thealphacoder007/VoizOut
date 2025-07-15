import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    experienceId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Experience",
    },
    author: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    },
    message: {
        type:String,
        trim: true,
    }
})

const Comment = mongoose.model("Comment", commentSchema)

export default Comment