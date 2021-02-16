import React, { useState } from "react";
import { useContacts } from "../contexts/ContactsProvider";
import { useConversations } from "../contexts/ConversationsProvider";
import "../styles/NewConversationModalContent.css";

export default function NewConversationModalContent({ closeModal, username }) {
  const { contacts } = useContacts();
  const [selectedContacts, setSelectedContacts] = useState([]);
  const { createConversation } = useConversations();
  const { createConversationId } = useConversations();
  const { conversations } = useConversations();

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

    setSelectedContacts((prevState) => [...prevState, username]);
    const conversationId = createConversationId(selectedContacts);
    if (
      !conversations.some(
        (conversation) => conversation.conversationId === conversationId
      )
    ) {
      createConversation(selectedContacts);
      closeModal();
    } else {
      setSelectedContacts((prevState) =>
        prevState.filter((name) => name !== username)
      );
      alert("This conversation already exists");
    }
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
        <button disabled={selectedContacts.length < 1} type="submit">
          Create
        </button>
        <hr />
        <button onClick={closeModal}>Close</button>
      </form>
    </div>
  );
}
