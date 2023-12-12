import React, { useState, useContext } from "react";
import { ListsContext } from "../context/ListsContext";
import axios from "axios";
import { useAuthContext } from "../hooks/useAuthContext";

const AddToList = ({ bookId }) => {
  const { user } = useAuthContext();
  const { lists, dispatch, listNames } = useContext(ListsContext);
  const [selectedList, setSelectedList] = useState("");
  const [newListTitle, setNewListTitle] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleAddToList = async () => {
    setSuccess(false);
    if (!user) {
      setError("You must be logged in");
      return;
    }
    const headers = {
      Authorization: `Bearer ${user.token}`,
      "User-Id": user.userId,
    };
    if (selectedList) {
      const list = lists.find((list) => list.title === selectedList);

      if (!list) {
        console.log("Selected list not found.");
      } else {
        const listId = list._id;
        console.log("listId:", listId);

        try {
          // a call to the backend to add the book to the list
          const response = await axios.patch(
            `http://localhost:5000/lists/add`,
            {
              listId,
              bookId,
            },
            { headers }
          );
          const updatedList = response.data;
          dispatch({ type: "UPDATE_LIST", payload: updatedList });
          setSuccess(true);
        } catch (error) {
          console.error("Error adding book to list:", error);
        }
      }
    } else if (newListTitle) {
      // Create a new list with the provided title
      try {
        // a call to the backend to create a new list and add the book to it
        const response = await axios.post(
          "http://localhost:5000/lists/create",
          {
            title: newListTitle,
            bookId: bookId,
          },
          { headers }
        );
        const newList = response.data;
        dispatch({ type: "CREATE_LIST", payload: newList });
        setSuccess(true);
      } catch (error) {
        console.error("Error creating new list and adding book:", error);
      }
    }
  };

  return (
    <div className="add-to-list-container">
      <select
        className="list-select"
        onChange={(e) => setSelectedList(e.target.value)}
      >
        <option value="">Select an existing list</option>
        {listNames.map((listName) => (
          <option key={listName} value={listName}>
            {listName}
          </option>
        ))}
      </select>
      <input
        className="list-title-input"
        type="text"
        placeholder="Enter a new list title"
        value={newListTitle}
        onChange={(e) => setNewListTitle(e.target.value)}
      />
      <button className="add-button" onClick={handleAddToList}>
        Add to List
      </button>
      {error && <div className="error">{error}</div>}
      {success && <div className="success">Book added successfully!</div>}
    </div>
  );
};

export default AddToList;
