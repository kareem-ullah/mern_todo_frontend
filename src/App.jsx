import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "../Component/Home";
import Login from "../Component/login";
import Signup from "../Component/Signup";

function App() {
  const isAuthenticated = !!localStorage.getItem("token");

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={isAuthenticated ? <Home /> : <Navigate to="/login" />}
        />
        <Route path="/login" element={<Login />} />

        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
