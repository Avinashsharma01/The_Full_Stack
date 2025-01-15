# Middleware Project

This project demonstrates the use of middleware in an Express.js application.

## Installation

1. Clone the repository:

    ```bash
    git clone <repository-url>
    cd Middleware
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

## Usage

1. Start the server:

    ```bash
    npm start
    ```

2. Open your browser and navigate to `http://localhost:3000`.

## Endpoints

-   `GET /`: Home page, returns "Hello World".
-   `GET /about`: About page, returns "This is about page".

## Middleware

-   Logs the current time and a custom message.
-   Logs the query parameters, HTTP method, and path of the request.

## Dependencies

-   `express`: ^4.21.1
-   `body-parser`: ^1.20.3

## License

This project is licensed under the ISC License.
