const socketIo = require("socket.io");

let io;

function initSocket(server) {
  io = socketIo(server);

  io.on("connection", (socket) => {
    console.log("New client connected:", socket.id);

    // Example event handling
    socket.on("newOrder", (order) => {
      console.log("New order received:", order);
      // Process the order, emit to other clients, etc.
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
    });
  });

  return io;
}

function getIO() {
  if (!io) {
    throw new Error("Socket.IO not initialized!");
  }
  return io;
}

module.exports = {
  initSocket,
  getIO,
};
