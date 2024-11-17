import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./Session.css"

export default function Session({serverUrl}) {
    const [isRecording, setIsRecording] = useState(false);
    const [audioUrl, setAudioUrl] = useState("");
    const mediaRecorderRef = useRef(null);
    const audioChunksRef = useRef([]);
    const recordingTimeoutRef = useRef(null); // To store the timeout reference
    const navigate = useNavigate();


    // Start recording
    const startRecording = async () => {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaRecorderRef.current = new MediaRecorder(stream);

        mediaRecorderRef.current.ondataavailable = (event) => {
            audioChunksRef.current.push(event.data);
        };

        mediaRecorderRef.current.onstop = () => {
            const blob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
            const url = URL.createObjectURL(blob);
            setAudioUrl(url);  // Set the URL for playback
            sendAudioToServer(blob);  // Send audio to server after recording
        };

        mediaRecorderRef.current.start();
        setIsRecording(true);

        // Automatically stop recording after 2 minutes
        recordingTimeoutRef.current = setTimeout(() => {
            stopRecording();
        }, 120000); // 120,000ms = 2 minutes
    };

    // Stop recording
    const stopRecording = () => {
        if (mediaRecorderRef.current) {
        mediaRecorderRef.current.stop();
        setIsRecording(false);

        // Clear the timeout if the recording is stopped manually before 2 minutes
        if (recordingTimeoutRef.current) {
            clearTimeout(recordingTimeoutRef.current);
            recordingTimeoutRef.current = null;
        }
        }
    };

    // Send audio to server
    const sendAudioToServer = async (audioBlob) => {
        const formData = new FormData();
        formData.append("audio", audioBlob, "audio.wav");

        try {
            const response = await fetch(serverUrl, {
            method: "POST",
            body: formData,
            });

            if (!response.ok) {
                console.error("Error sending audio to server.");
              } else {
                const analysisResult = await response.json(); // Assume the server returns JSON
                console.log("Audio sent successfully!", analysisResult);
        
                // Navigate to results page and pass the data
                navigate("/dashboard/results", { state: { analysisResult } });
            }
        } catch (error) {
            console.error("Failed to send audio:", error);
        }
    };

    return (
        <div className="session-container">
            <p className="prompt">"Describe a recent memorable experience you've had. It could be something fun, meaningful, or even a small moment that stood out to you."</p>
            <p className="tip">(You have 2 minutes to talk—start whenever you're ready, and we'll let you know when to stop.)</p>
            <div className="studio">
                <p> {isRecording ? "Keep talking!" : "Click start speaking to begin your task."}</p> 
            </div>
            <div className="controls">
                <div className="restart-icon-container">
                </div>
                <button 
                    onClick={startRecording}
                    disabled={isRecording}
                    className="start-bttn">
                    <img src="/play.svg" alt="" />
                    Start speaking
                </button>
                <button 
                    className="submit-audio-bttn"
                    onClick={stopRecording}
                    disabled={!isRecording} // Enable only if recording is active
                    >
                    <img src="/submit.svg" alt="" />
                    Submit recording
                </button>
            </div>
        </div>
    ) 
}