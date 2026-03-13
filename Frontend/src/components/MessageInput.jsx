import React from "react";
import { FiSend } from "react-icons/fi";

const MessageInput = ({ message, setMessage, sendMessage }) => {

  return (
    <div className="p-4 bg-white border-t flex items-center gap-3">

      <input
        type="text"
        placeholder="Type your message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="flex-1 border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-400"
      />

      <button
        onClick={sendMessage}
        className="bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition"
      >
        <FiSend size={18} />
      </button>

    </div>
  );
};

export default MessageInput;