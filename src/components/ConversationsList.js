import React from "react";

const ConversationsList = ({
  username,
  conversationsNamesList,
  handleClick,
}) => {
  return (
    <ul>
      {conversationsNamesList.map((recipients, index) => (
        <li
          className="conversations-list nav-main-content-list"
          key={`conversation ${index}`}
          onClick={() => handleClick(index)}
        >
          <p className="nav-main-content-list-text">
            {recipients
              .filter((recipient) => recipient !== username)
              .join(", ")}
          </p>
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
