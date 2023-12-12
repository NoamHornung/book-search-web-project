import React, { useEffect, useState } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import axios from "axios";
import AddToList from "../components/AddToList";

const BookDetailsPage = () => {
  const [book, setBook] = useState(null);
  const { id } = useParams();
  const location = useLocation();

  useEffect(() => {
    // a call to the backend to fetch the book details when the id changes
    const fetchBookDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/books/fetch?bookID=${id}`
        );
        setBook(response.data);
      } catch (error) {
        console.error("Error fetching book details:", error);
      }
    };

    fetchBookDetails();
  }, [id]);

  return (
    <div className="BookDetails">
      {book ? (
        <>
          <Link className="link" to={location.state?.from || "/"}>
            Go Back
          </Link>
          <AddToList bookId={id} />
          <h2>{book.volumeInfo.title}</h2>
          <img src={book.volumeInfo.imageLinks?.thumbnail} alt="" />
          <h2>Author: {book.volumeInfo.authors || "Unknown"}</h2>
          <p>
            <b>Description:</b>
          </p>
          <div
            style={{ textAlign: "left" }}
            dangerouslySetInnerHTML={{ __html: book.volumeInfo.description }}
          />
          <p>
            <b>Published:</b> {book.volumeInfo.publishedDate || "Unknown"}
          </p>
          <p>
            <b>Publisher:</b> {book.volumeInfo.publisher}
          </p>
          <p>
            <b>Categories:</b> {book.volumeInfo.categories}
          </p>
          <p>
            <b>Average Rating:</b> {book.volumeInfo.averageRating}
          </p>
          <p>
            <b>Language:</b> {book.volumeInfo.language}
          </p>
          <p>
            <b>Page Count:</b> {book.volumeInfo.pageCount}
          </p>
          <p>
            <b>Print Type:</b> {book.volumeInfo.printType}
          </p>
        </>
      ) : (
        <p>Loading book details...</p>
      )}
    </div>
  );
};

export default BookDetailsPage;
