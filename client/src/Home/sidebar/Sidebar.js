import React, { useState, useEffect } from "react";
import axios from "axios";
import "../sidebar/sidebar.css"; // Import your CSS file

const Sidebar = () => {
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    // Fetch user details from the API
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/v1/user/details",
          {
            withCredentials: true,
          }
        );
        setUserDetails(response.data.user);
      } catch (error) {
        console.log("Error fetching user details:", error.response.data);
      }
    };

    fetchUserDetails();
  }, []);

  return (
    <>
      {userDetails && (
        <div className="sidebar-container">
          <div className="user-image">
            <img src={userDetails.image} alt="" />
          </div>

          <div className="user-details">
            <h2>{userDetails.name}</h2>
            <p className="detail-item">
              <strong>Email:</strong> {userDetails.email}
            </p>
            <p className="detail-item">
              <strong>Number:</strong> {userDetails.phone}
            </p>
            <p className="detail-item">
              <strong>Current Company:</strong> {userDetails.organization}
            </p>
            <p className="detail-item">
              <strong>Role:</strong> {userDetails.role}
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
