import React, { useState } from "react";
import { useConversations } from "../contexts/ConversationsProvider";

export default function Conversations() {
  const { conversations } = useConversations();
  const [selectedConversationIndex, setSelectedConversationIndex] = useState(0);

  const handleClick = (index) => {
    setSelectedConversationIndex(index);
  };

  return (
    <>
      <ul style={{ padding: 0 }}>
        {conversations.map((conversations, index) => (
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
            <p>{conversations.recipients.join(", ")}</p>
          </li>
        ))}
      </ul>
    </>
  );
}
