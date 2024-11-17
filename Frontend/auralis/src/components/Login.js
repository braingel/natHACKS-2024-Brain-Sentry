  // src/components/Login.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Clear any previous error messages

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/homepage"); // Redirect to homepage after successful login
    } catch (err) {
      setError("Invalid email or password. Please try again.");
    }
  };

  const goToSignup = () => {
    navigate("/signup"); // Navigate to the signup page
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
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
        <button type="submit">Login</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <p>
        Don't have an account?{" "}
        <button onClick={goToSignup} style={{ border: "none", background: "none", color: "blue", cursor: "pointer" }}>
          Sign Up
        </button>
      </p>
    </div>
  );
};

export default Login;
