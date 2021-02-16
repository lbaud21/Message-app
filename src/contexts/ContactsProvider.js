import React, { useContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const ContactsContext = React.createContext();

export function useContacts() {
  return useContext(ContactsContext);
}

export function ContactsProvider({ children }) {
  const [contacts, setContacts] = useLocalStorage("contacts", [], true);

  function createContact(username) {
    setContacts((prevContacts) => [...prevContacts, { username }]);
  }

  function deleteContact(username) {
    setContacts((prevContacts) =>
      prevContacts.filter((contact) => contact !== username)
    );
  }

  return (
    <ContactsContext.Provider
      value={{ contacts, createContact, deleteContact }}
    >
      {children}
    </ContactsContext.Provider>
  );
}
