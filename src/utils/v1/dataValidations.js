import validator from "validator"
import { editRestrictedFields, validJobTypes, validRoles } from "./constants.js"

const signupDataInvalid = "Invalid signup data"

export const validateSignupData = (req) => {
    const { name, emailId, password, role } = req.body

    if (!name || !emailId || !password) {
        throw new Error("Name, email and password are required")
    }

    if (name.trim().length < 3) {
        throw new Error("Name must have atleast 3 characters")
    }

    if (!validator.isEmail(emailId)) {
        throw new Error("Enter valid email id")
    }

    if (!validator.isStrongPassword(password)) {
        throw new Error("Password must contain at least a lowercase,uppercase,number and a special character")
    }

    if (!validRoles.some(aValidRole => aValidRole == role)) {
        throw new Error(`${role} is not a valid role, it must be either applicant or recruiter`)
    }


}

export const validateEditData = (req) => {
    let requestedUpdates = req.body

    for (let key in requestedUpdates) {
        if (editRestrictedFields.includes(key)) {
            throw new Error("Cannot edit field " + key)
        }
    }
}


export const validateAddNewJobData = function (req) {
    const { title, description, deadline, skills, company, vacancies, location, experience, type, industry } = req.body
    
    if (!title || !description || !deadline || !company || !type || !industry || !skills) {
        throw new Error("All required fields must be provided")
    }

    if(skills.trim() == 0) {
        throw new Error("Atleast one skill must be mentioned")
    }


    if(!(validJobTypes.includes(type))) {
        throw new Error(`${type} is not a valid job type`)
    }

    if(company.trim().length == 0) {
        throw new Error("Company name required")
    }

}