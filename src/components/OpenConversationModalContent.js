import React, { useState, useCallback } from "react";
import { useConversations } from "../contexts/ConversationsProvider";
import "../styles/OpenConversationModalContent.css";

export default function OpenConversation({
  username,
  selectedConversationIndex,
  closeModal,
}) {
  const [text, setText] = useState("");
  const { sendMessage } = useConversations();
  const { conversations } = useConversations();

  const lastMessageRef = useCallback((node) => {
    if (node) {
      node.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(selectedConversationIndex, text, username);
    setText("");
  };

  const handleChange = (e) => {
    setText(e.target.value);
  };

  return (
    <div className="conversation-container">
      <button
        className="return-button-container"
        type="button"
        onClick={closeModal}
      >
        <img
          className="return-button"
          src={`${process.env.PUBLIC_URL}/images/return-icon.png`}
          alt="return icon"
        />
      </button>
      {conversations[selectedConversationIndex] ? (
        <div className="messages-container">
          {conversations[selectedConversationIndex].messages.map(
            (message, index) => {
              const lastMessage =
                conversations[selectedConversationIndex].messages.length - 1 ===
                index;
              return (
                <div
                  key={`message-${index}`}
                  ref={lastMessage ? lastMessageRef : null}
                  className="single-message-container"
                  style={
                    message.sender === username
                      ? { alignSelf: "flex-end", backgroundColor: "lightblue" }
                      : {
                          alignSelf: "flex-start",
                          backgroundColor: "lightgreen",
                        }
                  }
                >
                  <div className="message-text">{message.text}</div>
                  <div className="message-sender">
                    {message.sender === username ? "you" : message.sender}
                  </div>
                </div>
              );
            }
          )}
        </div>
      ) : null}

      <form>
        <textarea value={text} onChange={handleChange}></textarea>
        <button onClick={handleSubmit}>Send</button>
      </form>
    </div>
  );
}
