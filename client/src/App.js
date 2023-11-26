import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Home/Login";
import Register from "./Home/Register";
import Navbar from "./Home/Navbar/Navbar.js";
import Home from "./Home/Feed/Home.js";
import Header from "./Home/Headerr/Header.js";
import Connections from "./Networks/Connections.js";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <Header />
              <Home />
            </>
          }
        />
        <Route
          path="/login"
          element={
            <>
              <Navbar />
              <Login />
            </>
          }
        />
        <Route
          path="/register"
          element={
            <>
              <Navbar />
              <Register />
            </>
          }
        />
        <Route
          path="/networks"
          element={
            <>
              <Navbar />
              <Connections />
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
