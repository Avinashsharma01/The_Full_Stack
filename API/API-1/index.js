import express from 'express'; // Importing the express module
import router from './routes/myRoute.js'; // Importing the router from the specified file
import path from 'path'; // Importing the path module
import dotenv from 'dotenv'; // Importing the dotenv module to load environment variables
dotenv.config(); // Loading environment variables from a .env file
import connectDB from './Database/database.js'; // Importing the database connection function
import cors from 'cors'; // Importing the CORS middleware
import fakeRouter from './routes/fakeRoute.js';

const app = express(); // Creating an instance of express
const port = process.env.PORT || 34545; // Setting the port from environment variables or default to 34545

app.use(cors()); // Enabling CORS for all routes
app.use(express.json()); // Middleware to parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded bodies
app.use(express.static(path.join(path.resolve(), "public"))); // Serving static files from the 'public' directory

// Routes start from here
app.use("/api", router); // Using the router for all routes starting with /api


app.use("/fake", fakeRouter)
const server = async () => {
    await connectDB(process.env.MONGO_URL); // Connecting to the database
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`); // Starting the server and logging a message
    });
}
server(); // Calling the server function to start the server