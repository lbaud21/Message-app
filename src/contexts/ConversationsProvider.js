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
  const [conversationsNamesList, setConversationsNamesList] = useState(() =>
    conversations.map((conversation) => conversation.recipients)
  );

  useEffect(() => {
    setConversationsNamesList(
      conversations.map((conversation) => conversation.recipients)
    );
  }, [conversations]);

  const socket = useSocket();

  const createConversationId = useCallback((recipients, conversations) => {
    let conversationId = recipients.sort().join("-");
    let numberOfConversationsWithSameId = null;

    if (conversations) {
      numberOfConversationsWithSameId = conversations.filter(
        (conversation) =>
          conversation.recipients.sort().join("-") === conversationId
      ).length;
    }

    if (numberOfConversationsWithSameId === 0) {
      return conversationId;
    } else {
      conversationId += `-${numberOfConversationsWithSameId}`;
      return conversationId;
    }
  }, []);

  const createConversation = useCallback(
    (recipients, conversations) => {
      const conversationId = createConversationId(recipients, conversations);
      setConversations((prevConversations) => [
        ...prevConversations,
        { conversationId, recipients, messages: [] },
      ]);
    },
    [createConversationId, setConversations]
  );

  const addMessage = useCallback(
    (conversationId, text, username, recipients, conversations) => {
      const newMessage = { sender: username, text };

      if (
        conversations.some(
          (conversation) => conversation.conversationId === conversationId
        ) === false
      ) {
        createConversation(recipients, conversations);
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
    [setConversations, createConversation]
  );

  const sendMessage = useCallback(
    (index, text, username) => {
      const conversation = conversations[index];
      const recipients = conversation.recipients;
      const conversationId = conversation.conversationId;
      socket.emit("send-message", { conversationId, text, recipients });
      addMessage(conversationId, text, username, recipients, conversations);
    },
    [addMessage, socket, conversations]
  );

  useEffect(() => {
    if (socket === null) return;
    socket.on(
      "receive-message",
      ({ conversationId, text, username, recipients }) => {
        addMessage(conversationId, text, username, recipients, conversations);
      }
    );
    return () => socket.off("receive-message");
  }, [socket, addMessage, conversations]);

  return (
    <ConversationsContext.Provider
      value={{
        conversations,
        conversationsNamesList,
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
