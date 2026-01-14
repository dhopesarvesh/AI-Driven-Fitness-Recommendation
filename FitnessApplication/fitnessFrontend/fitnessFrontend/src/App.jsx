import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Activities from "./components/Activities";
import Home from "./components/Home";
import Login from "./components/Login";
import Recommendations from "./components/Recommendations";
import Signup from "./components/Signup";


function App() {
  return (

    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/recommendations" element={<Recommendations />} />
        <Route path="/signup" element={<Signup />}/>
    </Routes>
    
  );
}

export default App;