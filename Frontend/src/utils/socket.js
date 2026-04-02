import io from "socket.io-client";

const productionSocketUrl =
  "https://shivareddy-03-communicate-with-ngo-backend.hf.space";
const defaultSocketUrl = import.meta.env.PROD
  ? productionSocketUrl
  : "http://localhost:5000";
const socketUrl = (import.meta.env.VITE_SOCKET_URL || defaultSocketUrl).replace(/\/$/, "");

let socket = null;
let currentUserId = null;
let connectionPromise = null;

export const initSocket = (userId) => {
  const id = String(userId);

  if (socket && currentUserId === id && socket.connected) return Promise.resolve(socket);

  if (socket && currentUserId !== id) {
    socket.disconnect();
    socket = null;
    currentUserId = null;
    connectionPromise = null;
  }

  if (connectionPromise && currentUserId === id) return connectionPromise;

  connectionPromise = new Promise((resolve, reject) => {
    socket = io(socketUrl, {
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      reconnectionAttempts: 5,
    });
    currentUserId = id;

    socket.on("connect", () => {
      socket.emit("user-join", id);
      resolve(socket);
    });
    socket.on("connect_error", reject);
    setTimeout(() => { if (!socket.connected) reject(new Error("Socket timeout")); }, 10000);
  });

  return connectionPromise;
};

export const getSocket = () => socket;
export const disconnectSocket = () => {
  if (socket) { socket.disconnect(); socket = null; currentUserId = null; connectionPromise = null; }
};
export const isSocketConnected = () => !!(socket && socket.connected);
export const getCurrentSocketUserId = () => currentUserId;

export const sendMessage = (senderId, recipientId, text) => {
  if (socket?.connected) socket.emit("send-message", { senderId, recipientId, text });
};
export const markMessagesAsRead = (userId, otherUserId) => {
  if (socket) socket.emit("mark-as-read", { userId, otherUserId });
};
export const sendTyping = (senderId, recipientId) => {
  if (socket) socket.emit("user-typing", { senderId, recipientId });
};
export const sendStopTyping = (senderId, recipientId) => {
  if (socket) socket.emit("user-stop-typing", { senderId, recipientId });
};

export const onNewMessage = (cb) => { if (socket) socket.on("new-message", cb); };
export const onMessageSent = (cb) => { if (socket) socket.on("message-sent", cb); };
export const onMessageError = (cb) => { if (socket) socket.on("message-error", cb); };
export const onUnreadUpdate = (cb) => { if (socket) socket.on("unread-update", cb); };
export const onMessagesRead = (cb) => { if (socket) socket.on("messages-read", cb); };
export const onUserTyping = (cb) => { if (socket) socket.on("user-typing", cb); };
export const onUserStopTyping = (cb) => { if (socket) socket.on("user-stop-typing", cb); };

export const offNewMessage = () => { if (socket) socket.off("new-message"); };
export const offMessageSent = () => { if (socket) socket.off("message-sent"); };
export const offUnreadUpdate = () => { if (socket) socket.off("unread-update"); };
export const offMessagesRead = () => { if (socket) socket.off("messages-read"); };
export const offUserTyping = () => { if (socket) socket.off("user-typing"); };
export const offUserStopTyping = () => { if (socket) socket.off("user-stop-typing"); };
