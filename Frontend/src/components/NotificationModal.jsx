import React from "react";

const NotificationModal = ({ isOpen, onClose, notifications }) => {

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "absolute",
        top: "65px",
        right: "120px",
        width: "360px",
        background: "white",
        borderRadius: "14px",
        boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
        border: "1px solid #e5e7eb",
        zIndex: 2000
      }}
    >

      {/* Header */}
      <div
        style={{
          padding: "16px 20px",
          borderBottom: "1px solid #e5e7eb",
          fontWeight: "700",
          fontSize: "16px",
          color: "#1f2937"
        }}
      >
        Notifications
      </div>

      {/* Notification list */}
      <div
        style={{
          maxHeight: "400px",
          overflowY: "auto"
        }}
      >
        {notifications.map((n) => (
          <div
            key={n.id}
            style={{
              padding: "14px 20px",
              borderBottom: "1px solid #f3f4f6",
              display: "flex",
              gap: "10px"
            }}
          >
            <div
              style={{
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                background: n.read ? "#9ca3af" : "#2563eb",
                marginTop: "6px"
              }}
            />

            <div>
              <div
                style={{
                  fontSize: "14px",
                  color: "#374151",
                  fontWeight: "500"
                }}
              >
                {n.text}
              </div>

              <div
                style={{
                  fontSize: "12px",
                  color: "#9ca3af",
                  marginTop: "2px"
                }}
              >
                {n.time}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div
        style={{
          padding: "12px",
          textAlign: "center"
        }}
      >
        <button
          onClick={onClose}
          style={{
            padding: "8px 18px",
            borderRadius: "20px",
            border: "none",
            background: "#2563eb",
            color: "white",
            cursor: "pointer",
            fontSize: "13px"
          }}
        >
          Close
        </button>
      </div>

    </div>
  );
};

export default NotificationModal;