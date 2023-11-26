// Login.js

import React, { useState } from "react";
import axios from "axios";
import "../Home/Login.css";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const navigate = useNavigate();

  const login = async () => {
    try {
      const response = await axios.post(
        "http://localhost:4000/api/v1/login",
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );

      console.log(response);
      alert("Login Successfully");
      navigate("/");
    } catch (error) {
      alert(error.response.data.message);
      console.error(error);
    }
  };

  const redirectToRegister = () => {
    navigate("/register");
  };

  return (
    <>
      <div className="login-container">
        <input
          type="text"
          placeholder="Enter Email"
          className="input-field"
          onChange={(e) => {
            setemail(e.target.value);
          }}
        />
        <input
          type="password"
          placeholder="Enter Password"
          className="input-field"
          onChange={(e) => {
            setpassword(e.target.value);
          }}
        />
        <button className="login-button" onClick={login}>
          Login
        </button>
      </div>

      <div className="register-section">
        <p>If you don't have an account, </p>
        <span className="register-link" onClick={redirectToRegister}>
          Register here
        </span>
      </div>
    </>
  );
}

export default Login;
