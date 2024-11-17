import React from "react";
import { Link } from 'react-router-dom';
import './PageNotFound.css'

export default function PageNotFound() {
    return (
        <>
            <h1 className="not-found-header">404 - Page Not Found</h1>
            <p className="not-found-p">The page you're trying to access isn't available. Please check the URL or return to the <Link to="/">home page</Link>.</p>
        </>
    )
}