import React, { useState, useEffect } from "react";
import axios from "axios";
import "../Feed/Home.css";
import Sidebar from "../sidebar/Sidebar";

const Home = () => {
  const [feeds, setFeeds] = useState([]);

  useEffect(() => {
    const fetchFeeds = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/v1/feeds/all"
        );
        setFeeds(response && response.data.feed.reverse());
      } catch (error) {
        console.error("Error fetching feeds:", error.message);
      }
    };

    fetchFeeds();
  }, []);

  return (
    <>
      <div className="home-main">
        <Sidebar />
        <div className="home-container">
          {feeds.map((feed) => (
            <div key={feed._id} className="feed-card">
              <div className="user-info">
                {feed.userImage && (
                  <img
                    src={feed.userImage}
                    alt="User"
                    className="user-image-2"
                  />
                )}
                <div className="user-details">
                  <span className="user-name">{feed.userName}</span>
                  <span className="user-role">{feed.userRole}</span>
                  <span className="user-organization">
                    {feed.userOrganization}
                  </span>
                </div>
              </div>
              {feed.image && (
                <img src={feed.image} alt="Feed" className="feed-image" />
              )}
              <p className="feed-content">{feed.content}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
