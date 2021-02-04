import React from "react";
import { useConversations } from "../contexts/ConversationsProvider";

export default function Conversations({ username }) {
  const { conversations } = useConversations();
  const {
    selectedConversationIndex,
    setSelectedConversationIndex,
  } = useConversations();

  const handleClick = (index) => {
    setSelectedConversationIndex(index);
  };

  return (
    <>
      <ul style={{ padding: 0 }}>
        {conversations.map((conversation, index) => (
          <li
            key={`conversation ${index}`}
            onClick={() => handleClick(index)}
            style={
              selectedConversationIndex === index
                ? {
                    border: "black solid 1px",
                    listStyleType: "none",
                    backgroundColor: "red",
                    textAlign: "center",
                  }
                : {
                    border: "black solid 1px",
                    listStyleType: "none",
                    backgroundColor: "white",
                    textAlign: "center",
                  }
            }
          >
            <p>
              {conversation.recipients
                .filter((recipient) => recipient !== username)
                .join(", ")}
            </p>
          </li>
        ))}
      </ul>
    </>
  );
}
