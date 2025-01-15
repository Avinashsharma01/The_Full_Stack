# SqlWithNode3

## Overview

SqlWithNode3 is a Node.js application that connects to a MySQL database and provides a simple web interface to display data from the database using Express and EJS.

## Features

-   Connects to a MySQL database
-   Displays data from the database on a web page
-   Uses Express for server-side logic
-   Uses EJS for templating

## Prerequisites

-   Node.js
-   MySQL

## Installation

1. Clone the repository:
    ```bash
    git clone <repository-url>
    ```
2. Navigate to the project directory:
    ```bash
    cd SqlWithNode3
    ```
3. Install the dependencies:
    ```bash
    npm install
    ```

## Configuration

1. Update the database configuration in `Database/database.js`:
    ```javascript
    const connection = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "root",
        database: "avinash",
        port: 3308,
    });
    ```

## Running the Application

1. Start the MySQL server.
2. Run the application:
    ```bash
    npm start
    ```
3. Open your browser and navigate to `http://localhost:3000`.

## Project Structure

-   `index.js`: Entry point of the application.
-   `Database/database.js`: Database connection configuration.
-   `views/`: Directory containing EJS templates.
-   `public/`: Directory containing static files.
-   `node_modules/`: Directory containing installed dependencies.
-   `.gitignore`: Git ignore file.
-   `package.json`: Project metadata and dependencies.
-   `package-lock.json`: Lockfile for dependencies.

## License

This project is licensed under the ISC License.
