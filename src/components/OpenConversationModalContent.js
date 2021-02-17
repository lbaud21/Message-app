import React, { useState, useCallback } from "react";
import { useConversations } from "../contexts/ConversationsProvider";
import TypingNotification from "./TypingNotification";
import "../styles/OpenConversationModalContent.css";

export default function OpenConversation({ username, closeModal }) {
  const [text, setText] = useState("");
  const { sendMessage } = useConversations();
  const { conversations } = useConversations();
  const { selectedConversationIndex } = useConversations();
  const { typing } = useConversations();

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
    typing(selectedConversationIndex);
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
      {conversations[selectedConversationIndex].messages ? (
        <div className="messages-container">
          <div className="messages-subcontainer">
            {conversations[selectedConversationIndex].messages.map(
              (message, index) => {
                const lastMessage =
                  conversations[selectedConversationIndex].messages.length -
                    1 ===
                  index;
                return (
                  <div
                    key={`message-${index}`}
                    ref={lastMessage ? lastMessageRef : null}
                    className="single-message-container"
                    style={
                      message.sender === username
                        ? {
                            alignSelf: "flex-end",
                            backgroundColor: "lightblue",
                          }
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
            <TypingNotification
              conversations={conversations}
              selectedConversationIndex={selectedConversationIndex}
            />
          </div>
        </div>
      ) : null}

      <form>
        <textarea value={text} onChange={handleChange}></textarea>
        <button className="send-message-button" onClick={handleSubmit}>
          Send
        </button>
      </form>
    </div>
  );
}
