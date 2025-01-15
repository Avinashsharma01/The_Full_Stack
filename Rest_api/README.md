# Rest API Project

This project is a simple REST API built with Express.js and MongoDB. It includes basic CRUD operations for managing posts.

## Setup

1. Clone the repository:

    ```bash
    git clone <repository-url>
    cd Rest_api
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Create a `.env` file in the root directory and add your MongoDB connection string:

    ```env
    MONGODB_URI=<your-mongodb-uri>
    ```

4. Start the server:
    ```bash
    npm start
    ```

## Usage

### Available Routes

-   **GET /**: Returns a "Hello World" message.
-   **GET /post**: Renders a list of posts.
-   **GET /post/create**: Renders a form to create a new post.
-   **POST /post/create**: Creates a new post.
-   **GET /post/:id**: Renders a specific post by ID.
-   **DELETE /post/delete/:id**: Deletes a post by ID.
-   **PATCH /post/update/:id**: Updates a post by ID (currently not implemented).

### Example Data

The initial data includes the following posts:

```json
[
    { "id": "1", "name": "John Doe", "age": 25 },
    { "id": "2", "name": "Jane Doe", "age": 22 },
    { "id": "3", "name": "Jim Doe", "age": 30 },
    { "id": "4", "name": "Jill Doe", "age": 35 },
    { "id": "5", "name": "Jack Doe", "age": 40 }
]
```

## License

This project is licensed under the MIT License.
