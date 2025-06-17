import mongoose from "mongoose"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true,
        minLength: [3, "Name must have atleast 3 characters"]
    },
    emailId: {
        type: String,
        required: [true, "Email id is required"],
        unique: [true, "Email id already in use"]
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    role: {
        type: String,
        enum: {
            values: ["recruiter", "applicant", "admin"],
            message: `{VALUE} is not valid role, must be recruiter or applicant`
        },
        required: true
    },
    bio: {
        type: String,
        default: "",
        trim: true,
    },
    location: {
        type: String,
        trim: true,
    },
    skills: {
        type: [String],
    }
}, { timestamps: true })

userSchema.methods.generateJwtToken = function () {
    const jwtToken = jwt.sign({
        _id: this._id,
        role: this.role
    }, process.env.JWT_SECRETE)

    return jwtToken;
}

userSchema.methods.comparePassword = async function(newPassword) {
    const hashedPassword = this.password

    const isPasswordMatch = await bcrypt.compare(newPassword, hashedPassword)

    return isPasswordMatch
}

const User = mongoose.model("User", userSchema)

export default User