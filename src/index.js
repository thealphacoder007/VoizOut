import dotenv from "dotenv"

dotenv.config()

import express from "express";

const app = express()
const port = process.env.PORT || 3000


app.get("/",(req,res) => {
    res.send(`${port} is port number`)
})

app.listen(port, () => {
    console.log("App is listening on port",port);
})