import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import MyLists from "./pages/MyLists";
import { Route, Routes, Navigate } from "react-router-dom";
import BookDetailsPage from "./pages/BookDetailsPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { useAuthContext } from "./hooks/useAuthContext";

function App() {
  const { user } = useAuthContext();

  return (
    <>
      <Navbar />
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/myLists"
            element={user ? <MyLists /> : <Navigate to="/login" />}
          />
          <Route path="/book/:id" element={<BookDetailsPage />} />
          <Route
            path="/login"
            element={!user ? <Login /> : <Navigate to="/" />}
          />
          <Route
            path="/signup"
            element={!user ? <Signup /> : <Navigate to="/" />}
          />
        </Routes>
      </div>
    </>
  );
}

export default App;
