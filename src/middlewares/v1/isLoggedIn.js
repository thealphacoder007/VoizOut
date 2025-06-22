import jwt, { decode } from "jsonwebtoken"
import User from "../../models/v1/user.js"

export default async function (req, res, next) {
    const cookies = req.cookies

    if (cookies.token == undefined) {
        return res.status(401).send({
            error: "Unauthorized",
            message: "Pls login!"
        })
    }

    const { token } = cookies

    const decodedString = jwt.decode(token, process.env.JWT_SECRETE)
    const { _id } = decodedString

    const savedUser = await User.findById(_id).select("-password -isDeleted").lean()

    if (!savedUser) {
        return res.status(401).send({
            error: "Unauthorized",
            message: "Pls login!"
        })
    }

    req.user = savedUser

    next()

}