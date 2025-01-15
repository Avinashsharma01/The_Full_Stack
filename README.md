# Welcome to the mern stack beginner guide

## Folder Structure

The project is organized as follows:

```
FullStack/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── config/
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.js
│   │   ├── index.js
│   │   └── styles/
│   └── package.json
├── README.md
└── package.json
```

### Backend

-   **controllers/**: Contains the logic for handling requests and responses.
-   **models/**: Defines the data schema and interacts with the database.
-   **routes/**: Defines the API endpoints and links them to controllers.
-   **server.js**: The entry point for the backend server.
-   **config/**: Contains configuration files, such as database connection settings.

### Frontend

-   **public/**: Contains static files like index.html.
-   **src/**: Contains the React application source code.
    -   **components/**: Reusable UI components.
    -   **pages/**: Different pages of the application.
    -   **App.js**: The main component that sets up the routes.
    -   **index.js**: The entry point for the React application.
    -   **styles/**: Contains CSS files for styling the application.

### Root

-   **README.md**: This file, providing an overview of the project.
-   **package.json**: Lists dependencies and scripts for both frontend and backend.
