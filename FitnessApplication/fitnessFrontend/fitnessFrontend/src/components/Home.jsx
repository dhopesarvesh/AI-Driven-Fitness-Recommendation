import React, { useState } from "react";
import "./Home.css";
import Login from "./Login.jsx"; 
import Activities from "./Activities.jsx";
import Recommendations from "./Recommendations";
import Signup from "./Signup";
function Home(){


    const [currentPage, setCurrentPage] = useState("home");
    const [selectedActivity, setSelectedActivity] = useState("null");

  // 1. Move your main landing page content here
  const renderLandingPage = () => (
    <div className="hero-section">
      <div className="icon-container">
        <svg width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="#39ff14" strokeWidth="2">
          <path d="M20.57 14.86L22 13.43 20.57 12 17 15.57 8.43 7 12 3.43 10.57 2 9.14 3.43 7.71 2 5.57 4.14 4.14 2.71 2.71 4.14l1.43 1.43L2 7.71l1.43 1.43L2 10.57 3.43 12 7 8.43 15.57 17 12 20.57 13.43 22l1.43-1.43L16.29 22l2.14-2.14 1.43 1.43 1.43-1.43-1.43-1.43L22 16.29z" />
        </svg>
      </div>

      <h1 className="title">FitTrack Pro</h1>
      <p className="tagline">Track Your Fitness Journey, One Activity at a Time</p>
      <p className="subtitle">Monitor workouts and achieve your goals</p>

      <button className="primary-button" onClick={() => setCurrentPage("login")}>
        Login to Start
      </button>

      <div className="features">
        <div className="feature-card">
          <div className="feature-icon">🏃</div>
          <h3 className="feature-title">Track Activities</h3>
          <p className="feature-text">Log running, walking, cycling, and swimming sessions</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">🔥</div>
          <h3 className="feature-title">Monitor Calories</h3>
          <p className="feature-text">Keep track of calories burned during each workout</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">📊</div>
          <h3 className="feature-title">View Progress</h3>
          <p className="feature-text">See your complete activity history at a glance</p>
        </div>
      </div>
    </div>
  );

  // 2. Your main return logic
  return (

    
    <div className="container">
      {/* If currentPage is "home", show LandingPage. Otherwise, show Login. */}
      {currentPage === "home" && renderLandingPage()}
      {currentPage == "login" && (
        <Login setCurrentPage={setCurrentPage} />
      )}
      {currentPage == "signup" && <Signup setCurrentPage={setCurrentPage} />}

    {currentPage === "activities" && (
        <Activities 
        setCurrentPage={setCurrentPage}
        setSelectedActivity={setSelectedActivity} 
         />
      )}

      {currentPage === "recommendations" && <Recommendations 
            activity={selectedActivity}
            setCurrentPage={setCurrentPage}/>}
    </div>
  );

}

export default Home;
