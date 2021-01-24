import React, { useRef } from "react";
import { useContacts } from "../contexts/ContactsProvider";

export default function ContactsModalContent({ closeModal }) {
  const usernameRef = useRef();
  const { createContact } = useContacts();

  const handleSubmit = (e) => {
    e.preventDefault();
    createContact(usernameRef.current.value);
    closeModal();
  };

  return (
    <>
      <h2>Create contact</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            placeholder="Username of your new contact"
            ref={usernameRef}
          />
        </label>
        <button type="submit">Add</button>
        <hr />
        <button onClick={closeModal}>Close</button>
      </form>
    </>
  );
}
