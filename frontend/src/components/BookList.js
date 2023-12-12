import React from "react";
import axios from "axios";
import { useContext } from "react";
import { BooksContext } from "../context/BooksContext";
import { useNavigate } from "react-router-dom";

const BackupImage =
  "https://books.google.com.br/googlebooks/images/no_cover_thumb.gif";

const BookList = () => {
  const {
    books,
    setBooks,
    searchMade,
    searchQuery,
    selectedSort,
    setSelectedSort,
  } = useContext(BooksContext);
  const navigate = useNavigate();

  const handleSortChange = async (event) => {
    const selectedSort = event.target.value;
    setSelectedSort(selectedSort);
    // a call to the backend to sort the books based on the selected sort option
    try {
      const response = await axios.get(`http://localhost:5000/books/sort`, {
        params: {
          sortBy: selectedSort,
          searchQuery: searchQuery,
        },
      });
      setBooks(response.data);
    } catch (error) {
      console.error("Error sorting books:", error);
    }
  };

  const handleMoreInfoClick = (book) => {
    // Navigate to the book details page for the clicked book
    navigate(`/book/${book.id}`, { state: { from: window.location.pathname } });
  };

  return (
    <div>
      {searchMade && ( // Only render the sort options if a search has been made
        <div className="sort-options">
          <select value={selectedSort} id="sort" onChange={handleSortChange}>
            <option disabled value="Sort">
              Sort
            </option>
            <option value="Newest">Newest</option>
            <option value="Oldest">Oldest</option>
            <option value="Title">Title</option>
            <option value="Author">Author</option>
          </select>
        </div>
      )}
      <div className="book-list">
        {books.map((book) => {
          return (
            <div key={book.id} className="book-card-container">
              <button
                className="more-info"
                onClick={() => handleMoreInfoClick(book)}
              >
                More Info
              </button>
              <img
                src={book.volumeInfo.imageLinks?.thumbnail || BackupImage}
                alt=""
              />
              <div className="description">
                <h2>{book.volumeInfo.title}</h2>
                <h3>Author: {book.volumeInfo.authors || "Unknown"}</h3>
                <p>
                  published:{" "}
                  {book.volumeInfo.publishedDate
                    ? new Date(book.volumeInfo.publishedDate).getFullYear()
                    : "Unknown"}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BookList;
