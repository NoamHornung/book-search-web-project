import React, { createContext, useEffect, useReducer } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import axios from "axios";

export const ListsContext = createContext();

export const listsReducer = (state, action) => {
  switch (action.type) {
    case "SET_LISTS":
      return {
        lists: action.payload,
        listNames: action.payload.map((list) => list.title), // Extract list names
      };
    case "CREATE_LIST":
      return {
        lists: [action.payload, ...state.lists],
        listNames: [action.payload.title, ...state.listNames],
      };
    case "DELETE_LIST":
      return {
        lists: state.lists.filter((l) => l._id !== action.payload._id),
        listNames: state.listNames.filter(
          (name) => name !== action.payload.title
        ),
      };
    case "UPDATE_LIST":
      const updatedList = action.payload; // The updated list object
      const updatedLists = state.lists.map((list) =>
        list._id === updatedList._id ? updatedList : list
      );
      return {
        lists: updatedLists,
        listNames: updatedLists.map((list) => list.title), // Update list names
      };
    default:
      return state;
  }
};

export const ListsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(listsReducer, {
    lists: [],
    listNames: [],
  });

  console.log("ListsContext state:", state);

  const { user, userLoaded } = useAuthContext();

  useEffect(() => {
    if (userLoaded && user) { // If the user is loaded and there is a user logged in
      const headers = {
        Authorization: `Bearer ${user.token}`,
        "User-Id": user.userId,
      };
      // a call to the backend to get all the lists of the user
      const fetchUserLists = async () => {
        try {
          console.log("Fetching user's lists...");
          const response = await axios.get(
            "http://localhost:5000/lists/getall",
            {
              headers,
            }
          );
          const userLists = response.data;
          dispatch({ type: "SET_LISTS", payload: userLists });
        } catch (error) {
          console.error("Error fetching user's lists:", error);
        }
      };

      fetchUserLists();
    }
  }, [userLoaded, user]); // Depend on userLoaded and user

  return (
    <ListsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </ListsContext.Provider>
  );
};
