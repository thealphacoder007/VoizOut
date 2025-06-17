import dotenv from "dotenv"

dotenv.config()

import express from "express";
import cookieParser from "cookie-parser";
import connectToDb from "./config/db.js"
import authRouter from "./routes/v1/auth.js"
import userRouter from "./routes/v1/user.js"
import isLoggedIn from "./middlewares/v1/isLoggedIn.js";


const app = express()
const port = process.env.PORT || 3000


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.use("/auth", authRouter)
app.use("/api/v1/user", isLoggedIn, userRouter)

connectToDb()
    .then(() => {
        app.listen(port, () => {
            console.log("App is listening on port", port);
        })
    })
    .catch(err => {
        console.log(err);
    })
