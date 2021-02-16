import React, { useContext, useState, useEffect, useCallback } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { useSocket } from "./SocketProvider";
import { useContacts } from "./ContactsProvider";

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
  const { contacts } = useContacts();

  useEffect(() => {
    setConversationsNamesList(
      conversations.map((conversation) => conversation.recipients)
    );
  }, [conversations]);

  const socket = useSocket();

  const createConversationId = useCallback((recipients) => {
    let conversationId = recipients.sort().join("-");

    return conversationId;
  }, []);

  const createConversation = useCallback(
    (recipients) => {
      const conversationId = createConversationId(recipients, conversations);
      setConversations((prevConversations) => [
        ...prevConversations,
        { conversationId, recipients, messages: [], isTyping: [] },
      ]);
    },
    [createConversationId, setConversations, conversations]
  );

  const deleteConversation = (conversationId) => {
    setConversations((prevConversations) =>
      prevConversations.filter(
        (conversation) => conversation.conversationId !== conversationId
      )
    );
  };

  const addMessage = useCallback(
    (conversationId, text, username, recipients, conversations) => {
      const newMessage = { sender: username, text };

      if (
        conversations.some(
          (conversation) => conversation.conversationId === conversationId
        ) === false
      ) {
        console.log("create enter");
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

  const typing = useCallback(
    (index) => {
      const conversation = conversations[index];
      const recipients = conversation.recipients;
      const conversationId = conversation.conversationId;
      socket.emit("typing", { conversationId, recipients });
    },
    [conversations, socket]
  );

  const addTyping = useCallback(
    (conversationId, username, conversations) => {
      if (
        conversations &&
        conversations.some(
          (conversation) => conversation.conversationId === conversationId
        )
      ) {
        console.log("addTyping enter");
        setConversations((prevConversations) => {
          const newConversations = prevConversations.map((conversation) => {
            if (conversationId === conversation.conversationId) {
              return conversation.isTyping.includes(username)
                ? { ...conversation }
                : {
                    ...conversation,
                    isTyping: [...conversation.isTyping, username],
                  };
            } else return { ...conversation };
          });
          return newConversations;
        });
      }
    },
    [setConversations]
  );

  const removeTyping = useCallback(
    (conversationId, username, conversations) => {
      if (
        conversations.some(
          (conversation) => conversation.conversationId === conversationId
        )
      ) {
        console.log("remove enter");
        setConversations((prevConversations) => {
          const newConversations = prevConversations.map((conversation) => {
            return conversationId === conversation.conversationId
              ? {
                  ...conversation,
                  isTyping: conversation.isTyping.filter(
                    (name) => name !== username
                  ),
                }
              : { ...conversation };
          });
          return newConversations;
        });
      }
    },
    [setConversations]
  );

  useEffect(() => {
    if (socket === null) return;

    socket.on(
      "receive-message",
      ({ conversationId, text, username, recipients }) => {
        if (contacts.some((contact) => contact.username === username)) {
          addMessage(conversationId, text, username, recipients, conversations);
        }
      }
    );

    /*socket.on("receive-is-typing", ({ conversationId, username }) => {
      console.log("receive is typing");
      addTyping(conversationId, username, conversations);
    });

    socket.on("receive-is-not-typing", ({ conversationId, username }) => {
      console.log("receive is not typing");
      removeTyping(conversationId, username, conversations);
    });*/

    return () => socket.off("receive-message");
  }, [socket, addMessage, conversations, addTyping, removeTyping, contacts]);

  return (
    <ConversationsContext.Provider
      value={{
        conversations,
        conversationsNamesList,
        createConversation,
        createConversationId,
        deleteConversation,
        selectedConversationIndex,
        setSelectedConversationIndex,
        sendMessage,
        typing,
      }}
    >
      {children}
    </ConversationsContext.Provider>
  );
}
