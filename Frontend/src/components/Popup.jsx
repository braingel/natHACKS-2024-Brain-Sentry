// import React from "react";
// import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import Nav from "./Nav.jsx"
import Header from "./Header.jsx"
import Content from "./Content.jsx"

import React, { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../firebase.jsx";

import './Popup.css'

export default function Popup() {

    const [currentPage, setCurrentPage] = useState("home")

    const navigate = useNavigate();

    function changePage(name) {
        setCurrentPage(name);
        navigate(`/dashboard/${name}`);
    }
    
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
        // alert("Signed out successfully");
        setUserEmailPrefix(null); 
        navigate("/")
        } catch (error) {
        console.error("Error signing out:", error);
        }
    };
    return (
        <>
            <div className="main-popup">
                <div className="grid-container">
                    <Nav 
                        currentPage={currentPage}
                        changePage={changePage}
                        handleSignOut={handleSignOut}
                    />
                    <Header 
                        currentPage={currentPage}
                    />
                    <Content 
                        currentPage={currentPage}
                    />
                </div>
            </div>
        </>
    )
}