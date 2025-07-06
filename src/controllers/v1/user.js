import User from "../../models/v1/user.js"
import { editRestrictedFields } from "../../utils/v1/constants.js"
import { validateEditData } from "../../utils/v1/dataValidations.js"
import validator from "validator"
import bcrypt from "bcrypt"

export const getProfileController = async (req, res) => {
    try {
        const user = req.user

        res.send({
            user
        })
    }
    catch (err) {
        res.status(400).send({
            error: "Something went wrong",
            message: err.message
        })
    }
}


export const editProfileController = async (req, res) => {
    try {
        const user = req.user

        validateEditData(req)

        let updates = {}
        for (let key in req.body) {
            if (!(editRestrictedFields.includes(key))) {
                updates[key] = req.body[key]
            }
        }

        if(updates.skills) {
            updates.skills = updates.skills.split(",")
        }


        const updatedUser = await User.findOneAndUpdate(
            {
                _id: user._id,
            },
            { $set: updates },
            { new: true, runValidators: true }
        ).select("-password").lean()

        res.json({
            message: "Profile edited successfully",
            data: updatedUser
        })

    }
    catch (err) {
        res.status(400).json({
            success: false,
            message: err.message
        })
    }
}

export const getUserProfileController = async(req,res) => {
    try {
        const userId = req.params.userId

        if(!userId) {
            throw new Error("Invalid user id")
        }

        const user = await User.findById(userId).select("-password -emailId -role -createdAt -updatedAt").lean()

        if(!user) {
            throw new Error("No user found")
        }

        res.send({
            data: user
        })
    }
    catch(err) {
        res.status(400).send({
            status: "fail",
            message: err.message
        })
    }
}