# Image Upload App

## Overview

This project consists of two main components:

-   **Backend:** An Express.js server
-   **Frontend:** A Nuxt.js application

This README will guide you through the setup, development, and deployment of both components.

## Prerequisites

Before you start, make sure you have the following installed:

-   [Node.js](https://nodejs.org/) (v12.x or higher)
-   [npm](https://www.npmjs.com/) (comes with Node.js)
-   [Git](https://git-scm.com/)


## Getting Started

### Backend Setup

1.  Navigate to the `backend` folder:
    ```bash
    cd backend
    ```

2. Install the backend dependencies:
    ```bash
    npm install
    ```

3.  Create a `.env` file in the root directory of the project and add the following environment variables:
    ```bash
    PORT=
    GD_FOLDER_ID=
    GOOGLE_API_KEY_BASE64=
    ```
    -   `PORT`: The port number on which the server will run.
    -   `GD_FOLDER_ID`: The Google Drive folder ID where the uploaded images will be stored.
    -   `GOOGLE_API_KEY_BASE64`: The base64 encoded Google API key.

4.  Start the server:
    ```bash
    npm run dev
    ```

    or

    ```bash
    npm run build
    npm run start
    ```

### Frontend Setup
1,  Navigate to the `frontend` folder:
    ```bash
    cd frontend
    ```

2. Install the frontend dependencies:
    ```bash
    npm install
    ``` 

3.  Start the frontend:
    ```bash
    npm run dev
    ```

    or

    ```bash
    npm run build
    npm run start
    ```

4.  Configure environment variables if needed (create a `.env` file in the root directory of the project and add the following environment variables):
    ```bash
    BASE_API=
    ```
    
5.  Open the frontend in your browser:
    ```bash
    open http://localhost:3000
    ```

## Deployment

The project has already been deployed and is available for viewing at the following URL:

https://file-upload-project-frontend.vercel.app/