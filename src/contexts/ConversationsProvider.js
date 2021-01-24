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

  return (
    <ConversationsContext.Provider
      value={{
        conversations,
        createConversation,
        selectedConversationIndex,
        setSelectedConversationIndex,
      }}
    >
      {children}
    </ConversationsContext.Provider>
  );
}
