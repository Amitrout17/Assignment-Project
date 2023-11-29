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
  const [files, setFiles] = useState();

  const roles = ["Student", "Employee", "Employee-Human Resource"];

  const register = async () => {
    const formData = new FormData();

    formData.append("files", files);
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("phone", phone);
    formData.append("organization", organization);
    formData.append("role", role);

    try {
      const response = await axios.post(
        "http://localhost:4000/api/v1/register",
        formData,
        {
          withCredentials: true,
        }
      );

      console.log("Success:", response.data);
      alert("Sucessfully Registered");
      navigate("/");
    } catch (error) {
      console.log("Error:", error);
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

      <p>Upload Image</p>
      <input
        type="file"
        id="fileBTN-uploadd"
        accept="image/*"
        onChange={(e) => {
          e.preventDefault();
          setFiles(e.target.files[0]);
        }}
        style={{
          marginBottom: "10px",
        }}
      />

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
