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

  const createConversationId = useCallback((recipients, conversations) => {
    let conversationId = recipients.sort().join("-");
    const numberOfConversationsWithSameId = conversations.filter(
      (conversation) =>
        conversation.recipients.sort().join("-") === conversationId
    ).length;
    if (numberOfConversationsWithSameId === 0) {
      return conversationId;
    } else {
      conversationId += `-${numberOfConversationsWithSameId}`;
      return conversationId;
    }
  }, []);

  const createConversation = useCallback(
    (recipients) => {
      const conversationId = createConversationId(recipients, conversations);
      setConversations((prevConversations) => [
        ...prevConversations,
        { conversationId, recipients, messages: [] },
      ]);
    },
    [conversations, createConversationId, setConversations]
  );

  const addMessage = useCallback(
    (conversationId, text, username, recipients) => {
      const newMessage = { sender: username, text };

      if (
        conversations.some(
          (conversation) => conversation.conversationId === conversationId
        ) === false
      ) {
        createConversation(recipients);
      }

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
    [setConversations, createConversation, conversations]
  );

  const sendMessage = (index, text, username) => {
    const conversation = conversations[index];
    const recipients = conversation.recipients;
    const conversationId = conversation.conversationId;
    socket.emit("send-message", { conversationId, text, recipients });
    addMessage(conversationId, text, username, recipients);
  };

  useEffect(() => {
    if (socket === null) return;
    socket.on(
      "receive-message",
      ({ conversationId, text, username, recipients }) => {
        addMessage(conversationId, text, username, recipients);
      }
    );
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
