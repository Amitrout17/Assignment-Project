import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Home/Login";
import Register from "./Home/Register";
import Navbar from "./Home/Navbar/Navbar.js";
import Home from "./Home/Feed/Home.js";
import Header from "./Home/Headerr/Header.js";
import Connections from "./Networks/Connections.js";
import MyConnections from "./Networks/Myconnections.js";
import ChatSidebar from "./Home/Chat/ChatSidebar.js";
import Notification from "./Home/notifications/Notifications.js";

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
        <Route
          path="/networks/personal"
          element={
            <>
              <Navbar />
              <MyConnections />
            </>
          }
        />
        <Route
          path="/chat"
          element={
            <>
              <Navbar />
              <ChatSidebar />
            </>
          }
        />
        <Route
          path="/notifications"
          element={
            <>
              <Navbar />
              <Notification />
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
