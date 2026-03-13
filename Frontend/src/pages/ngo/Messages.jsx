import React, { useState } from "react";
import NGOSidebar from "../../layouts/NGOSidebar";   // NGO sidebar
import ConversationList from "../../components/ConversationList";
import ChatHeader from "../../components/ChatHeader";
import ChatWindow from "../../components/ChatWindow";
import MessageInput from "../../components/MessageInput";

const Messages = () => {

  const [message, setMessage] = useState("");

  const [selectedUser, setSelectedUser] = useState({
    name: "Naveen Bajjuri",
  });

  const conversations = [
    {
      id: 1,
      name: "Naveen Bajjuri",
      lastMessage: "Hello! I am interested in volunteering."
    },
    {
      id: 2,
      name: "Rahul Kumar",
      lastMessage: "I applied for the Web Development opportunity."
    }
  ];

  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "volunteer",
      text: "Hello! I am interested in volunteering for your project.",
      time: "10:10 AM"
    },
    {
      id: 2,
      sender: "ngo",
      text: "Great! Thanks for reaching out. Can you share your availability?",
      time: "10:12 AM"
    }
  ]);

  const sendMessage = () => {

    if (!message) return;

    const newMessage = {
      id: Date.now(),
      sender: "ngo", // NGO sending message
      text: message,
      time: "Now"
    };

    setMessages([...messages, newMessage]);

    setMessage("");
  };

  return (

    <div className="flex h-[90vh] bg-gray-100">

      {/* NGO Sidebar */}
      <NGOSidebar />

      {/* Chat Layout */}
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