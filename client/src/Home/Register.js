import React, { useState } from "react";
import axios from "axios";
import "./Register.css";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [organization, setOrganization] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  const roles = ["Student", "Employee", "Employee-Human Resource"];

  const register = async () => {
    try {
      const response = await axios.post(
        "http://localhost:4000/api/v1/register",
        {
          name,
          email,
          password,
          phone,
          organization,
          role,
        },
        {
          withCredentials: true,
        }
      );

      console.log("Success:", response.data);
      alert("Login Sucessfully");
      navigate("/");
    } catch (error) {
      console.error("Error:", error.message);
      alert("Error during registration. Please try again.");
    }
  };

  const redirectToRegister = () => {
    navigate("/login");
  };

  return (
    <div className="register-container">
      <input
        type="text"
        placeholder="Name"
        className="input-field"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Email"
        className="input-field"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="input-field"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        type="number"
        placeholder="Phone"
        className="input-field"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <input
        type="text"
        placeholder="Organization / College"
        className="input-field"
        value={organization}
        onChange={(e) => setOrganization(e.target.value)}
      />
      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
        className="dropdown"
      >
        <option value="" disabled>
          Select Role
        </option>
        {roles.map((r) => (
          <option key={r} value={r}>
            {r}
          </option>
        ))}
      </select>
      <button className="register-button" onClick={register}>
        Register
      </button>

      <div className="register-section">
        <p>Already have an account ? </p>
        <span className="register-link" onClick={redirectToRegister}>
          Login here
        </span>
      </div>
    </div>
  );
};

export default Register;
