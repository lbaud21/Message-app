import React from "react";
import { useConversations } from "../contexts/ConversationsProvider";
import Modal from "./Modal";
import useModal from "../hooks/useModal";
import OpenConversationModalContent from "./OpenConversationModalContent";

export default function Conversations({ username }) {
  const { conversations } = useConversations();
  const {
    selectedConversationIndex,
    setSelectedConversationIndex,
  } = useConversations();
  const [open, openModal, closeModal] = useModal();

  const handleClick = (index) => {
    setSelectedConversationIndex(index);
    openModal();
  };

  return (
    <div className="navbar-main-content">
      <ul style={{ padding: 0 }}>
        {conversations.map((conversation, index) => (
          <li
            className="conversations-list nav-main-content-list"
            key={`conversation ${index}`}
            onClick={() => handleClick(index)}
          >
            <p className="nav-main-content-list-text">
              {conversation.recipients
                .filter((recipient) => recipient !== username)
                .join(", ")}
            </p>
          </li>
        ))}
      </ul>
      {open ? (
        <Modal modalType="openConversation">
          <OpenConversationModalContent
            username={username}
            selectedConversationIndex={selectedConversationIndex}
            closeModal={closeModal}
          />
        </Modal>
      ) : null}
    </div>
  );
}
