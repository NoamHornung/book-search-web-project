require('dotenv').config()

const express = require('express');
const mongoose = require('mongoose');
const booksRoute = require('./routes/books');
const userRoutes = require('./routes/user')
const listsRoutes = require('./routes/lists')

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use('/books', booksRoute);
app.use('/user', userRoutes);
app.use('/lists', listsRoutes);

// Simple GET API to accept GET request in "/" path 
app.get("/", (req, res) => {
  res.status(200).send("Hey, You are in my backend :)");
});

// connect to database
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    // listen for requests
    app.listen(PORT, () => {
      console.log('connected to db & listening on port', PORT)
    })
  })
  .catch((error) => {
    console.log(error)
  })