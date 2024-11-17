import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import './Login.css'
import './Logo.css'


export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const [hasAccount, setHasAccount] = useState(true);

    const [confirmPassword, setConfirmPassword] = useState("");
    const handleSignup = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
          setError("Passwords do not match");
          return;
        }
        try {
          await createUserWithEmailAndPassword(auth, email, password);
          alert("Account created successfully"); // TODO: delete
          switchPage()
        } catch (err) {
          setError(err.message);
        }
    }

    // TODO: FUNCTION THAT HANDLES ERRORS

    function switchPage() {
        setHasAccount(prev => !prev)
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
        await signInWithEmailAndPassword(auth, email, password);
        alert("Logged in successfully"); // TODO: Delete
        navigate("/dashboard/home");
        } catch (err) {
        setError(err.message);
        }
    };

    return (
        <div className="login-container">
            <img src="logo.svg" className="logo-img" alt="Auralis logo." />
            <h1>Welcome to Auralis!</h1>
            <h2>A speech analysis tool that detects early  signs of cognitive decline by tracking subtle changes in speech patterns over time.</h2>
            <h3>{hasAccount ? "Login to your account" : "Create your account"}</h3>
            {hasAccount ? ( 
                <>
                <form onSubmit={handleLogin}>
                    <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="field"
                    />
                    <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="field"
                    />
                    <button type="submit" className="submit-bttn">Login</button>
                </form>
                <p>Don't have an account? <Link to="#" onClick={switchPage} className="login-link">Sign up here.</Link></p>
                </>
            ) : (
                <>
                <form onSubmit={handleSignup}>
                        <input
                            type="email"
                            placeholder="Email"
                            className="field"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} />
                        <input
                            type="password"
                            placeholder="Password"
                            className="field"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} />
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            className="field"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)} />
                        <button type="submit" className="submit-bttn">Signup</button>
                    </form>
                    <p>Already have an account? <Link to="#" className="login-link" onClick={switchPage}>Sign in here.</Link></p>
                    </>
            )}
            
            {error && <p className="error">{error}</p>}
            
        </div>
    )
}