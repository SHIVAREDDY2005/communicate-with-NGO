import React, { useEffect, useRef } from "react";
import MessageBubble from "./MessageBubble";

const formatDateLabel = (dateInput) => {
  if (!dateInput) {
    return null;
  }

  const date = new Date(dateInput);
  if (Number.isNaN(date.getTime())) {
    return null;
  }

  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  if (date.toDateString() === today.toDateString()) {
    return "Today";
  }
  if (date.toDateString() === yesterday.toDateString()) {
    return "Yesterday";
  }

  return date.toLocaleDateString([], { weekday: "short", month: "short", day: "numeric" });
};

const ChatWindow = ({ messages, currentUserId }) => {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const renderMessages = () => {
    const rows = [];
    let lastLabel = null;

    messages.forEach((message, idx) => {
      let currentLabel = null;
      const parsedTime = new Date(message.time);
      if (!Number.isNaN(parsedTime.getTime())) {
        currentLabel = formatDateLabel(parsedTime);
      }

      if (currentLabel && currentLabel !== lastLabel) {
        lastLabel = currentLabel;
        rows.push(
          <div
            key={`date-${idx}`}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              margin: "14px 0 8px",
            }}
          >
            <div style={{ flex: 1, height: "1px", background: "#d6d6d6" }} />
            <span
              style={{
                fontSize: "10px",
                color: "#777",
                border: "1px solid #d1d1d1",
                borderRadius: "999px",
                padding: "2px 9px",
                background: "#f4f4f4",
                fontWeight: 600,
              }}
            >
              {currentLabel}
            </span>
            <div style={{ flex: 1, height: "1px", background: "#d6d6d6" }} />
          </div>
        );
      }

      rows.push(
        <MessageBubble
          key={message.id || `${message.senderId}-${idx}`}
          message={message}
          currentUserId={currentUserId}
        />
      );
    });

    return rows;
  };

  return (
    <section
      style={{
        flex: 1,
        overflowY: "auto",
        padding: "20px 22px",
        background:
          "radial-gradient(circle at 15% 5%, rgba(0,0,0,0.03) 0, rgba(0,0,0,0.03) 1px, transparent 1px) 0 0 / 4px 4px, #ededed",
      }}
    >
      {messages.length === 0 ? (
        <div
          style={{
            minHeight: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            padding: "30px",
          }}
        >
          <div
            style={{
              width: "58px",
              height: "58px",
              borderRadius: "16px",
              border: "1px solid #cfcfcf",
              background: "#f7f7f7",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "12px",
              color: "#666",
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
            </svg>
          </div>
          <p style={{ margin: 0, fontSize: "15px", fontWeight: 700 }}>No messages yet</p>
          <p style={{ margin: "6px 0 0", fontSize: "12px", color: "#7a7a7a" }}>
            Send the first message to start this chat.
          </p>
        </div>
      ) : (
        renderMessages()
      )}
      <div ref={bottomRef} />
    </section>
  );
};

export default ChatWindow;
