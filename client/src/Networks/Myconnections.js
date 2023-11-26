import React, { useState, useEffect } from "react";
import axios from "axios";
import "../Networks/Myconnections.css"; // Import your CSS file

function MyConnections() {
  const [connectionDetails, setConnectionDetails] = useState([]);

  useEffect(() => {
    const fetchConnections = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/v1/connections/all",
          {
            withCredentials: true,
          }
        );
        setConnectionDetails(response.data.connectionDetails);
      } catch (error) {
        alert(error.response.data.message);
        console.log(error);
      }
    };

    fetchConnections();
  }, []);

  return (
    <div className="my-connections-container">
      {connectionDetails.length === 0 ? (
        <p className="no-connections-message">
          You do not have any connections. Connect to see more!
        </p>
      ) : (
        connectionDetails.map((connection, index) => (
          <div key={index} className="connection-card">
            <h2>{connection.name}</h2>
            <p>Email: {connection.email}</p>
            <p>Organization: {connection.organization}</p>
            <p>Role: {connection.role}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default MyConnections;
