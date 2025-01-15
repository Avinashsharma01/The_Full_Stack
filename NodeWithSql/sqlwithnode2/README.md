# SQL with Node.js Project

This project demonstrates how to use Node.js with MySQL to create, insert, and retrieve data from a database. It uses Express.js for the server and Faker.js to generate random user data.

## Project Structure

-   `index.js`: Main entry point of the application.
-   `faker.js`: Generates random user data using Faker.js.
-   `Database/Database.js`: Contains functions to interact with the MySQL database.
-   `avi.sql`: SQL script for database operations.
-   `.gitignore`: Specifies files and directories to be ignored by Git.
-   `package.json`: Lists project dependencies and scripts.
-   `package-lock.json`: Locks the versions of project dependencies.

## Setup Instructions

1. **Clone the repository:**

    ```bash
    git clone <repository-url>
    cd sqlwithnode2
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

3. **Set up the database:**

    - Ensure MySQL is installed and running.
    - Create a database named `avinash`.
    - Update the database connection details in `Database/Database.js` if necessary.

4. **Run the application:**
    ```bash
    npm start
    ```

## Usage

-   The application runs an Express server on port 4000.
-   Access the root endpoint (`/`) to retrieve data from the `faker` table in the database.

## Scripts

-   **Create Table:**
    Uncomment and run the `createTable` function in `index.js` to create the `faker` table.
-   **Insert Data:**
    Uncomment and run the `insertData` function in `index.js` to insert random user data into the `faker` table.
-   **Show Table:**
    Uncomment and run the `showTable` function in `index.js` to display all tables in the database.
-   **Show Data:**
    Uncomment and run the `showData` function in `index.js` to display data from the `faker` table.

## Dependencies

-   `@faker-js/faker`: ^9.0.0
-   `cors`: ^2.8.5
-   `dotenv`: ^16.4.5
-   `ejs`: ^3.1.10
-   `express`: ^4.21.0
-   `mysql2`: ^3.11.2

## License

This project is licensed under the ISC License.
