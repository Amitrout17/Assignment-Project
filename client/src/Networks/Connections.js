import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Connections.css";
import { useNavigate } from "react-router-dom";

function Connections() {
  const [allUsers, setAllUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/v1/users/all"
        );
        setAllUsers(response.data.allUsers);
      } catch (error) {
        console.error("Error fetching all users:", error.message);
      }
    };

    fetchAllUsers();
  }, []);

  const handleConnect = async (userId) => {
    console.log(`Connect with user ${userId}`);
    await axios
      .post(
        "http://localhost:4000/api/v1/add/connections",
        {
          id: userId,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        alert("Connection Added !");
      })
      .catch((err) => {
        console.log(err);
        alert(err.response.data.message);
      });
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredUsers = allUsers.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="connections-container">
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchQuery}
          onChange={handleSearch}
          className="search-input"
        />
      </div>

      <button
        onClick={() => {
          navigate("/networks/personal");
        }}
      >
        View My Connections
      </button>

      {filteredUsers.map((user) => (
        <div key={user._id} className="user-card">
          <h2>{user.name}</h2>
          <p>Email: {user.email}</p>
          <p>Organization: {user.organization}</p>
          <p>Role: {user.role}</p>
          <button
            onClick={() => handleConnect(user._id)}
            className="connect-button"
          >
            Connect
          </button>
        </div>
      ))}
    </div>
  );
}

export default Connections;
