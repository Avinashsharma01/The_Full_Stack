import dotenv from "dotenv"
dotenv.config()
import express from "express"
import path from "path"
import { fileURLToPath } from 'url'
import connectToDB from "./config/db.js"
import userRoute from "./route/userRoute.js"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

console.log(__filename, __dirname);
const app = express()

const port = process.env.PORT || 3000;

// Set EJS as template engine
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(express.json())

// Serve static files from public directory
app.use(express.static('public'))

app.get("/", (req, res) => {
    res.render('home', {
        appName: 'Authentication App'
    })
})

// Serve forgot password page
app.get("/forgot-password", (req, res) => {
    res.render('forgot-password', {
        appName: 'Authentication App',
        error: null,
        success: null,
        email: null
    })
})

// Serve reset password page
app.get("/reset-password/:token", (req, res) => {
    res.render('reset-password', {
        token: req.params.token,
        appName: 'Authentication App',
        error: null,
        success: null
    })
})

// All routes come here 
app.use("/api/v1/user", userRoute)


app.listen(port, () => {
    connectToDB()
    console.log(`Server is  running on port no ${port}`);
})