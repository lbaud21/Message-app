import React, { useState } from "react";
import "../styles/Navbar.css";
import Contacts from "./Contacts";
import Conversations from "./Conversations";
import NewButton from "./NewButton";

export default function Navbar({ username }) {
  const [selected, setSelected] = useState("conversations");

  const handleClick = (event) => {
    event.preventDefault();
    setSelected(event.target.name);
  };

  return (
    <div className="nav-container">
      <div className="new-button">
        <NewButton selected={selected} username={username} />
      </div>

      {selected === "conversations" ? (
        <Conversations username={username} />
      ) : (
        <Contacts />
      )}

      <nav className="nav-buttons-container">
        <button
          name="conversations"
          className="conversations-button nav-button"
          onClick={handleClick}
        >
          <img
            className="icon-image"
            src={`${process.env.PUBLIC_URL}/images/chat-icon-black.png`}
            alt="Chat icon"
          />
        </button>

        <button
          name="contacts"
          className="contacts-button nav-button"
          onClick={handleClick}
        >
          <img
            className="icon-image"
            src={`${process.env.PUBLIC_URL}/images/contacts-icon-black.png`}
            alt="Contacts icon"
          />
        </button>
      </nav>
    </div>
  );
}
