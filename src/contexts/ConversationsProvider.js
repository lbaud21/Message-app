import React, { useContext, useState, useEffect, useCallback } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { useSocket } from "./SocketProvider";

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
  const socket = useSocket();

  function createConversation(recipients) {
    const conversationId = createConversationId(recipients, conversations);
    setConversations((prevConversations) => [
      ...prevConversations,
      { conversationId, recipients, messages: [] },
    ]);
  }

  function createConversationId(recipients, conversations) {
    const conversationId = recipients.sort().join("-");
    const numberOfConversationsWithSameId = conversations.filter(
      (conversation) =>
        conversation.recipients.sort().join("-") === conversationId
    ).length;
    if (numberOfConversationsWithSameId === 0) {
      return conversationId;
    } else {
      conversationId.push(`-${numberOfConversationsWithSameId}`);
      return conversationId;
    }
  }

  const addMessage = useCallback(
    (conversationId, text, username) => {
      const newMessage = { sender: username, text };
      setConversations((prevConversations) => {
        const newConversations = prevConversations.map((conversation) => {
          return conversationId === conversation.conversationId
            ? {
                ...conversation,
                messages: [...conversation.messages, newMessage],
              }
            : { ...conversation };
        });
        return newConversations;
      });
    },
    [setConversations]
  );

  const sendMessage = (index, text, username) => {
    const conversation = conversations[index];
    const recipients = conversation.recipients;
    const conversationId = conversation.conversationId;
    socket.emit("send-message", { conversationId, text, recipients });
    addMessage(conversationId, text, username);
  };

  useEffect(() => {
    if (socket === null) return;
    socket.on("receive-message", ({ conversationId, text, username }) => {
      addMessage(conversationId, text, username);
    });
    return () => socket.off("receive-message");
  }, [socket, addMessage]);

  return (
    <ConversationsContext.Provider
      value={{
        conversations,
        createConversation,
        selectedConversationIndex,
        setSelectedConversationIndex,
        sendMessage,
      }}
    >
      {children}
    </ConversationsContext.Provider>
  );
}
