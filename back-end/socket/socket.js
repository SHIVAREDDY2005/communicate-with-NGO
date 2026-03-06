let onlineUsers = {};

module.exports = (io) => {
  io.on("connection", (socket) => {

    socket.on("join", (userId) => {
      onlineUsers[userId] = socket.id;
    });

    socket.on("sendMessage", ({ receiverId, message }) => {
      const receiverSocket = onlineUsers[receiverId];
      if (receiverSocket) {
        io.to(receiverSocket).emit("receiveMessage", message);
      }
    });

    socket.on("disconnect", () => {
      for (let userId in onlineUsers) {
        if (onlineUsers[userId] === socket.id) {
          delete onlineUsers[userId];
        }
      }
    });
  });
};