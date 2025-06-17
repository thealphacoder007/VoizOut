export const getProfileController = async(req, res) => {
    try {
        const user = req.user

        res.send({
            user
        })
    }
    catch(err) {
        res.status(400).send({
            error: "Something went wrong",
            message: err.message
        })
    }
}