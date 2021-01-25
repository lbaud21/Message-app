import React, { useContext, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const ConversationsContext = React.createContext();

export function useConversations() {
  return useContext(ConversationsContext);
}

export function ConversationsProvider({ children }) {
  const [conversations, setConversations] = useLocalStorage(
    "conversations",
    [],
    true
  );
  const [selectedConversationIndex, setSelectedConversationIndex] = useState(0);

  function createConversation(recipients) {
    setConversations((prevConversations) => [
      ...prevConversations,
      { recipients, messages: [] },
    ]);
  }

  const addMessage = (index, text, username) => {
    const newMessage = { username, text };
    setConversations((prevConversations) => {
      const newConversations = prevConversations.map((conversation, i) => {
        return index === i
          ? {
              ...conversation,
              messages: [...conversation.messages, newMessage],
            }
          : { ...conversation };
      });
      return newConversations;
    });
  };

  return (
    <ConversationsContext.Provider
      value={{
        conversations,
        createConversation,
        selectedConversationIndex,
        setSelectedConversationIndex,
        addMessage,
      }}
    >
      {children}
    </ConversationsContext.Provider>
  );
}
