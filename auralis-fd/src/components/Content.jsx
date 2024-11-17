import React from "react";
import { Outlet } from 'react-router-dom';
import Home from "./Home"
import Insights from "./Insights"
import Settings from "./Settings"

import './Content.css'

export default function Content() {
    return (
        <div className="content">
            <Outlet />
        </div>
    ) 
}