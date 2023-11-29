import React, { useState, useEffect } from "react";
import axios from "axios";
import "../Feed/Recomendation.css"; // Import your CSS file

const Recommendation = () => {
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    // Fetch recommended users from the API
    const fetchRecommendations = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/v1/user/recomendation",
          {
            withCredentials: true,
          }
        );
        setRecommendations(response.data);
      } catch (error) {
        console.log("Error fetching recommendations:", error.response.data);
      }
    };

    fetchRecommendations();
  }, []);

  const handleConnect = (userId) => {
    // You can implement the connection logic here
    console.log(`Connect button clicked for user with ID: ${userId}`);
  };

  return (
    <div className="recommendation-sidebar">
      <p
        style={{
          textDecoration: "underline",
          textUnderlinePosition: "under",
        }}
      >
        Recommended Users
      </p>
      {recommendations.length === 0 ? (
        <p>No recommendations available.</p>
      ) : (
        <ul>
          {recommendations.map((user) => (
            <li key={user._id}>
              <div className="user-details">
                <strong>Name:</strong> {user.name}
                <br />
                <strong>Email:</strong> {user.email}
                <br />
                <strong>Organization:</strong> {user.organization}
                <br />
                <strong>Role:</strong> {user.role}
                <br />
              </div>
              <hr />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Recommendation;
