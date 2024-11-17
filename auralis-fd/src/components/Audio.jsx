import React, { useState, useRef } from "react";

export default function AudioRecorder({ serverUrl }) {
  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState("");
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  
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
  };

  // Stop recording
  const stopRecording = () => {
    mediaRecorderRef.current.stop();
    setIsRecording(false);
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
        console.log("Audio sent successfully!");
      }
    } catch (error) {
      console.error("Failed to send audio:", error);
    }
  };

  return (
    <div>
      <button onClick={isRecording ? stopRecording : startRecording}>
        {isRecording ? "Stop Recording" : "Start Recording"}
      </button>

      {audioUrl && <audio src={audioUrl} controls />}
    </div>
  );
}
