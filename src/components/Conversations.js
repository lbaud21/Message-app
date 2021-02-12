import React, { useCallback } from "react";
import { useConversations } from "../contexts/ConversationsProvider";
import Modal from "./Modal";
import useModal from "../hooks/useModal";
import OpenConversationModalContent from "./OpenConversationModalContent";
import ConversationsList from "./ConversationsList";

export default function Conversations({ username }) {
  //const conversationsNamesList = [1];
  const { conversationsNamesList } = useConversations();
  const {
    selectedConversationIndex,
    setSelectedConversationIndex,
  } = useConversations();
  //const selectedConversationIndex = 0;
  const [open, openModal, closeModal] = useModal();

  const handleClick = useCallback(
    (index) => {
      setSelectedConversationIndex(index);
      openModal();
    },
    [openModal, setSelectedConversationIndex]
  );

  return (
    <div className="navbar-main-content">
      <ConversationsList
        username={username}
        conversationsNamesList={conversationsNamesList}
        handleClick={handleClick}
      />

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
