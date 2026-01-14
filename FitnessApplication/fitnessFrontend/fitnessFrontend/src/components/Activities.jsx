import React, { useEffect } from 'react';
import { useState } from 'react';
import './Activities.css'; 
import api from '../services/api';




const Activities = ({setCurrentPage, setSelectedActivity }) => {
    const [view, setView] = useState('dashboard'); 
    const [activityError, setActivityError] = useState("");
    const [activityType, setActivityType] = useState('RUNNING');
    const [duration, setDuration] = useState('');
    const [caloriesBurned, setCaloriesBurned] = useState('');
    const [activities, setActivities] = useState([]);
    const [lastActivity, setLastActivity] = useState(null);
  
   
        const fetchActivities = async () => {
          try {
            const userId = localStorage.getItem("userId");
            if (!userId) return;
      
            const response = await api.get(`/activities/user/${userId}`);
            setActivities(response.data);
          } catch (err) {
            console.error("Failed to fetch activities", err);
          }
        };
     useEffect(() => {
        fetchActivities();
      }, []);
      
    const handleLogout = () => {
      setCurrentPage('home'); 
    };
  
 
        const handleAddActivity = async () => {
            if (!duration || !caloriesBurned) {
              setActivityError("Please fill all fields");
              return;
            }
          
            const newActivity = {
              
              userId: localStorage.getItem("userId"),
              type: activityType,
              duration: Number(duration),
              caloriesBurned: Number(caloriesBurned),
              timestamp: new Date().toISOString()
            };
          
            try {
              const response = await api.post("/activities/add", newActivity);
          
          
              setActivities(prev => [response.data, ...prev]);
              setLastActivity(response.data);
              setView("summary");
          
            } catch (error) {
              console.error(error);
              setActivityError("Failed to save activity");
            } 

           
    };

  const renderDashboard = () => (
    <div className="container">
      <div className="dashboard-header">
        <div>
          <h2 className="dashboard-title">Activity Dashboard</h2>
          <p className="welcome-text">Welcome back !</p>
        </div>
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </div>

      <div className="dashboard-content">
        <div className="form-card">
          <h3 className="card-title">Log New Activity</h3>
          <div className="form-wrapper">
            <div className="input-group">
              <label className="label">Activity Type</label>
              <select
                value={activityType}
                onChange={(e) => setActivityType(e.target.value)}
                className="select"
              >
                <option value="RUNNING">Running</option>
                <option value="WALKING">Walking</option>
                <option value="CYCLING">Cycling</option>
                <option value="SWIMMING">Swimming</option>
              </select>
            </div>

            <div className="input-group">
              <label className="label">Duration (minutes)</label>
              <input
                type="number"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="input"
                placeholder="e.g., 30"
                min="1"
              />
            </div>

            <div className="input-group">
              <label className="label">Calories Burned</label>
              <input
                type="number"
                value={caloriesBurned}
                onChange={(e) => setCaloriesBurned(e.target.value)}
                className="input"
                placeholder="e.g., 250"
                min="1"
              />
            </div>

            {activityError && <div className="error-message">{activityError}</div>}

            <button onClick={handleAddActivity} className="submit-button">
              Add Activity
            </button>
          </div>
        </div>

        <div className="activities-card">
          <h3 className="card-title">Activity History</h3>
          {activities.length === 0 ? (
            <p className="empty-state">No activities logged yet. Start by adding your first workout!</p>
          ) : (
            <div className="activities-list">
              {activities.map((activity) => (
                <div key={activity.id || activity._id} className="activity-item" onClick={() => {
                    setSelectedActivity(activity);
                    setCurrentPage("recommendations");
                }}
                style={{ cursor: "pointer"}}
                >
                  <div className="activity-icon">
                    {activity.type === 'RUNNING' && '🏃'}
                    {activity.type === 'WALKING' && '🚶'}
                    {activity.type === 'CYCLING' && '🚴'}
                    {activity.type === 'SWIMMING' && '🏊'}
                  </div>
                  <div className="activity-details">
                    <h4 className="activity-type">{activity.type}</h4>
                    <p className="activity-stats">
                      {activity.duration} min • {activity.caloriesBurned ?? 0} cal
                    </p>
                    <p className="activity-time">{activity.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderSummaryPage = () => (
    <div className="container">
      <div className="summary-container">
        <div className="success-icon">✓</div>
        <h2 className="success-title">Activity Logged Successfully!</h2>

        {lastActivity && (
          <div className="summary-card">
            <h3 className="summary-card-title">Activity Details</h3>
            <div className="summary-details">
              <div className="summary-row">
                <span className="summary-label">Type:</span>
                <span className="summary-value">{lastActivity.type}</span>
              </div>
              <div className="summary-row">
                <span className="summary-label">Duration:</span>
                <span className="summary-value">{lastActivity.duration} minutes</span>
              </div>
              <div className="summary-row">
                <span className="summary-label">Calories:</span>
                <span className="summary-value">{lastActivity.calories} cal</span>
              </div>
              <div className="summary-row">
                <span className="summary-label">Logged at:</span>
                <span className="summary-value">{lastActivity.timestamp}</span>
              </div>
            </div>
          </div>
        )}

        <div className="summary-actions">
          <button onClick={() => {
            fetchActivities();
            setView('dashboard')}} className="primary-button">

            Add Another Activity
          </button>
          <button onClick={handleLogout} className="secondary-button">
            Logout
          </button>
        </div>
      </div>
    </div>
  );

  return view === 'dashboard' ? renderDashboard() : renderSummaryPage();
};

export default Activities;