// Header.js

import React, { useState } from "react";
import axios from "axios";
import "./Header.css"; // Import your CSS file

const Header = () => {
  const [newFeedContent, setNewFeedContent] = useState("");

  const addNewFeed = async () => {
    try {
      const response = await axios.post(
        "http://localhost:4000/api/v1/feed/new",
        {
          content: newFeedContent,
        },
        {
          withCredentials: true,
        }
      );

      if (response.data.sucess) {
        window.location.reload();
      }
    } catch (error) {
      console.log("Error adding new feed:", error.message);
      console.log(error);
      alert(error.response.data.message);
    }
  };

  return (
    <div className="header-container">
      <input
        type="text"
        placeholder="Write a new feed / Post opportunities..."
        value={newFeedContent}
        onChange={(e) => setNewFeedContent(e.target.value)}
        className="feed-input"
      />
      <button onClick={addNewFeed} className="add-feed-button">
        Add Feed
      </button>
    </div>
  );
};

export default Header;
