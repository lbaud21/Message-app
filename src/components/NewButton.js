import React from "react";
import useModal from "../hooks/useModal";
import Modal from "./Modal";
import NewContactsModalContent from "./NewContactsModalContent";
import NewConversationModalContent from "./NewConversationModalContent";

export default function NewButton({ selected, username }) {
  const [open, openModal, closeModal] = useModal();

  return (
    <>
      <button onClick={openModal}>
        New {selected === "conversations" ? "conversation" : "contact"}
      </button>

      {open ? (
        selected === "conversations" ? (
          <Modal modalType="newConversation">
            <NewConversationModalContent
              closeModal={closeModal}
              username={username}
            />
          </Modal>
        ) : (
          <Modal>
            <NewContactsModalContent closeModal={closeModal} />
          </Modal>
        )
      ) : null}
    </>
  );
}
