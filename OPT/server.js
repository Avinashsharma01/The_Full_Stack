const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const otpRouter = require("./route/otpRoute");
const connectToDb = require("./config/db");


app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/api", otpRouter)
const port = process.env.PORT || 4000
app.get("/", (req, res) => {
    res.send("Server is live")
})

app.listen(port, () => {
    connectToDb()
    console.log(`Server is running on port no ${port}`);
})
