import dotenv from "dotenv"

dotenv.config()

import express from "express";
import cookieParser from "cookie-parser";
import connectToDb from "./config/db.js"
import userRouter from "./routes/auth.js"


const app = express()
const port = process.env.PORT || 3000


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.use("/auth", userRouter)

connectToDb()
    .then(() => {
        app.listen(port, () => {
            console.log("App is listening on port", port);
        })
    })
    .catch(err => {
        console.log(err);
    })
