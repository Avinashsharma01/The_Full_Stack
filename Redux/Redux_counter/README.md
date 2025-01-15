# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

-   [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
-   [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

# Redux Counter Project

This project is a simple counter application built with React and Redux, using Vite as the build tool.

## Project Structure

-   `index.html`: The main HTML file.
-   `src/`: Contains the source code for the application.
    -   `main.jsx`: The entry point for the React application.
    -   `store/`: Contains Redux store configuration and slices.
-   `node_modules/`: Contains all the npm dependencies.
-   `.gitignore`: Specifies files and directories to be ignored by git.
-   `package.json`: Contains project metadata and dependencies.
-   `package-lock.json`: Contains the exact versions of npm dependencies.
-   `vite.config.js`: Configuration file for Vite.
-   `eslint.config.js`: Configuration file for ESLint.

## Getting Started

### Prerequisites

-   Node.js (>= 18.0.0)
-   npm (>= 8.0.0)

### Installation

1. Clone the repository:

    ```sh
    git clone https://github.com/your-username/redux-counter.git
    cd redux-counter
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

### Running the Application

To start the development server:

```sh
npm run dev
```

The application will be available at `http://localhost:3000`.

### Building for Production

To build the application for production:

```sh
npm run build
```

The production-ready files will be in the `dist` directory.

### Linting

To run ESLint:

```sh
npm run lint
```

## License

This project is licensed under the MIT License.
