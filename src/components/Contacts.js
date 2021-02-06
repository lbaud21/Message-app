import React from "react";
import { useContacts } from "../contexts/ContactsProvider";

export default function Contacts() {
  const { contacts } = useContacts();

  return (
    <div className="navbar-main-content">
      {contacts.map((contact) => (
        <p key={contact.username}>{contact.username}</p>
      ))}
    </div>
  );
}
