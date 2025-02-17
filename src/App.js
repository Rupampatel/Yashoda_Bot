
import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [chatInitialized, setChatInitialized] = useState(false);

  const handleButtonClick = () => {
    if (!chatInitialized) {
      // Load the Botpress WebChat script dynamically
      const script = document.createElement("script");
      script.src = "https://botlab.dataman.in:8107/assets/modules/channel-web/inject.js"; 
      script.async = true;

      // Add script load and error event listeners
      script.onload = () => {
        console.log("Botpress WebChat script loaded successfully");

        // Initialize the bot chat
        if (window.botpressWebChat) {
          window.botpressWebChat.init({
            host: "https://botlab.dataman.in:8107/", // Botpress instance URL
            botId: "aarogi",  //Bot ID
          });

          setChatInitialized(true); // Only initialize once
          console.log("Botpress WebChat initialized");
        } else {
          console.error("Botpress WebChat script loaded, but init function not found.");
        }
      };

      script.onerror = () => {
        console.error("Failed to load Botpress WebChat script.");
      };

      // Append the script to the body
      document.body.appendChild(script);
    } else {
      // If the chat is already initialized, just show the widget
      if (window.botpressWebChat) {
        window.botpressWebChat.sendEvent({ type: 'show' });
        console.log("Botpress WebChat opened.");
      } else {
        console.error("Botpress WebChat is not available.");
      }
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to Dataman</h1>
        <button onClick={handleButtonClick} className="chat-button">
          Let's Chat
        </button>
      </header>
    </div>
  );
};

export default App;
