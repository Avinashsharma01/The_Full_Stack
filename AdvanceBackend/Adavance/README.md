# Advance Backend Project

This project is an advanced backend setup using Node.js, Express, and MongoDB.

## Setup

1. Clone the repository:

    ```bash
    git clone https://github.com/yourusername/advance-backend.git
    cd advance-backend
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Create a `.env` file in the root directory and add the following environment variables:

    ```dotenv
    PORT=4000
    MONGO_URI="mongodb://localhost:27017/advanceBackend"
    JWT_SECRET="secretkey"
    ```

4. Start the server:
    ```bash
    npm start
    ```

## Usage

-   The server will start on the port specified in the `.env` file (default is 4000).
-   The API endpoints are defined in the `router/users.router.js` file.

## Available Scripts

-   `npm start`: Starts the server.
-   `npm run dev`: Starts the server with nodemon for development.

## Project Structure

-   `index.js`: Entry point of the application.
-   `database/database.js`: Database connection setup.
-   `model/`: Contains Mongoose models.
-   `router/`: Contains route definitions.
-   `public/`: Static files served by the server.
-   `.env`: Environment variables.
-   `.gitignore`: Files and directories to be ignored by Git.

## Dependencies

-   `express`: Web framework for Node.js.
-   `mongoose`: MongoDB object modeling tool.
-   `dotenv`: Loads environment variables from a `.env` file.
-   `cors`: Middleware for enabling CORS.
-   `cookie-parser`: Middleware for parsing cookies.

## License

This project is licensed under the MIT License.

```
i am learing this form the shriyansh coding school

i have to start the learnig from the 3:18 minutes out of 4 hours ..... minutes of the course
```
