import React from "react";

const MessageBubble = ({ message, currentUserId }) => {
  const senderId = message?.senderId || message?.sender?._id || message?.sender || "";
  const isMine = String(senderId) === String(currentUserId);
  const isPending = String(message.id || "").startsWith("tmp-");

  return (
    <div
      style={{
        display: "flex",
        justifyContent: isMine ? "flex-end" : "flex-start",
        marginBottom: "4px",
      }}
    >
      <div
        style={{
          maxWidth: "72%",
          padding: "10px 13px",
          borderRadius: isMine ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
          border: isMine ? "1px solid #111" : "1px solid #d5d5d5",
          background: isMine ? "#111" : "#fff",
          color: isMine ? "#f8f8f8" : "#191919",
          opacity: isPending ? 0.62 : 1,
        }}
      >
        <p style={{ margin: 0, fontSize: "13px", lineHeight: 1.5, wordBreak: "break-word" }}>
          {message.text}
        </p>

        <div
          style={{
            marginTop: "4px",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            gap: "5px",
          }}
        >
          <span style={{ fontSize: "10px", color: isMine ? "#c9c9c9" : "#8a8a8a" }}>
            {message.time}
          </span>
          {isMine && <span style={{ fontSize: "10px", color: "#c9c9c9" }}>{isPending ? "..." : "ok"}</span>}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
