import { useAuthContext } from "./useAuthContext";
import { useListsContext } from "./useListsContext";
import { useContext } from "react";
import { BooksContext } from "../context/BooksContext";

export const useLogout = () => {
  const { dispatch: authDispatch } = useAuthContext();
  const { dispatch: listsDispatch } = useListsContext();
  const { setBooks, setSearchMade } = useContext(BooksContext);

  const logout = () => {
    // remove user from storage
    localStorage.removeItem("user");

    // dispatch logout action
    authDispatch({ type: "LOGOUT" });
    authDispatch({ type: "USER_LOADED", payload: false });
    listsDispatch({ type: "SET_LISTS", payload: [] });

    // clear the books rendered in the search results
    setBooks([]);
    setSearchMade(false);
  };

  return { logout };
};
