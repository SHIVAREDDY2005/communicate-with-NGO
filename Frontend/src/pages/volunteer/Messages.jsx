import React, { useState } from "react";
import Sidebar from "../../layouts/Sidebar"; // ⭐ added
import ConversationList from "../../components/ConversationList";
import ChatHeader from "../../components/ChatHeader";
import ChatWindow from "../../components/ChatWindow";
import MessageInput from "../../components/MessageInput";

const Messages = () => {

  const [message, setMessage] = useState("");

  const [selectedUser, setSelectedUser] = useState({
    name: "HopeForAll Foundation",
  });

  const conversations = [
    {
      id: 1,
      name: "HopeForAll Foundation",
      lastMessage: "Hello! We liked your profile."
    },
    {
      id: 2,
      name: "Green Earth NGO",
      lastMessage: "Are you available this weekend?"
    }
  ];

  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "ngo",
      text: "Hello! I noticed you have web development skills.",
      time: "10:30 AM"
    },
    {
      id: 2,
      sender: "volunteer",
      text: "Yes! I would love to help.",
      time: "10:31 AM"
    }
  ]);

  const sendMessage = () => {

    if (!message) return;

    const newMessage = {
      id: Date.now(),
      sender: "volunteer",
      text: message,
      time: "Now"
    };

    setMessages([...messages, newMessage]);

    setMessage("");
  };

  return (

    <div className="flex h-[90vh] bg-gray-100">

      {/* ⭐ Sidebar */}
      <Sidebar />

      {/* ⭐ Chat Layout */}
      <div className="flex flex-1 ml-[260px]">

        <ConversationList
          conversations={conversations}
          onSelect={setSelectedUser}
        />

        <div className="flex flex-col w-2/3">

          <ChatHeader user={selectedUser} />

          <ChatWindow messages={messages} />

          <MessageInput
            message={message}
            setMessage={setMessage}
            sendMessage={sendMessage}
          />

        </div>

      </div>

    </div>
  );
};

export default Messages;