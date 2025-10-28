// SmartDharaniBot.jsx
import React, { useState, useRef, useEffect } from "react";
import "./chatbox.css"

// Helper function (in same file for simplicity) for sending message to bot.
// In production, you should call your backend endpoint which uses the Gemini API key securely.
async function sendToBot(userText) {
  // placeholder: you’ll replace with real API call via your backend
  // Example: POST "/api/chatbot" with { message: userText }, backend uses Gemini key.
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // fake bot response
      resolve({ text: `Smart Dharani Bot says: (placeholder reply to “${userText}”)` });
    }, 1000);
  });
}

function SmartDharaniBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const toggleChat = () => {
    setIsOpen((open) => !open);
  };

  const handleSend = async () => {
    const text = input.trim();
    if (!text || isLoading) return;

    // Add user message
    setMessages((prev) => [...prev, { text, sender: "user" }]);
    setInput("");
    setIsLoading(true);

    try {
      const botReply = await sendToBot(text);
      setMessages((prev) => [...prev, { text: botReply.text, sender: "bot" }]);
    } catch (error) {
      setMessages((prev) => [...prev, { text: "Error: could not get reply", sender: "bot" }]);
    } finally {
      setIsLoading(false);
    }
  };

  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="chatbot-container">
      {isOpen && (
        <div className="chat-window">
          <div className="chat-header">
            Smart Dharani Bot
            <button className="chat-close-btn" onClick={toggleChat} aria-label="Close chat">
              ✕
            </button>
          </div>
          <div className="chat-body">
            {messages.map((msg, idx) => (
              <div key={idx} className={`message ${msg.sender}`}>
                {msg.text}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <div className="chat-input-area">
            <input
              type="text"
              placeholder="Type a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSend();
                }
              }}
              aria-label="Enter your message"
              disabled={isLoading}
            />
            <button onClick={handleSend} disabled={!input.trim() || isLoading}>
              {isLoading ? "..." : "Send"}
            </button>
          </div>
        </div>
      )}
      {!isOpen && (
        <div className="chatbot-button" onClick={toggleChat} aria-label="Open chat">
          💬
        </div>
      )}
    </div>
  );
}

export default SmartDharaniBot;
