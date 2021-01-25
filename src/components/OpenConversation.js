import React, { useState } from "react";
import { useConversations } from "../contexts/ConversationsProvider";

export default function OpenConversation({
  selectedConversationIndex,
  username,
}) {
  const [text, setText] = useState("");
  const { addMessage } = useConversations();

  const handleSubmit = (e) => {
    e.preventDefault();
    addMessage(selectedConversationIndex, text, username);
    setText("");
  };

  const handleChange = (e) => {
    setText(e.target.value);
  };

  return (
    <div
      className="conversation-container"
      style={{ position: "absolute", bottom: "0", right: "0" }}
    >
      <form>
        <textarea
          value={text}
          onChange={handleChange}
          style={{ height: "100%", margin: "0" }}
        ></textarea>
        <button onClick={handleSubmit}>Send</button>
      </form>
    </div>
  );
}
