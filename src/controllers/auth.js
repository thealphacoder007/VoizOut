import { validateSignupData } from "../utils/dataValidations"
import User from "../models/user"
import bcrypt from "bcrypt"

export const loginController = async (req,res) => {
    try {
        const token = req.cookies.token
        if(!token) {
            res.send({
                error: "Login error",
                message: "Invalid token! Pls login"
            })
        }
        
    }
    catch(err) {

    }
}

export const signUpController = async(req,res) => {
    try {
        const {name,role, emailId, password} = req.body

        validateSignupData()

        const alreadyExists = await User.find({
            emailId
        })

        if(alreadyExists) {
            throw new Error("User with this email id already exists")
        }

        const hashedPass = await bcrypt.hash(password, 11)
        const signupUser = new User({

        })
    }
    catch(err) {
        res.status(400).send({
            error: "Something went wrong",
            message: err.message
        })
    }
}