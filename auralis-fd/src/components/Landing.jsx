import React from "react";
import Login from "./Login";
import './Landing.css';

export default function Landing() {

  return (
    <>
        <div className="landing-body">
          <div className="popup">
            <Login />
          </div>
        </div>
    </>
  )
}