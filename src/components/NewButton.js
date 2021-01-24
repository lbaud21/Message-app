import React from "react";
import useModal from "../hooks/useModal";
import Modal from "./Modal";
import ContactsModalContent from "./ContactsModalContent";
import NewConversationModalContent from "./NewConversationModalContent";

export default function NewButton({ selected }) {
  const [open, openModal, closeModal] = useModal();

  return (
    <div>
      <button onClick={openModal} style={{ position: "absolute", bottom: "0" }}>
        New {selected === "conversations" ? "conversation" : "contact"}
      </button>

      {open ? (
        <Modal>
          {selected === "conversations" ? (
            <NewConversationModalContent closeModal={closeModal} />
          ) : (
            <ContactsModalContent closeModal={closeModal} />
          )}
        </Modal>
      ) : null}
    </div>
  );
}
