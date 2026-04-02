import React from "react";

const typeMeta = (type) => {
  switch (type) {
    case "message":
      return { label: "MSG" };
    case "application":
      return { label: "APP" };
    case "opportunity":
      return { label: "NEW" };
    default:
      return { label: "INFO" };
  }
};

const NotificationModal = ({
  isOpen,
  onClose,
  notifications,
  onDeleteNotification,
  onClearAll,
}) => {
  if (!isOpen) {
    return null;
  }

  const unread = notifications.filter((item) => !item.read).length;

  return (
    <>
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 1999,
          background: "transparent",
        }}
      />

      <section
        role="dialog"
        aria-label="Notifications"
        style={{
          position: "fixed",
          top: "86px",
          right: "20px",
          width: "360px",
          maxHeight: "520px",
          zIndex: 2000,
          border: "1px solid #1f1f1f",
          borderRadius: "18px",
          overflow: "hidden",
          background: "#f8f8f8",
          boxShadow: "0 26px 50px rgba(0,0,0,0.18)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <header
          style={{
            padding: "14px 16px",
            borderBottom: "1px solid #d7d7d7",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <h3 style={{ margin: 0, fontSize: "14px", fontWeight: 700 }}>Notifications</h3>
            <span
              style={{
                border: "1px solid #bdbdbd",
                borderRadius: "999px",
                padding: "2px 8px",
                fontSize: "11px",
                color: "#616161",
                fontWeight: 600,
              }}
            >
              {unread} unread
            </span>
          </div>

          <div style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
            {notifications.length > 0 && onClearAll && (
              <button
                type="button"
                onClick={onClearAll}
                style={{
                  border: "1px solid #1f1f1f",
                  borderRadius: "999px",
                  background: "#111",
                  color: "#fff",
                  fontSize: "11px",
                  fontWeight: 600,
                  padding: "5px 9px",
                  cursor: "pointer",
                }}
              >
                Clear
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              style={{
                width: "28px",
                height: "28px",
                border: "1px solid #d4d4d4",
                borderRadius: "8px",
                background: "#fff",
                color: "#323232",
                cursor: "pointer",
              }}
            >
              x
            </button>
          </div>
        </header>

        <div style={{ overflowY: "auto", flex: 1 }}>
          {notifications.length === 0 ? (
            <div style={{ padding: "44px 20px", textAlign: "center" }}>
              <p style={{ margin: 0, fontSize: "14px", fontWeight: 600 }}>All clear</p>
              <p style={{ margin: "6px 0 0", fontSize: "12px", color: "#777" }}>
                You have no pending notifications.
              </p>
            </div>
          ) : (
            notifications.map((notification) => {
              const meta = typeMeta(notification.type);
              return (
                <article
                  key={notification.id}
                  style={{
                    borderBottom: "1px solid #e2e2e2",
                    padding: "12px 14px",
                    display: "grid",
                    gridTemplateColumns: "auto 1fr auto",
                    gap: "10px",
                    alignItems: "start",
                    background: notification.read ? "#f8f8f8" : "#ededed",
                  }}
                >
                  <span
                    style={{
                      border: "1px solid #c8c8c8",
                      borderRadius: "8px",
                      padding: "4px 7px",
                      fontSize: "10px",
                      fontWeight: 700,
                      color: "#4f4f4f",
                      background: "#fff",
                      lineHeight: 1,
                    }}
                  >
                    {meta.label}
                  </span>

                  <div style={{ minWidth: 0 }}>
                    <p
                      style={{
                        margin: 0,
                        fontSize: "13px",
                        color: "#232323",
                        fontWeight: notification.read ? 400 : 600,
                        lineHeight: 1.4,
                      }}
                    >
                      {notification.text}
                    </p>
                    <p style={{ margin: "4px 0 0", fontSize: "11px", color: "#7b7b7b" }}>
                      {notification.time}
                    </p>
                  </div>

                  <div style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
                    {!notification.read && (
                      <span
                        style={{
                          width: "7px",
                          height: "7px",
                          borderRadius: "50%",
                          background: "#111",
                          marginTop: "4px",
                        }}
                      />
                    )}
                    {onDeleteNotification && (
                      <button
                        type="button"
                        aria-label="Delete"
                        onClick={() => onDeleteNotification(notification.id)}
                        style={{
                          border: "none",
                          background: "transparent",
                          color: "#8a8a8a",
                          fontSize: "14px",
                          cursor: "pointer",
                          padding: 0,
                        }}
                      >
                        x
                      </button>
                    )}
                  </div>
                </article>
              );
            })
          )}
        </div>
      </section>
    </>
  );
};

export default NotificationModal;
