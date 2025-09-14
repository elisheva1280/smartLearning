# smartLearning - AI-Powered Learning Platform (Minimal MVP)

-----

## Project Description

This project aims to create a minimal viable product (MVP) learning platform that allows users to select learning topics (by category and subcategory), send requests to an AI to receive customized lessons, and view their learning history. The platform includes a backend with a REST API, a database, AI integration, and a basic user interface (Dashboard UI). **Additionally, this project includes Pagination and Filtering capabilities in the Admin Dashboard.**

The goal is to evaluate skills in software architecture, API integration, modular code organization, and delivering a quality product.

-----

## 🚀 Technologies

  * **Languages/Frameworks**: Node.js (Backend), React (Frontend)
  * **Databases**: MongoDB
  * **Backend**: Express, Mongoose (for MongoDB), JWT (for authentication), CORS, bcryptjs, dotenv, TypeScript, Axios
  * **Frontend**: React, React Router, Bootstrap, Axios
  * **Third-Party Services**: OpenAI API

-----

## 🛠️ Prerequisites

Ensure the following components are installed on your machine before starting the installation:

  * **Node.js**: Version 18 or higher
  * **npm**: Node.js package manager
  * **MongoDB**: Make sure a MongoDB server is running (you can install it locally or use a cloud service like MongoDB Atlas).

-----

## 💡 Installation and Setup Instructions

1.  **Clone the Repository**:

    ```bash
    git clone <https://github.com/elisheva1280/smartLearning>
    cd miniMVPproject
    ```

2.  **Install Server Dependencies**:
    Navigate to the `server` folder and install the required packages:

    ```bash
    cd server
    npm install
    ```

3.  **Install Client Dependencies**:
    Navigate to the `client` folder and install the required packages:

    ```bash
    cd ../client
    npm install
    ```

4.  **Set Up Environment Variables**:
    In the `server` folder, create a file named `.env` by copying the example file `config/.env.example` (if it exists):

    ```bash
    cp .env.example .env
    ```

5.  **Edit the `.env` File**:
    Open the `.env` file and add your keys and connection strings. Make sure the server port is set to **3001**:

    ```env
    PORT=3001 # Note: This is the port for the server (Backend)
    OPENAI_API_KEY=<your_OpenAI_key>
    MONGODB_URI=<your_MongoDB_connection_string>
    JWT_SECRET=<a_strong_secret_key_for_JWT>
    ```

    **Note**: Ensure MongoDB is running and accessible from the provided URI.

6.  **Start the Server**:
    Start the server from the `server` folder:

    ```bash
    npm start
    ```

    The server will run on port **3001** (`http://localhost:3001`).

7.  **Start the Client**:
    Open a new terminal, navigate to the `client` folder, and start the client:

    ```bash
    cd ../client
    npm start
    ```

    The application (frontend) will be available at: `http://localhost:3000`.
    Main pages include: `http://localhost:3000/Learning`, `http://localhost:3000/Login`, `http://localhost:3000/Register`, and others.

-----

## 🗺️ API Endpoints (Backend)

The server exposes the following endpoints for communication (the server runs on port **3001**):

  * `POST` [`http://localhost:3001/api/auth/register`](https://www.google.com/search?q=%5Bhttps://www.google.com/search%3Fq%3Dhttp://localhost:3001/api/auth/register%5D\(https://www.google.com/search%3Fq%3Dhttp://localhost:3001/api/auth/register\)): Registers a new user.
  * `POST` [`http://localhost:3001/api/auth/login`](https://www.google.com/search?q=%5Bhttps://www.google.com/search%3Fq%3Dhttp://localhost:3001/api/auth/login%5D\(https://www.google.com/search%3Fq%3Dhttp://localhost:3001/api/auth/login\)): Logs in a user and receives a JWT token.
  * `GET` [`http://localhost:3001/api/categories`](https://www.google.com/search?q=%5Bhttps://www.google.com/search%3Fq%3Dhttp://localhost:3001/api/categories%5D\(https://www.google.com/search%3Fq%3Dhttp://localhost:3001/api/categories\)): Retrieves a list of existing learning categories.
  * `GET` [`http://localhost:3001/api/categories/:categoryId/subcategories`](https://www.google.com/search?q=%5Bhttps://www.google.com/search%3Fq%3Dhttp://localhost:3001/api/categories/:categoryId/subcategories%5D\(https://www.google.com/search%3Fq%3Dhttp://localhost:3001/api/categories/:categoryId/subcategories\)): Retrieves subcategories for a specific category.
  * `POST` [`http://localhost:3001/api/lessons`](https://www.google.com/search?q=%5Bhttps://www.google.com/search%3Fq%3Dhttp://localhost:3001/api/lessons%5D\(https://www.google.com/search%3Fq%3Dhttp://localhost:3001/api/lessons\)): Creates a new lesson. It receives a prompt (request) from the user (including category and subcategory), sends it to the OpenAI API, and returns the response.
  * `GET` [`http://localhost:3001/api/users/:userId/lessons`](https://www.google.com/search?q=%5Bhttps://www.google.com/search%3Fq%3Dhttp://localhost:3001/api/users/:userId/lessons%5D\(https://www.google.com/search%3Fq%3Dhttp://localhost:3001/api/users/:userId/lessons\)): Retrieves all lessons and prompt history for a specific user.
  * `GET` [`http://localhost:3001/api/admin/users`](https://www.google.com/search?q=%5Bhttps://www.google.com/search%3Fq%3Dhttp://localhost:3001/api/admin/users%5D\(https://www.google.com/search%3Fq%3Dhttp://localhost:3001/api/admin/users\)): (For administrators) Retrieves a list of all users, with support for Pagination and Filtering.
  * `GET` [`http://localhost:3001/api/admin/prompts`](https://www.google.com/search?q=%5Bhttps://www.google.com/search%3Fq%3Dhttp://localhost:3001/api/admin/prompts%5D\(https://www.google.com/search%3Fq%3Dhttp://localhost:3001/api/admin/prompts\)): (For administrators) Retrieves a list of all sent prompts, with support for Pagination and Filtering.

-----

## 🌐 Main Frontend Routes

Here is a list of the key pages accessible in the platform's user interface:

  * [`http://localhost:3000/`](https://www.google.com/search?q=%5Bhttps://www.google.com/search%3Fq%3Dhttp://localhost:3000/%5D\(https://www.google.com/search%3Fq%3Dhttp://localhost:3000/\)): The application's home page.
  * [`http://localhost:3000/Login`](https://www.google.com/search?q=%5Bhttps://www.google.com/search%3Fq%3Dhttp://localhost:3000/Login%5D\(https://www.google.com/search%3Fq%3Dhttp://localhost:3000/Login\)): Login page for existing users.
  * [`http://localhost:3000/Register`](https://www.google.com/search?q=%5Bhttps://www.google.com/search%3Fq%3Dhttp://localhost:3000/Register%5D\(https://www.google.com/search%3Fq%3Dhttp://localhost:3000/Register\)): Registration page for new users.
  * [`http://localhost:3000/Learning`](https://www.google.com/search?q=%5Bhttps://www.google.com/search%3Fq%3Dhttp://localhost:3000/Learning%5D\(https://www.google.com/search%3Fq%3Dhttp://localhost:3000/Learning\)): The main learning page where users select topics and send requests to the AI.
  * [`http://localhost:3000/HistoryPage`](https://www.google.com/search?q=%5Bhttps://www.google.com/search%3Fq%3Dhttp://localhost:3000/HistoryPage%5D\(https://www.google.com/search%3Fq%3Dhttp://localhost:3000/HistoryPage\)): Displays the user's lesson and prompt history.
  * [`http://localhost:3000/AdminPanel`](https://www.google.com/search?q=%5Bhttps://www.google.com/search%3Fq%3Dhttp://localhost:3000/AdminPanel%5D\(https://www.google.com/search%3Fq%3Dhttp://localhost:3000/AdminPanel\)): The admin dashboard, which allows for managing users and AI requests.
  * [`http://localhost:3000/AIResponse`](https://www.google.com/search?q=%5Bhttps://www.google.com/search%3Fq%3Dhttp://localhost:3000/AIResponse%5D\(https://www.google.com/search%3Fq%3Dhttp://localhost:3000/AIResponse\)): Likely a page that displays the AI's response to a specific prompt.

-----

## 📂 Project Structure (Architecture)

The project is organized in a modular structure with clearly separated layers, using TypeScript on the backend:

  * `client/`: The React frontend code.
      * `src/`: Client source code files.
          * `component/`: Various React components (e.g., AdminPanel, AIResponse, HistoryPage, Home, Learning, Login, Register, Try, UserList).
          * `context/`: Global State Management in React.
          * Main files: `App.js`, `index.js`, and others.
  * `server/`: The Node.js/Express backend code.
      * `src/`: Server source code files, written in JavaScript and TypeScript.
          * `config/`: Configuration files (like `db.ts` / `db.js` for database connection).
          * `controllers/`: Business logic that handles requests from the routes (e.g., `categoryController`, `openaiController`, `promptController`, `userController`). Both JS and TS versions exist.
          * `middleware/`: Logic for authentication (JWT), error handling, etc.
          * `models/`: MongoDB (Mongoose) schema definitions for `users`, `categories`, `sub_categories`, `prompts`.
          * `routes/`: Definition of API endpoints.
          * `scripts/`: Additional files, possibly for utilities or run commands.
          * `types/`: Type definitions for TypeScript.
          * Main files: `index.ts` / `index.js`, and others.

-----

## 🌐 Example Usage Scenario

A user logs into the system, selects a category and subcategory (for example, "Mathematics" -\> "Algebra" -\> "Teach me the basics"). The request is sent to the AI, and the system returns a lesson. The user can later return to their dashboard to view all their lessons and history.

-----

## 🔑 Security and Configuration Management

  * **Authentication**: JWT (JSON Web Tokens) is used for user authentication.
  * **Environment Variables**: Configuration is managed using a `.env` file and the `dotenv` package to keep sensitive API keys and connection details secure.

-----

## 🤝 Credits

This project was developed by **Elisheva Cohen**.