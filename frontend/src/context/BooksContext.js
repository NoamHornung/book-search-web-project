import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const BooksContext = createContext();

const BooksContextProvider = ({ children }) => {
  const [books, setBooks] = useState([]);
  const [searchMade, setSearchMade] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSort, setSelectedSort] = useState("Sort");

  useEffect(() => {
    // a call to the backend to search for books based on the search query when the search is made
    const fetchBooks = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/books/search?q=${searchQuery}`
        );
        setBooks(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error searching for books:", error);
      }
    };

    if (searchMade) {
      fetchBooks();
    }
  }, [searchQuery, searchMade]);

  return (
    <BooksContext.Provider
      value={{
        books,
        setBooks,
        searchMade,
        setSearchMade,
        searchQuery,
        setSearchQuery,
        selectedSort,
        setSelectedSort,
      }}
    >
      {children}
    </BooksContext.Provider>
  );
};

export default BooksContextProvider;
