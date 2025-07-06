import { validateSignupData } from "../../utils/v1/dataValidations.js"
import User from "../../models/v1/user.js"
import validator from "validator"
import bcrypt from "bcrypt"

import { jwtTokenMaxAge } from "../../utils/v1/constants.js"

export const loginController = async (req, res) => {
    try {

        const { emailId, password } = req.body

        const savedUser = await User.findOne({
            emailId: emailId
        })

        if (!savedUser) {
            throw new Error("Invalid credentials")
        }

        const isPasswordMatched = await savedUser.comparePassword(password)

        if (!isPasswordMatched) {
            throw new Error("Invalid credentials")
        }

        const jwtToken = savedUser.generateJwtToken()

        res.cookie("token", jwtToken, {
            maxAge: jwtTokenMaxAge,
            secure: true,
            httpOnly: true,
            sameSite: "Strict"
        })

        res.send({
            message: "Login successful",
            user: savedUser
        })

    }
    catch (err) {
        res.status(401).send({
            error: "Unauthorized",
            message: "Invalid credentials"
        })
    }
}

export const signUpController = async (req, res) => {
    try {
        validateSignupData(req)

        const { name, role, emailId, password } = req.body

        const alreadyExists = await User.findOne({
            emailId
        }).select("-password -isDeleted").lean()

        if (alreadyExists) {
            throw new Error("User with this email id already exists")
        }

        const hashedPass = await bcrypt.hash(password, 11)
        const signupUser = new User({
            name, emailId, password: hashedPass, role
        })

        const savedUser = await signupUser.save()

        const jwtToken = savedUser.generateJwtToken()

        res.cookie("token", jwtToken, {
            maxAge: jwtTokenMaxAge,
            secure:true,
            sameSite:"Strict",
            httpOnly: true
        })

        res.send({
            message: "Signup successful",
            user: savedUser
        })
    }
    catch (err) {
        res.status(400).send({
            error: "Something went wrong",
            message: err.message
        })
    }
}

export const editPasswordController = async (req, res) => {
    try {
        const user = req.user
        const password = req.body.password

        if (!validator.isStrongPassword(password)) {
            throw new Error("Password must contain a lowercase , uppercase , digit and a special character")
        }

        const hashedPassword = await bcrypt.hash(password, 11)

        const updatedUser = await User.findByIdAndUpdate(user._id, {
            $set: {
                password: hashedPassword
            }
        })

        if (!updatedUser) {
            throw new Error("Something went wrong")
        }

        res.send({
            status: "success",
            message: "Password changed successfuly"
        })

    }
    catch (err) {
        res.status(400).send({
            error: "Something went wrong during updating the password",
            message: err.message
        })
    }
}

export const logoutController = async(req,res) => {
    try {
        res.cookie("token", null)

        res.send({
            message: "Logout successful",
        })
    }
    catch(err) {
        res.send({
            error: "Something went wrong",
            message: err.message
        })
    }
}