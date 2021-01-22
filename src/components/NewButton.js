import React from "react";
import useModal from "../hooks/useModal";
import Modal from "./Modal";

export default function NewButton({ selected }) {
  const [open, openModal, closeModal] = useModal();

  return (
    <div>
      <button onClick={openModal} style={{ position: "absolute", bottom: "0" }}>
        New {selected === "conversations" ? "conversation" : "contact"}
      </button>

      {open ? (
        <Modal closeModal={closeModal}>
          {selected === "conversations" ? <p>Conversation</p> : <p>Contacts</p>}
        </Modal>
      ) : null}
    </div>
  );
}
