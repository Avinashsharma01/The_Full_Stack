# Chat Application

This is a full-stack chat application built with Node.js, Express, MongoDB, and React.

## Project Structure

```
FullStack/
├── Chat/
│   ├── .env
│   ├── .gitignore
│   ├── package.json
│   ├── package-lock.json
│   ├── index.js
│   ├── Chat_UI/
│   │   ├── .gitignore
│   │   ├── package.json
│   │   ├── package-lock.json
│   │   ├── index.html
│   │   ├── eslint.config.js
│   │   └── src/
│   │       ├── main.jsx
│   │       └── ...other files
│   └── ...other files
```

## Setup Instructions

### Backend

1. Navigate to the `Chat` directory:

    ```sh
    cd Chat
    ```

2. Install the dependencies:

    ```sh
    npm install
    ```

3. Create a `.env` file and add the following environment variables:

    ```
    PORT=4000
    DATABASE_URL="mongodb://127.0.0.1:27017/whatsapp"
    DBS_URL="mongodb+srv://avinashsharma31384:root@avinash.3qwizgn.mongodb.net/whatsapp"
    ```

4. Start the backend server:
    ```sh
    npm start
    ```

### Frontend

1. Navigate to the `Chat_UI` directory:

    ```sh
    cd Chat_UI
    ```

2. Install the dependencies:

    ```sh
    npm install
    ```

3. Start the frontend development server:
    ```sh
    npm run dev
    ```

## Usage

-   The backend server will be running on `http://localhost:4000`.
-   The frontend application will be running on `http://localhost:3000`.

## Scripts

### Backend

-   `npm start`: Starts the backend server.

### Frontend

-   `npm run dev`: Starts the frontend development server.
-   `npm run build`: Builds the frontend application for production.
-   `npm run lint`: Runs ESLint to check for linting errors.

## License

This project is licensed under the MIT License.
