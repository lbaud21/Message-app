import React from "react";

export default function TypingNotification({
  conversations,
  selectedConversationIndex,
}) {
  return (
    <>
      {conversations[selectedConversationIndex].isTyping.length > 0 ? (
        <div className="typing-notification-container single-message-container">
          <div className="typing-notification-text">
            {conversations[selectedConversationIndex].isTyping.length > 1 ? (
              <p>{`${conversations[selectedConversationIndex].isTyping.join(
                " "
              )} are typing`}</p>
            ) : (
              <p>{`${conversations[selectedConversationIndex].isTyping.join(
                " "
              )} is typing`}</p>
            )}

            <span className="first-suspension-point suspension-point">.</span>
            <span className="second-suspension-point suspension-point">.</span>
            <span className="third-suspension-point suspension-point">.</span>
          </div>
        </div>
      ) : null}
    </>
  );
}
