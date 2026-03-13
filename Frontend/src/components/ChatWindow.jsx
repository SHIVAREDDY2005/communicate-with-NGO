import React from "react";
import MessageBubble from "./MessageBubble";

const ChatWindow = ({ messages }) => {
  return (
    <div className="flex-1 p-6 overflow-y-auto space-y-4">

      {messages.map((msg) => (
        <MessageBubble key={msg.id} message={msg} />
      ))}

    </div>
  );
};

export default ChatWindow;