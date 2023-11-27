import React, { useState, useEffect } from "react";
import "../Chat/chatMain.css";

const ChatMain = ({ data }) => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");

  useEffect(() => {
    // Similar to previous code for connecting and consuming messages
    // ...

    return () => {
      // Cleanup code or disconnect from the message queue if needed
    };
  }, []); // Run only once when the component mounts

  const sendMessage = async () => {
    // Similar to previous code for sending messages
    // ...

    setInputMessage("");
  };

  return (
    <div className="chat-container">
      <div>
        <p>{`Chatting With ${data && data.name}`}</p>
      </div>
      <div className="chat-display">
        {messages.map((msg, index) => (
          <div key={index} className="message">
            {msg}
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          placeholder="Type a message"
          value={data && data.name}
          onChange={(e) => setInputMessage(e.target.value)}
        />
        {console.log(data)}

        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatMain;
