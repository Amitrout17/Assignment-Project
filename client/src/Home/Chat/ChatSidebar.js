import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ChatSidebar.css";
import ChatMain from "./ChatMain";

function ChatSidebar() {
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
    <div className="chat-main">
      <div className="chat-sidebar-container">
        <h2>Your Connections</h2>
        {connectionDetails.length === 0 ? (
          <p className="no-connections-message">No connections to chat.</p>
        ) : (
          <ul className="connections-list">
            {connectionDetails.map((connection, index) => (
              <li key={index} className="connection-item">
                <div className="connection-details">
                  <p className="connection-name">{connection.name}</p>
                  <p className="connection-role">{connection.role}</p>
                  <p className="connection-organization">
                    {connection.organization}
                  </p>
                </div>
                <button className="chat-button">Chat</button>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="chat-main-2">
        <ChatMain />
      </div>
    </div>
  );
}

export default ChatSidebar;
