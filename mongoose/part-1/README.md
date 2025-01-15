# Mongoose Part-1

This project demonstrates basic CRUD operations using Mongoose with a MongoDB database.

## Installation

1. Clone the repository:
    ```sh
    git clone <repository-url>
    ```
2. Navigate to the project directory:
    ```sh
    cd mongoose/part-1
    ```
3. Install the dependencies:
    ```sh
    npm install
    ```

## Usage

1. Start the application:

    ```sh
    npm start
    ```

2. The application will connect to a MongoDB instance running at `mongodb://127.0.0.1:27017/part-1`.

## Scripts

-   `start`: Starts the application using `nodemon`.

## CRUD Operations

### Insert Many

Uncomment the `insertmany` function call in `index.js` to insert multiple user documents into the database.

### Find Data

Uncomment the `finddata` function call in `index.js` to retrieve all user documents from the database.

### Update Data

Uncomment the `updatedata` function call in `index.js` to update the age of users with the name "Brijesh".

### Delete Data

Uncomment the `deleteUser` function call in `index.js` to delete users with the name "Brijesh".

## License

This project is licensed under the ISC License.
