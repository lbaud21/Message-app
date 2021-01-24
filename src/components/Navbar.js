import React, { useState } from "react";
import "../styles/Navbar.css";
import Contacts from "./Contacts";
import Conversations from "./Conversations";
import NewButton from "./NewButton";

export default function Navbar() {
  const [selected, setSelected] = useState("conversations");

  const handleClick = (event) => {
    event.preventDefault();
    setSelected(event.target.name);
    event.target.style.backgroundColor = "red";
  };

  return (
    <>
      <div
        className="nav-container"
        style={{ height: "100%", width: "50%", margin: "0" }}
      >
        <nav>
          <button
            name="conversations"
            className="conversations-button"
            onClick={handleClick}
            style={{
              backgroundColor: selected === "conversations" ? "red" : "white",
            }}
          >
            Conversations
          </button>
          <button
            name="contacts"
            className="contacts-button"
            onClick={handleClick}
            style={{
              backgroundColor: selected === "contacts" ? "red" : "white",
            }}
          >
            Contacts
          </button>
        </nav>

        {selected === "conversations" ? <Conversations /> : <Contacts />}
        <NewButton selected={selected} />
      </div>
    </>
  );
}
