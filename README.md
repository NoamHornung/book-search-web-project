# BookSearch Web App
## [The bookSearch web app](https://book-search-project-noam.netlify.app/)
Welcome to BookSearch Engine, a web application that allows users to search for books using the Google Books API. This application comes with a user-friendly frontend and a powerful backend, providing features such as book search, detailed book information, user accounts, and personalized book lists.

## Features:
### 1. Book Search
Users can easily search for books by entering keywords, titles, and authors. The application queries the Google Books API to retrieve relevant information and presents the user with a list of search results, that can be sorted by title, author, and release date.

### 2. Book Details
Selecting a book from the search results provides more detailed information about the selected book. Information includes the book's title, author, description, and other relevant details.

### 3. User Authentication
BookSearch offers user authentication, allowing users to create accounts, log in, and enjoy personalized features. User accounts ensure a secure and customizable experience for managing book lists.

### 4. Book Lists
Registered users can create and manage lists of their favorite books. These lists can be used to organize books based on genres, reading preferences, or any other criteria. Users can easily add or remove books from their lists.
Users can keep track of books they intend to read by adding them to a personalized watchlist. This feature helps users prioritize their reading choices and discover new books to explore in the future.

## Technologies Used
- ### Frontend:
  - HTML, CSS, JavaScript
  - React.js for building the user interface
  - Axios for handling API requests
  - React Router page routing

- ### Backend:
  - Node.js and Express.js for server-side development
  - MongoDB for database storage
  - JSON Web Token for user authentication
  
## Getting Started
### Prerequisites
- Node.js and npm installed
- MongoDB installed and running
- Google Books API key: Get it [here](https://developers.google.com/books/docs/v1/getting_started?hl=he)
- Generating a JWT Secret: You can generate a secret using a tool like [RandomKeygen](https://randomkeygen.com/).
- MongoDB URI: If you don't have a MongoDB instance, you can create a free account on [MongoDB Atlas](https://www.mongodb.com/atlas/database) and obtain the connection string from there.

### Installation
1. Clone the repository:

```bash
git clone https://github.com/NoamHornung/book-search-web-project

```
2. Add the JSON Web Token Secret:
Create a .env file in the backend folder and and set your secret for JWT
```bash
SECRET=your-jwt-secret
```
3. Add the MongoDB URI:
Still in the .env file, add your MongoDB connection string. Replace your-mongodb-connection-string with your actual MongoDB URI.
```bash
MONGODB_URI="your-mongodb-connection-string"
```

4. Install dependencies:
```bash
npm install
```
5. Navigate to the backend directory:
```bash
cd backend
```

6. Run the backend application:
```bash
npm run devStart
```
7. open a new terminal
8. Navigate to the frontend directory:
```bash
cd frontend
```

9. Run the frontend application:
```bash
npm start
```
10. Open your web browser and go to http://localhost:3000 to access the BookSearch web app.
