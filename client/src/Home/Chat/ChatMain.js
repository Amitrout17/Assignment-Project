import React, { useState, useEffect } from "react";
import "../Chat/chatMain.css";
import axios from "axios";

const ChatMain = ({ data }) => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.post(
          "http://localhost:4000/api/v1/message/get",
          {
            recieverId: data.id,
          },
          {
            withCredentials: true,
          }
        );

        setMessages(response.data.prevMessage.message);
      } catch (error) {
        alert("No message To load");
        setMessages([]);
        console.log(error);
      }
    };

    fetchMessages();
  }, [data.id]);

  console.log(data.id);

  const sendMessage = async () => {
    await axios
      .post(
        "http://localhost:4000/api/v1/message/new",
        {
          recieverId: data.id,
          recieverName: data.name,
          message: inputMessage,
        },
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        console.log(response);
        setInputMessage("");
        setMessages(response.data.isExist.message);
      })
      .catch((error) => {
        alert("Some Error Occured");
        console.log(error);
      });
  };

  return (
    <div className="chat-container">
      <div>
        <p>{`Chatting With ${data && data.name}`}</p>
      </div>
      <div className="chat-display">
        {messages &&
          messages.map((msg, index) => (
            <div key={index} className="message">
              <p>
                <strong>{msg.sender}</strong>: {msg.message}
              </p>
            </div>
          ))}
      </div>

      <div className="chat-input">
        <input
          type="text"
          placeholder="Type a message"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatMain;
