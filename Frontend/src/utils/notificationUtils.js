export const getNotifications = () => {
  try { return JSON.parse(localStorage.getItem("notifications") || "[]"); }
  catch { return []; }
};

export const setNotifications = (list) => {
  try { localStorage.setItem("notifications", JSON.stringify(list)); } catch { }
};

export const addNotification = (text, type = "info") => {
  const list = getNotifications();
  if (list.some((n) => n.text === text && !n.read)) return;
  const n = {
    id: Date.now(),
    text,
    type,
    time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    read: false,
    createdAt: new Date().toISOString(),
  };
  setNotifications([n, ...list].slice(0, 50));
  return n;
};

export const markNotificationAsRead = (id) =>
  setNotifications(getNotifications().map((n) => (n.id === id ? { ...n, read: true } : n)));

export const deleteNotification = (id) =>
  setNotifications(getNotifications().filter((n) => n.id !== id));

export const clearAllNotifications = () => setNotifications([]);

export const getUnreadCount = () => getNotifications().filter((n) => !n.read).length;
