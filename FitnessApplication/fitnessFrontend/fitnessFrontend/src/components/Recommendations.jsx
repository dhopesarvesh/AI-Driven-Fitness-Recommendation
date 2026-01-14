import React, { useEffect, useState } from "react";
import "./Recommendations.css";

function Recommendations({ activity, setCurrentPage }) {
  const [loadingRecommendations, setLoadingRecommendations] = useState(true);
  const [recommendations, setRecommendations] = useState(null);
  const [showSummary, setShowSummary] = useState(false);


  useEffect(() => {
    if (!activity) return;
  
    const fetchRecommendation = async () => {
      try {
        setLoadingRecommendations(true);
  
        const response = await fetch(
          `http://localhost:8080/api/recommendations/activity/${activity.id}`
        );
  
        if (!response.ok) {
          throw new Error("Failed to reach recommendation");
        }
  
        const data = await response.json();
        console.log("Recommendation API response:", data);
  
        setRecommendations(data);
      } catch (error) {
        console.error(error);
        setRecommendations({
          recommendation: "Unable to load recommendations",
        });
      } finally {
        setLoadingRecommendations(false);
      }
    };
  
    fetchRecommendation();
  }, [activity]);
  

  if (!activity) {
    return (
      <div className="container">
        <p>No activity selected.</p>
        <button onClick={() => setCurrentPage("activities")}>
          Back to Activities
        </button>
      </div>
    );
  }
  

  if (loadingRecommendations) {
    return (
      <div className="container">
        <div className="recommendations-container">
          <div className="loading-container">
            <div className="loader"></div>
            <h2 className="loading-text">
              Generating Personalized Recommendations...
            </h2>
            <p className="loading-subtext">
              Analyzing your activity data
            </p>
          </div>
        </div>
      </div>
    );
  }

  const parseRecommendation = (text) => {
    if (!text) return { summary: "", analysis: "" };

    const parts = text.split("\n\n");
    return {
      summary: parts.slice(0,2).join("\n\n"),
      analysis: parts.slice(1).join("\n\n"),
    };
  };

  const { summary, analysis } =
    parseRecommendation(recommendations.recommendation);

  return (
    <div className="container">
      <div className="recommendations-container">
        <h2>📊 Activity Analysis & Recommendations</h2>

        <div className="activity-summary-badge">
          <span>
            {activity.type === "RUNNING" && "🏃"}
            {activity.type === "WALKING" && "🚶"}
            {activity.type === "CYCLING" && "🚴"}
            {activity.type === "SWIMMING" && "🏊"}
          </span>
          <span>
            {activity.type} • {activity.duration} min •{" "}
            {activity.caloriesBurned ?? 0} cal
          </span>
        </div>

        {summary && (
          <div className="recommendation-card">
            <h3>Summary</h3>
            <p>{summary}</p>
          </div>
        )}

        {analysis && (
          <div className="recommendation-card">
            <h3>Detailed Analysis</h3>
            {analysis.split("\n\n").map((p, i) => (
              <p key={i} style={{whiteSpace: "pre-line"}}>
                {p}
              </p>
            ))}
          </div>
        )}

  <button onClick={() => setCurrentPage("activities")}>
    Back to Dashboard
  </button>
        </div>
      </div>
         
  );
}

export default Recommendations;
