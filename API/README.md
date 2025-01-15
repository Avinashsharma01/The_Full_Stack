# API Project Documentation

## Overview

This project is a backend API built using Node.js, Express, and MongoDB. It provides endpoints to manage and retrieve product data.

## Getting Started

### Prerequisites

-   Node.js (v14 or higher)
-   npm (v6 or higher)
-   MongoDB instance

### Installation

1. Clone the repository:
    ```sh
    git clone <repository-url>
    ```
2. Navigate to the project directory:
    ```sh
    cd /c:/Desktop/THE BACKEND/FullStack/API/API-1
    ```
3. Install the dependencies:
    ```sh
    npm install
    ```

### Configuration

1. Create a `.env` file in the root directory and add the following environment variables:
    ```dotenv
    PORT=3456
    MONGO_URL=mongodb+srv://<username>:<password>@<cluster-url>/<database>?retryWrites=true&w=majority
    ```

### Running the Application

1. Start the server:
    ```sh
    npm start
    ```
2. The server will run on the port specified in the `.env` file (default is 3456).

## API Endpoints

### Home Route

-   **URL:** `/api`
-   **Method:** `GET`
-   **Description:** Returns a welcome message.
-   **Response:**
    ```json
    {
        "message": "Hello World"
    }
    ```

### Get All Data

-   **URL:** `/api/data`
-   **Method:** `GET`
-   **Description:** Retrieves all product data based on query parameters.
-   **Query Parameters:**
    -   `price` (optional): Filter by price.
    -   `rating` (optional): Filter by rating.
    -   `rate` (optional): Filter by rating rate.
    -   `count` (optional): Filter by rating count.
    -   `id` (optional): Filter by product ID.
-   **Response:**
    ```json
    {
        "allData": [ ... ]
    }
    ```

### Get Product Data by Price

-   **URL:** `/api/product`
-   **Method:** `GET`
-   **Description:** Retrieves product data with a specific price.
-   **Response:**
    ```json
    {
        "allData": [ ... ]
    }
    ```

### Fake API Route

-   **URL:** `/fake`
-   **Method:** `GET`
-   **Description:** Retrieves all fake product data sorted by title.
-   **Response:**
    ```json
    [ ... ]
    ```

## Models

### Fake Product Model

-   **Schema:**
    ```javascript
    const productSchema = new mongoose.Schema({
        id: { type: Number, required: true, unique: true },
        title: { type: String, required: true },
        price: { type: Number, required: true },
        description: { type: String, required: true },
        category: { type: String, required: true },
        image: { type: String, required: true },
        rating: {
            rate: { type: Number, required: true },
            count: { type: Number, required: true },
        },
    });
    ```

## License

This project is licensed under the ISC License.
