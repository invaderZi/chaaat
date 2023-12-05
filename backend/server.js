console.log("helo");

const io = require("socket.io")(3000, {
  cors: {
    origin: ["http://localhost:9000"],
  },
});
io.on("connection", (socket) => {
  console.log("conected with id", socket.id);
  socket.on("join-room", (roomId) => {
    socket.join(roomId);
    console.log(socket.id, "joined on ", roomId);
  });

  socket.on("send-message", (messageObj, roomid) => {
    console.log("mensagem recebida", "to", roomid);
    socket.to(roomid).emit("recieved-message", messageObj);
  });
});
