import React from "react";

const MessageBubble = ({ message }) => {

  const isSender = message.sender === "volunteer";

  return (
    <div className={`flex ${isSender ? "justify-end" : "justify-start"}`}>

      <div
        className={`max-w-xs px-4 py-2 rounded-xl shadow ${
          isSender
            ? "bg-blue-500 text-white"
            : "bg-white border"
        }`}
      >

        <p>{message.text}</p>

        <span className="text-xs opacity-70 block mt-1">
          {message.time}
        </span>

      </div>

    </div>
  );
};

export default MessageBubble;