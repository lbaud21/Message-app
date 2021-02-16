import React from "react";
import { useConversations } from "../contexts/ConversationsProvider";

const ConversationsList = ({
  username,
  conversationsNamesList,
  handleClick,
}) => {
  const { deleteConversation } = useConversations();

  return (
    <ul>
      {conversationsNamesList.map((recipients, index) => (
        <li
          className="conversations-list nav-main-content-list"
          key={`conversation ${recipients.sort().join("-")}`}
          onClick={(e) => {
            handleClick(index);
          }}
        >
          <p className="nav-main-content-list-text">
            {recipients
              .filter((recipient) => recipient !== username)
              .join(", ")}
          </p>

          <div
            className="delete-conversation-button"
            onClick={(e) => {
              console.log(recipients.sort().join("-"));
              deleteConversation(recipients.sort().join("-"));
              e.stopPropagation();
            }}
          >
            <img
              className="delete-conversation-icon"
              src={`${process.env.PUBLIC_URL}/images/trash-icon.png`}
              alt="delete conversation icon"
            />
          </div>
        </li>
      ))}
    </ul>
  );
};

const MemoizedConversationsList = React.memo(
  ConversationsList,
  (prevProps, nextProps) =>
    prevProps.conversationsNamesList.length ===
    nextProps.conversationsNamesList.length
);

export default MemoizedConversationsList;
