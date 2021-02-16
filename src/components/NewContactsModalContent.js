import React, { useRef } from "react";
import { useContacts } from "../contexts/ContactsProvider";

export default function NewContactsModalContent({ closeModal }) {
  const usernameRef = useRef();
  const { createContact } = useContacts();

  const handleSubmit = (e) => {
    e.preventDefault();
    createContact(usernameRef.current.value);
    closeModal();
  };

  return (
    <>
      <h2 className="new-conversation-contact-modal-title">Create contact</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input type="text" placeholder="New contact name" ref={usernameRef} />
        </label>
        <button type="submit">Add</button>
        <hr />
        <button onClick={closeModal}>Close</button>
      </form>
    </>
  );
}
