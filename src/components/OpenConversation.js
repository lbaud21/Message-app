import React from "react";

export default function OpenConversation() {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div
      className="conversation-container"
      style={{ position: "absolute", bottom: "0", right: "0" }}
    >
      <form>
        <textarea style={{ height: "100%", margin: "0" }}></textarea>
        <button onClick={handleSubmit}>Send</button>
      </form>
    </div>
  );
}
