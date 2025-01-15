# File Upload with Cloudinary and Multer

This project demonstrates how to upload files to Cloudinary using Multer in a Node.js application.

## Project Structure

-   `CloudinaryMulter/`: Contains the main application code.
    -   `.env`: Environment variables for Cloudinary configuration.
    -   `.gitignore`: Files and directories to be ignored by Git.
    -   `Cloudinary.js`: Main server file with routes for uploading, listing, and deleting images.
    -   `daata.js`: Script for deleting a specific image from Cloudinary.
    -   `package.json`: Project dependencies and scripts.
    -   `package-lock.json`: Lockfile for project dependencies.
    -   `node_modules/`: Directory for installed Node.js modules.
    -   `views/`: Directory for EJS templates.
    -   `public/`: Directory for static files.

## Setup

1. Clone the repository:

    ```bash
    git clone <repository-url>
    cd FileUpload/CloudinaryMulter
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Create a `.env` file in the `CloudinaryMulter` directory with the following content:

    ```dotenv
    PORT=5000
    CLOUD_NAME=your_cloud_name
    API_KEY=your_api_key
    API_SECRET=your_api_secret
    ```

4. Start the server:
    ```bash
    npm start
    ```

## Usage

### Upload an Image

Send a POST request to `/upload` with a file in the `file` field.

### List Images

Send a GET request to `/list-images` to fetch URLs of all images in the `uploads` folder on Cloudinary.

### Delete an Image

Send a DELETE request to `/delete-image/:public_id` with the `public_id` of the image to delete.

## Scripts

### `daata.js`

A script to delete a specific image from Cloudinary. Update the `public_id` variable with the exact public ID of the image you want to delete and run the script:

```bash
node daata.js
```

## License

This project is licensed under the MIT License.
