import React, { useState } from "react";
import { useContacts } from "../contexts/ContactsProvider";
import { useConversations } from "../contexts/ConversationsProvider";

export default function NewConversationModalContent({ closeModal }) {
  const { contacts } = useContacts();
  const [selectedContacts, setSelectedContacts] = useState([]);
  const { createConversation } = useConversations();

  const handleChange = (e, username) => {
    e.target.checked
      ? setSelectedContacts((prevSelectedContacts) => [
          ...prevSelectedContacts,
          username,
        ])
      : setSelectedContacts(
          selectedContacts.filter(
            (contactUsername) => contactUsername !== username
          )
        );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createConversation(selectedContacts);
    closeModal();
  };

  return (
    <>
      <h2>Create new conversation</h2>
      <form onSubmit={handleSubmit}>
        <ul>
          {contacts.map((contact) => (
            <li key={contact.username}>
              <label>
                {contact.username}
                <input
                  type="checkbox"
                  onChange={(e) => handleChange(e, contact.username)}
                />
              </label>
            </li>
          ))}
        </ul>
        <button type="submit">Create</button>
        <hr />
        <button onClick={closeModal}>Close</button>
      </form>
    </>
  );
}
