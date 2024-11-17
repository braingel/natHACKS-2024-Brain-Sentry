import React from "react";
import { useNavigate } from "react-router-dom";
import './Home.css'

export default function Home() {
    const navigate = useNavigate();

    const handleStartClick = () => {
        navigate('/dashboard/session');
    };

    return (
        <div className="content-contanier">
            <div className="welcome-section">
                <h1>Welcome John Doe,</h1> {/* TODO: Add prop to replace John Doe*/}
                <h2>Your risk for neurodegeneration is <span className="highlight">low</span> based on the results of your latest speech analysis.</h2> {/* TODO: Add prop to replace low */}
            </div>
            <div className="dash">
                <div className="last-info">
                    <img src="/clock.svg" alt="" />
                    <p>Last speech task completed: September 9, 2024 </p> {/* TODO: Add prop to replace date */}
                </div>
                <div className="start-card">
                    <p>Your next speech task is scheduled for November 17, 2024</p> 
                        {/* TODO: Add prop to replace date, will probably adjust the date from the info from the last speech task */}
                    <button className="start-task-bttn" onClick={handleStartClick}>
                        Start task now
                        <img src="/arrow-right.svg" alt="" />
                    </button>

                </div>
            </div>
        </div>
    )
} 



/* to receive props: */
/* 
import React from "react";
import { useOutletContext } from "react-router-dom";

export default function Child() {
    const { someProp } = useOutletContext(); // Access the prop

    return (
        <div>
            <h2>Child Component</h2>
            <p>{someProp}</p>
            </div>
        );
    }
    
*/