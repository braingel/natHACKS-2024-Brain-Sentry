// src/components/Homepage.js
import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const Homepage = () => {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const user = auth.currentUser;
      if (user) {
        try {
          const docRef = doc(db, "users", user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setUserData(docSnap.data());
          } else {
            console.error("No user data found");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      } else {
        navigate("/login"); 
      }
    };

    fetchData();
  }, [navigate]);

  if (!userData) {
    return <p>Loading...</p>; 
  }

  return (
    <div>
      <h1>Welcome, {userData.name}</h1>
      <p>Email: {userData.email}</p>
      <p>Clarity: {userData.clarity}</p>
      <p>Result: {userData.result}</p>
      <p>Words Per Minute: {userData.wordsPerMinute}</p>
      <button onClick={() => auth.signOut().then(() => navigate("/login"))}>Sign Out</button>
    </div>
  );
};

export default Homepage;
