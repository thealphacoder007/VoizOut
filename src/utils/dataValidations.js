import validator from "validator"

const signupDataInvalid = "Invalid signup data"

export const validateSignupData = (req) => {
    const { name, emailId, password, role } = req
    if (!name || !emailId || !password) {
        throw new Error({
            error: signupDataInvalid,
            message: "Name, email and password are required"
        })
    }

    if (name.trim().length < 3) {
        throw new Error({
            error: signupDataInvalid,
            message: "Name must have atleast 3 characters"
        })
    }

    if(!validator.isEmail(emailId)) {
        throw new Error("Enter valid email id")
    }

    if(!validator.isStrongPassword(password)) {
        throw new Error("Password must contain at least a lowercase,uppercase,number and a special character")
    }

    


}