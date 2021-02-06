import React from "react";
import useModal from "../hooks/useModal";
import Modal from "./Modal";
import ContactsModalContent from "./ContactsModalContent";
import NewConversationModalContent from "./NewConversationModalContent";

export default function NewButton({ selected, username }) {
  const [open, openModal, closeModal] = useModal();

  return (
    <>
      <button onClick={openModal}>
        New {selected === "conversations" ? "conversation" : "contact"}
      </button>

      {open ? (
        <Modal>
          {selected === "conversations" ? (
            <NewConversationModalContent
              closeModal={closeModal}
              username={username}
            />
          ) : (
            <ContactsModalContent closeModal={closeModal} />
          )}
        </Modal>
      ) : null}
    </>
  );
}
