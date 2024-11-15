import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./firebase";
import Login from "./components/Login";
import Signup from "./components/Signup";

function App() {
  const [userEmailPrefix, setUserEmailPrefix] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && user.email) {
        const emailPrefix = user.email.split("@")[0];
        setUserEmailPrefix(emailPrefix);
      } else {
        setUserEmailPrefix(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      alert("Signed out successfully");
      setUserEmailPrefix(null); 
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <Router>
      <div>
        {userEmailPrefix && (
          <div style={{ display: "flex", alignItems: "center" }}>
            <h2>Welcome, {userEmailPrefix}</h2>
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
