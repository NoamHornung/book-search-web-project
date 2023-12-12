const express = require("express");
const axios = require("axios");
const cors = require("cors");

const router = express.Router();

const BASE_URL = "https://www.googleapis.com/books/v1/volumes";

const API_KEY = "AIzaSyCKqjDto8L8Fp7TY4MPn4_Dg0_NiDttuA8";

router.use(cors());

// Search the query string in the google books api
router.get("/search", async (req, res) => {
  try {
    const { q } = req.query;

    const response = await axios.get(
      `${BASE_URL}?q=${q}&maxResults=20&key=${API_KEY}`
    );
    res.json(response.data.items);
  } catch (error) {
    console.error("Error searching for books:", error);
    res
      .status(500)
      .json({ error: "An error occurred while searching for books." });
  }
});

// Fetch a specific book using its id from the google books api
router.get("/fetch", async (req, res) => {
  try {
    const { bookID } = req.query;

    const response = await axios.get(`${BASE_URL}/${bookID}`);
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching book by ID:", error);
    res.status(500).json({ error: "Failed to fetch book details." });
  }
});

// Sort the books by title, author, newest, oldest
router.get("/sort", async (req, res) => {
  const { sortBy, searchQuery } = req.query;

  // Getting the books by the search query
  const response = await axios.get(
    `${BASE_URL}?q=${searchQuery}&maxResults=20&key=${API_KEY}`
  );
  let sortedBooks = response.data.items;

  // Implement sorting logic based on the 'sortBy' parameter
  if (sortBy === "Title") {
    sortedBooks.sort((a, b) => {
      const titleA = a.volumeInfo.title ? a.volumeInfo.title : "";
      const titleB = b.volumeInfo.title ? b.volumeInfo.title : "";
      // Compare titles, handling empty strings
      return titleA.localeCompare(titleB);
    });
  } else if (sortBy === "Author") {
    sortedBooks.sort((a, b) => {
      const authorA = a.volumeInfo.authors ? a.volumeInfo.authors[0] : ""; // Handle undefined authors
      const authorB = b.volumeInfo.authors ? b.volumeInfo.authors[0] : ""; // Handle undefined authors
      // Compare authors, handling empty strings
      return authorA.localeCompare(authorB);
    });
  } else if (sortBy === "Newest") {
    sortedBooks.sort(
      (a, b) =>
        new Date(b.volumeInfo.publishedDate || "9999-12-31") -
        new Date(a.volumeInfo.publishedDate || "9999-12-31")
    );
  } else if (sortBy === "Oldest") {
    sortedBooks.sort(
      (a, b) =>
        new Date(a.volumeInfo.publishedDate || "9999-12-31") -
        new Date(b.volumeInfo.publishedDate || "9999-12-31")
    );
  }

  res.json(sortedBooks);
});

module.exports = router;
