import React, { useState, useEffect } from "react";
import axios from "axios";
import "../notifications/Notifications.css";

function Notification() {
  const [notificationMessages, setNotificationMessages] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.post(
          "http://localhost:4000/api/v1/notifications",
          {},
          {
            withCredentials: true,
          }
        );
        setNotificationMessages(response.data.messages);
      } catch (error) {
        console.log("Error fetching notifications:", error.message);
      }
    };

    fetchNotifications();
  }, []);

  return (
    <div className="notification-container">
      <h2>Notifications</h2>
      {notificationMessages.length === 0 ? (
        <p className="no-notifications-message">No new notifications</p>
      ) : (
        <ul className="notification-list">
          {notificationMessages.map((notification, index) => (
            <li key={index} className="notification-item">
              {notification.message}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Notification;
