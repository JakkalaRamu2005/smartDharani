import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import "./chatbot.css";

function SmartDharaniBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello ! I’m Smart Dharani — your assistant. How can I help you today?" },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const toggleChat = () => setIsOpen(!isOpen);

  const handleSend = async () => {
    const text = input.trim();
    if (!text || isLoading) return;

   
    const newUserMsg = { sender: "user", text };
    setMessages((prev) => [...prev, newUserMsg]);
    setInput("");
    setIsLoading(true);

    try {
      const res = await axios.post("https://smartdharani-2.onrender.com/api/dharani/chat", {
        messages: [...messages, newUserMsg],
      });

      const botReply = res.data.reply || "Sorry, I didn’t catch that.";
      setMessages((prev) => [...prev, { sender: "bot", text: botReply }]);
    } catch (err) {
      console.error("Error fetching bot reply:", err);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: " Sorry, Smart Dharani is currently unavailable." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="chatbot-container">
     
      {!isOpen && (
        <div className="chatbot-button" onClick={toggleChat} aria-label="Open chat">
          
        </div>
      )}

      
      {isOpen && (
        <div className="chat-window">
          <div className="chat-header">
            <span>🌾 Smart Dharani</span>
            <button className="chat-close-btn" onClick={toggleChat}>
              ✕
            </button>
          </div>

          <div className="chat-body">
            {messages.map((msg, idx) => (
              <div key={idx} className={`message ${msg.sender}`}>
                {msg.text}
              </div>
            ))}
            {isLoading && <div className="message bot">Typing...</div>}
            <div ref={messagesEndRef} />
          </div>

          <div className="chat-input-area">
            <input
              type="text"
              placeholder="Ask about land records, survey numbers..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              disabled={isLoading}
            />
            <button onClick={handleSend} disabled={!input.trim() || isLoading}>
              {isLoading ? "..." : "Send"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default SmartDharaniBot;
