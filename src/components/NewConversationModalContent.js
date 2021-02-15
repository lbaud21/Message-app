import React, { useState } from "react";
import { useContacts } from "../contexts/ContactsProvider";
import { useConversations } from "../contexts/ConversationsProvider";
import "../styles/NewConversationModalContent.css";

export default function NewConversationModalContent({ closeModal, username }) {
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
    if (selectedContacts) {
      selectedContacts.push(username);
      createConversation(selectedContacts);
    }

    closeModal();
  };

  return (
    <div className="new-conversation-modal-content">
      <h2 className="new-conversation-contact-modal-title">
        Create new conversation
      </h2>
      <form className="new-conversation-form" onSubmit={handleSubmit}>
        <ul>
          {contacts.map((contact) => (
            <li key={contact.username}>
              <input
                type="checkbox"
                onChange={(e) => handleChange(e, contact.username)}
              />
              <label>{contact.username}</label>
            </li>
          ))}
        </ul>
        <button type="submit">Create</button>
        <hr />
        <button onClick={closeModal}>Close</button>
      </form>
    </div>
  );
}
