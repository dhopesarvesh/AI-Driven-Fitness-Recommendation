import React, { useState } from "react";
import "./Login.css";
import "../services/api" // use the SAME CSS as login
import api from "../services/api";

function Signup({ setCurrentPage }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // basic validation
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.password
    ) {
      setError("All fields are required");
      return;
    }

   
      
        try {
            console.log("Signup payload:", formData);
        
            const response = await api.post('/users/register', formData);
            
            // 1. Axios only reaches this line if status is 2xx
            console.log("Success:", response.data);
        
            // 2. You don't need response.ok or response.json()
            // The data is already available in response.data
            const data = response.data; 
        
            console.log("User registered successfully", data);
            setCurrentPage("login"); 
        
        } catch (err) {
            // 3. Axios errors contain the server's response
            console.error("Error details:", err.response?.data);
            setError(err.response?.data?.message || "Signup failed. Please try again.");
        }
  };

  return (
    <div className="container">
      <div className="form-container">
        <h2 className="form-title">Create Account</h2>
        <p className="form-subtitle">
          Join us and start your fitness journey
        </p>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label className="label">First Name</label>
            <input
              type="text"
              name="firstName"
              className="input-field"
              value={formData.firstName}
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <label className="label">Last Name</label>
            <input
              type="text"
              name="lastName"
              className="input-field"
              value={formData.lastName}
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <label className="label">Email</label>
            <input
              type="email"
              name="email"
              className="input-field"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <label className="label">Password</label>
            <input
              type="password"
              name="password"
              className="input-field"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="submit-button">
            Sign Up
          </button>
        </form>

        <button
          className="back-link"
          onClick={() => setCurrentPage("login")}
        >
          Already have an account? Login
        </button>
      </div>
    </div>
  );
}

export default Signup;
