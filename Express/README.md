# Express Project

This is a simple Express.js project demonstrating basic routing, middleware, and error handling.

## Prerequisites

-   Node.js
-   npm or pnpm

## Installation

1. Clone the repository:

    ```bash
    git clone <repository-url>
    cd express
    ```

2. Install dependencies:
    ```bash
    pnpm install
    ```

## Running the Application

Start the server:

```bash
pnpm start
```

The server will be running on `http://localhost:3000`.

## Endpoints

-   `GET /` - Renders the index page.
-   `GET /error` - Throws an error to demonstrate error handling.
-   `POST /about` - Logs the request body and responds with "About Us".
-   `GET /hello/:user/:id` - Greets the user with the provided username and ID.
-   `GET /search` - Searches based on query parameters `q`, `course`, and `session`.

## Error Handling

The application includes a default error handler that renders an error page when an error occurs.

## License

This project is licensed under the ISC License.
