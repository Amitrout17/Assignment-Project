import React, { useState } from "react";
import axios from "axios";
import "./Header.css"; // Import your CSS file

const Header = () => {
  const [newFeedContent, setNewFeedContent] = useState("");
  const [files, setFiles] = useState();
  const [imagePreview, setImagePreview] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFiles(selectedFile);
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setImagePreview(null);
    }
  };

  const addNewFeed = async () => {
    const formData = new FormData();
    formData.append("files", files);
    formData.append("content", newFeedContent);

    try {
      const response = await axios
        .post("http://localhost:4000/api/v1/feed/new", formData, {
          withCredentials: true,
        })
        .then((res) => {
          window.location.reload();
        });
    } catch (error) {
      console.log("Error adding new feed:", error.message);
      console.log(error);
      alert(error.response.data.message);
    }
  };

  return (
    <div className="header-container">
      <div className="upload-section">
        <label htmlFor="fileBTN-upload" id="fileBTN-upload-label">
          Upload Image
        </label>
        <input
          type="file"
          id="fileBTN-upload"
          accept="image/*"
          onChange={handleFileChange}
        />
      </div>
      <div className="content-section">
        <input
          type="text"
          placeholder="Write a new feed / Post opportunities..."
          value={newFeedContent}
          onChange={(e) => setNewFeedContent(e.target.value)}
          className="feed-input"
        />
        {imagePreview && (
          <img
            src={imagePreview}
            alt="Image Preview"
            className="image-preview"
          />
        )}
      </div>
      <button onClick={addNewFeed} className="add-feed-button">
        Add Feed
      </button>
    </div>
  );
};

export default Header;
