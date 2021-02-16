import React from "react";
import { useContacts } from "../contexts/ContactsProvider";

export default function Contacts() {
  const { contacts } = useContacts();
  const { deleteContact } = useContacts();

  return (
    <div className="navbar-main-content">
      <ul>
        {contacts.map((contact) => (
          <li className="contact-name-list" key={contact.username}>
            <p className="contact-name">{contact.username}</p>

            <div
              className="delete-contact-button"
              onClick={(e) => {
                deleteContact(contact);
              }}
            >
              <img
                className="delete-contact-icon"
                src={`${process.env.PUBLIC_URL}/images/trash-icon.png`}
                alt="delete conversation icon"
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
