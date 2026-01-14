import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router";
import { toast } from 'react-toastify';
import api from "../services/api";
import "./Login.css"; 


const Login = ({ setCurrentPage }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      setLoginError("Please fill in all fields");
      return;
    }
  
    try {
      const response = await api.post("/users/login", {
        email: email,
        password: password
      });
  
      // 
      if (response.data && response.data.userId) {
        localStorage.setItem("userId", response.data.userId);
        toast.success("Login successful!");
        setCurrentPage("activities");
      } else {
        setLoginError("Invalid email or password");
      }
      
      
    } catch (error) {
      console.error(error);
      setLoginError("Server error. Please try again.");
    }
  };
  

  return (
    <div className="container">
      <div className="form-container">
        <h2 className="form-title">Welcome Back</h2>
        <p className="form-subtitle">Login to access your fitness dashboard</p>

        <div className="form-wrapper">
          <div className="input-group">
            <label className="label">User ID</label>
            <input
              type="text"
              className="input-field"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your user ID"
            />
          </div>

          <div className="input-group">
            <label className="label">Password</label>
            <input
              type="password"
              className="input-field"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </div>

          {loginError && <div className="error-message">{loginError}</div>}

          <button onClick={handleLogin} className="submit-button">Login</button>
        </div>

        {/* This now tells the PARENT to change the view */}
        <button 
          onClick={() => setCurrentPage("activities")} 
          className="back-link"
        >
          ← Back to Home
        </button>
        <div>
        <button 
          onClick={() => setCurrentPage("signup")} 
          className="back-link"
        >
         Create an Account 
        </button>
        </div>
       
      </div>
    </div>
  );
};

export default Login;