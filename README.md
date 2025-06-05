📝 Blog API

A simple and beginner-friendly Blog API built with **Node.js**, **Express**, and **MongoDB** using **Mongoose**.

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)

## 🚀 Features

- ✅ Create, Read, Update, and Delete Blog items
- 🧱 RESTful API structure
- 📦 MongoDB integration using Mongoose
- 🧪 Tested with Postman
- 🌱 Beginner-friendly and clean codebase

## 🛠️ Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- dotenv

## 📮 API Endpoints

| Method | Route             | Description                              |
|--------|-------------------|------------------------------------------|
| POST   | `/api/users`      | Create a user                            |
| POST   | `/api/posts`      | Create a post                            |
| POST   | `/api/comments`   | Create a comment                         |
| GET    | `/api/users`      | Get all users                            |
| GET    | `/api/posts`      | Get all posts                            |
| GET    | `/api/posts/:id`  | Get a get single post with all comments  |
| GET    | `/api/comments`   | Get all comments                         |
| PUT    | `/api/posts/:id`  | Update post                              |
| DELETE | `/api/posts/:id`  | Delete post and comments                 |

## 🔧 Setup Instructions

1. **Clone the repository**

    ```
    git clone https://github.com/Aashirwad10/Blog-api
    cd Blog-api
    ```
    
2. **Install dependencies**

    ```
    npm install
    ```

3. **Create `.env` file**

    - Create a `.env` file in the root folder
    - Add your MongoDB URI like this:

      ```
      MONGO_URI= mongodb+srv://abcdefghijklmnopqrstuvwxyz
      ```

4. **Run the server**

    ```
    npm run dev
    ```

Server runs on `http://localhost:5000` (or your specified port)

## 📸 API Examples
    
Here are some example requests and responses using Postman to demonstrate how the API works:

1. **POST Create a user**
    - `http://localhost:5000/api/users`  

    ![Create Todo](./assets/createUser.png)

2. **POST Create a post**
    - `http://localhost:5000/api/posts`  

    ![Create Todo](./assets/createPost.png)

3. **POST Create a comment**
    - `http://localhost:5000/api/comments`  

    ![Create Todo](./assets/createComment.png)

4. **GET Get all users**
    - `http://localhost:5000/api/users`  

    ![Create Todo](./assets/getUser.png)

5. **GET Get all posts**
    - `http://localhost:5000/api/posts`  

    ![Create Todo](./assets/getPost.png)

6. **GET Get a get single post with all comments**
    - `http://localhost:5000/api/posts/684185d50e860094dd7e2473`  

    ![Create Todo](./assets/getSinglePost.png)

7. **GET Get all comments**
    - `http://localhost:5000/api/posts/684185d50e860094dd7e2473`  

    ![Create Todo](./assets/getComment.png)
