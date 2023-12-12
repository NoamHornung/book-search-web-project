import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useContext } from "react";
import { BooksContext } from "../context/BooksContext";

const SearchBar = () => {
  const { setSearchMade, setSearchQuery, setSelectedSort } =
    useContext(BooksContext);
  const [query, setQuery] = useState("");

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchQuery(query);
    setSearchMade(true);
    setQuery(""); // Clear the search bar
    setSelectedSort("Sort"); // Reset the sort option
  };

  return (
    <form className="search-bar-container" onSubmit={handleSubmit}>
      <input
        className="search-input"
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Search for books, authors..."
      />
      <button type="submit" className="search-button">
        <FaSearch id="search-icon" />
      </button>
    </form>
  );
};

export default SearchBar;