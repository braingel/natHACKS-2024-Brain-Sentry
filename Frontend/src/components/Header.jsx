import React from "react";
import './Header.css'
export default function Header({ currentPage }) {
    return (
        <div className="header">
            <div className="header-container">
                <h1>{currentPage.charAt(0).toUpperCase() + currentPage.slice(1)}</h1> {/* to capitalize the first letter */}
                <div className="icons">
                    <img src="/bell.svg" alt="" />
                    <img src="/help.svg" alt="" />
                </div>
            </div>
        </div>
    )
}