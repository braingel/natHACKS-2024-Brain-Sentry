import React from "react";
import { useLocation } from "react-router-dom";
import "./Results.css"

export default function Results() {
    const location = useLocation();
    const analysisResult = location.state?.analysisResult; // Retrieve the server response

    return (
        <div className="results-container">
            <p className="info">See how your speech metrics reflect your cognitive health...</p>
            <div className="analytics-container">
                <h1 className="risk-info">You are at <span className="highlight">{analysisResult?.risk || "unknown"}</span> risk of neurodegenerative diseases.</h1>
                <h2 className="disclaimer">We recommend you consult a doctor to learn more about your cognitive health.</h2>
                <div className="cards-container">
                    <div className="wpm">
                        <h3 className="card-title">WPM</h3>
                        <h4 className="stats wpm-stats"><span className="green">{analysisResult?.wpm || "N/A"}</span></h4> {/* conditional */}
                    </div>
                    <div className="pauses">
                        <h3 className="card-title">Pauses</h3>
                        <h4 className="stats pauses-stats"><span className="highlight">{analysisResult?.pauses || "N/A"}</span></h4> {/* conditional */}
                    </div>
                    <div className="clarity">
                        <h3 className="card-title">Clarity</h3>
                        <h4 className="stats clarity-stats">Your tone and pitch remained <span className="highlight">{analysisResult?.clarity || "N/A"}</span> throughout the task.</h4> {/* conditional */}
                    </div>
                </div>
                <div className="download-container">
                    <button className="download-bttn">
                        <img src="/download.svg" alt="" />
                        Download report
                    </button>
                </div>
            </div>
        </div>
    ) 
}
/* {
  "risk": "high",
  "wpm": 80,
  "pauses": 6,
  "clarity": "unsteady"
} */