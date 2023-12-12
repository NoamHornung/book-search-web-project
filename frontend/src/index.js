import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles.css";
import { BrowserRouter } from "react-router-dom";
import BooksContextProvider from "./context/BooksContext";
import { AuthContextProvider } from "./context/AuthContext";
import { ListsContextProvider } from "./context/ListsContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <ListsContextProvider>
          <BooksContextProvider>
            <App />
          </BooksContextProvider>
        </ListsContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
