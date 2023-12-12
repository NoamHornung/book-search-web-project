import axios from "axios";
import { useAuthContext } from "../hooks/useAuthContext";
import { useListsContext } from "../hooks/useListsContext";
import { useNavigate } from "react-router-dom";
import { FaTrashAlt } from "react-icons/fa";

const MyLists = () => {
  const { user } = useAuthContext();
  const { lists, dispatch } = useListsContext();
  const navigate = useNavigate();

  if (!user) {
    console.log("You must be logged in");
    return;
  }

  const headers = {
    Authorization: `Bearer ${user.token}`,
    "User-Id": user.userId,
  };

  const backupImage =
    "https://books.google.com.br/googlebooks/images/no_cover_thumb.gif";

  const handleDeleteList = async (listId) => {
    console.log("listId:", listId);
    try {
      // a call to the backend to delete the list
      const response = await axios.delete(
        `http://localhost:5000/lists/deleteList`,
        {
          data: {
            listId: listId,
          },
        }
      );
      const deletedList = response.data; // The deleted list object
      dispatch({ type: "DELETE_LIST", payload: deletedList });
    } catch (error) {
      console.error("Error deleting list:", error);
    }
  };

  const handleDeleteBook = async (listId, bookId) => {
    try {
      // a call to the backend to delete the book from the list
      const response = await axios.patch(
        `http://localhost:5000/lists/removeFromList`,
        {
          listId,
          bookId,
        },
        { headers }
      );
      const updatedList = response.data; // The updated list object
      dispatch({ type: "UPDATE_LIST", payload: updatedList });
    } catch (error) {
      console.error("Error deleting list:", error);
    }
  };

  const handleMoreInfoClick = (bookId) => {
    // Navigate to the book details page for the clicked book
    navigate(`/book/${bookId}`, { state: { from: window.location.pathname } });
  };

  console.log("lists:", lists);

  return (
    <div>
      {lists.length === 0 ? (
        <p>No lists available. Create a new list to get started!</p>
      ) : (
      lists.map((list) => (
        <div key={list._id} className="list-item-horizontal">
          <div className="list-title">
            <h2>{list.title}:</h2>
            <button
              className="trash-button"
              onClick={() => handleDeleteList(list._id)}
            >
              <FaTrashAlt id="trash-icon" />
            </button>
          </div>
          <div className="scrollable-list">
            <ul className="horizontal-list">
              {list.books.map((book, index) => (
                <li key={index} className="list-book-card-container">
                  <div className="buttons-container">
                    <button
                      className="more-info"
                      onClick={() => handleMoreInfoClick(book.id)}
                    >
                      More Info
                    </button>
                    <button
                      className="trash-button"
                      onClick={() => handleDeleteBook(list._id, book.id)}
                    >
                      <FaTrashAlt id="trash-icon" />
                    </button>
                  </div>
                  <img
                    src={book.volumeInfo.imageLinks?.thumbnail || backupImage}
                    alt=""
                  />
                  <div className="list-description">
                    <h2>{book.volumeInfo.title}</h2>
                    <h3>Author: {book.volumeInfo.authors || "Unknown"}</h3>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )))}
    </div>
  );
};

export default MyLists;
