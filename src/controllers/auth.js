import { validateSignupData } from "../utils/dataValidations.js"
import User from "../models/user.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { jwtTokenMaxAge } from "../utils/constants.js"

export const loginController = async (req, res) => {
    try {
        
        const {emailId, password} = req.body

        const savedUser = await User.findOne({
            emailId: emailId
        })

        if(!savedUser) {
            throw new Error("Invalid credentials")
        }

        const isPasswordMatched = await bcrypt.compare(password, savedUser.password)

        if(!isPasswordMatched) {
            throw new Error("Invalid credentials")
        }

        const jwtToken = savedUser.generateJwtToken()

        res.cookie("token", jwtToken, {
            maxAge: jwtTokenMaxAge
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
        })

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
            maxAge: jwtTokenMaxAge
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