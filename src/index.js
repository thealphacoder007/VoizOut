import dotenv from "dotenv"

dotenv.config()

import express from "express";
import cookieParser from "cookie-parser";
import connectToDb from "./config/db.js"
import authRouter from "./routes/v1/auth.js"
import userRouter from "./routes/v1/user.js"
import jobRouter from "./routes/v1/job.js"
import experienceRouter from "./routes/v1/experience.js"
import cors from "cors"


const app = express()
const port = process.env.PORT || 3000

app.use(cors({
    // origin: "https://voizout-ui.onrender.com",
    origin: "http://localhost:5173",
    credentials: true
}))

app.get("/health", (req,res) => {
    res.send({
        message: "App is up"
    })
})


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.use("/auth", authRouter)
app.use("/api/v1/user", userRouter)
app.use("/api/v1/opportunities", jobRouter)
app.use("/api/v1/experience", experienceRouter)



connectToDb()
    .then(() => {
        app.listen(port, () => {
            console.log("App is listening on port", port);
        })
    })
    .catch(err => {
        console.log(err);
    })
