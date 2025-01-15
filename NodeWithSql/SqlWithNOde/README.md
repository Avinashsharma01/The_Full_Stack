# SQL with Node.js

This project demonstrates how to use Node.js with MySQL to create a simple backend application. It includes basic CRUD operations and uses environment variables for configuration.

## Prerequisites

-   Node.js
-   MySQL

## Installation

1. Clone the repository:

    ```bash
    git clone <repository-url>
    cd SqlWithNOde
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Create a `.env` file in the root directory and add your database configuration:
    ```dotenv
    PORT=5000
    HOST='localhost'
    USER='root'
    PASSWORD='root'
    DATABASE='avinash'
    DATABASE_PORT=3308
    ```

## Running the Application

Start the server:

```bash
npm start
```

The server will run on the port specified in the `.env` file (default is 5000).

## API Endpoints

### GET /

Returns a simple "Hello World" message.

### GET /api/getdata

Fetches all records from the `avi` table.

### POST /api/postdata

Inserts a new record into the `avi` table.

-   Request body:
    ```json
    {
        "id": "1",
        "name": "John Doe",
        "city": "New York"
    }
    ```

### PUT /api/putdata

Updates an existing record in the `avi` table.

-   Request body:
    ```json
    {
        "id": "1",
        "name": "Jane Doe",
        "city": "Los Angeles"
    }
    ```

## Project Structure

-   `index.js`: Entry point of the application.
-   `Database/Database.js`: Contains database connection configurations.
-   `Controller/Controller.js`: Contains the logic for handling API requests.
-   `Routes/routes.js`: Defines the API routes.
-   `.env`: Environment variables for configuration.
-   `.gitignore`: Specifies files and directories to be ignored by Git.
-   `package.json`: Contains project metadata and dependencies.
-   `package-lock.json`: Contains the exact versions of dependencies installed.

## License

This project is licensed under the ISC License.
