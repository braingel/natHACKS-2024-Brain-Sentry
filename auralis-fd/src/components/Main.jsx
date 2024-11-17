import React from "react";
import { Outlet } from 'react-router-dom';
import Popup from "./Popup"
import './Main.css'

export default function Main() {
    return (
        <>
            <div className="main-background">
                <Popup />
            </div>
        </>
    )
}