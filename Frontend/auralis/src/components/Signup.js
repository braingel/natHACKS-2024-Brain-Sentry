// src/components/Signup.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [clarity, setClarity] = useState("");
  const [result, setResult] = useState("");
  const [wordsPerMinute, setWordsPerMinute] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError(""); // Clear any previous error messages

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      // Save the user's name, email, and extra data in Firestore under the user's UID
      const user = userCredential.user;
      await setDoc(doc(db, "users", user.uid), {
        name: name,
        email: email,
        clarity: clarity,
        result: result,
        wordsPerMinute: wordsPerMinute,
      });

      alert("Account created successfully");
      navigate("/login"); // Redirect to login page after successful signup
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h1>Signup</h1>
      <form onSubmit={handleSignup}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Clarity"
          value={clarity}
          onChange={(e) => setClarity(e.target.value)}
        />
        <input
          type="text"
          placeholder="Result"
          value={result}
          onChange={(e) => setResult(e.target.value)}
        />
        <input
          type="number"
          placeholder="Words Per Minute"
          value={wordsPerMinute}
          onChange={(e) => setWordsPerMinute(e.target.value)}
        />
        <button type="submit">Signup</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default Signup;
