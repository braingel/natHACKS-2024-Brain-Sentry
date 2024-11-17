import React from "react";

import './Nav.css'

export default function Nav({ currentPage, changePage, handleSignOut }) {  
    
    return (
        <div className="nav">
            <div className="nav-container">
                <img src="/logo.svg" className="dash-logo"alt="" />
                <div className="page-container">
                    <div 
                        className="page home" 
                        style={{backgroundColor: currentPage === "home" ? "rgba(217, 212, 247, 0.1)" : "transparent"}}
                        onClick={() => changePage("home")}>
                        <img src="/home.svg" className="icon" alt="" />
                        <h3>Home</h3>
                    </div>
                    <div 
                        className="page insights" 
                        style={{backgroundColor: currentPage === "insights" ? "rgba(217, 212, 247, 0.1)" : "transparent"}}
                        onClick={() => changePage("insights")}>
                        <img src="/insights.svg" className="icon" alt="" />
                        <h3>Insights</h3>
                    </div>
                    <div 
                        className="page settings" 
                        style={{backgroundColor: currentPage === "settings" ? "rgba(217, 212, 247, 0.1)" : "transparent"}}
                        onClick={() => changePage("settings")}>
                        <img src="/settings.svg" className="icon" alt="" />
                        <h3>Settings</h3>
                    </div>
                </div>
                <div className="page logout" onClick={handleSignOut}>
                    <img src="/logout.svg" className="icon" alt="" />
                    <h3>Logout</h3>
                </div>
            </div>
        </div>
    )
}