// src/App.js
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth, db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";
import Login from "./components/Login";
import Signup from "./components/Signup";

function App() {
  const [userName, setUserName] = useState(null);

  useEffect(() => {
    // Listen for authentication state changes
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Fetch user's name from Firestore
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          setUserName(userDoc.data().name);
        } else {
          setUserName(null);
        }
      } else {
        setUserName(null); // No user is logged in
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      alert("Signed out successfully");
      setUserName(null); // Reset user name after sign out
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <Router>
      <div>
        {userName && (
          <div style={{ display: "flex", alignItems: "center" }}>
            <h2>Welcome, {userName}</h2>
            <button onClick={handleSignOut} style={{ marginLeft: "10px" }}>
              Sign Out
            </button>
          </div>
        )}
      </div>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default App;
