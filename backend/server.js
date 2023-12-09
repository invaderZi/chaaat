const io = require("socket.io")(3000, {
  cors: {
    origin: ["http://localhost:9000", "http://192.168.0.9:9000"],
  },
});

const offlineMessages = {};

io.on("connection", (socket) => {
  socket.on("join-room", (roomId) => {
    socket.join(roomId);
    console.log(socket.id, "joined on ", roomId);
    if (doesRoomExist(roomId)) {
      if (hasOffilineMessages(roomId)) {
        io.in(roomId).emit("offline-send", offlineMessages[roomId]);

        console.log("offiline send to ", roomId);
      } else {
        console.log("offline not found for", roomId);
      }
    }
  });

  socket.on("error", (error) => {
    console.error("Erro no socket:", error);
  });

  socket.on("offline-clear", (roomId) => {
    clearOfflineMessages(offlineMessages, roomId);
    console.log("clear offiline for", roomId);
  });

  socket.on("send-message", (messageObj, roomid) => {
    if (doesRoomExist(roomid)) {
      console.log("mensagem recebida", "to", roomid);
      socket.to(roomid).emit("recieved-message", messageObj);
    } else {
      console.log("sala nao existe... salvando");
      addOfflineMessage(offlineMessages, roomid, messageObj);
    }
  });
});

function addOfflineMessage(obj, roomid, messageObj) {
  addObjectKeyValue(obj, roomid, messageObj);
}
function clearOfflineMessages(obj, roomid) {
  removeObjectKeyValue(obj, roomid);
}

function addObjectKeyValue(objeto, chave, valor) {
  // Verifica se a chave já existe no objeto
  if (chave in objeto) {
    // Se a chave existir, verifica se é um array
    if (objeto[chave] instanceof Array) {
      // Se for um array, adiciona o valor ao array
      objeto[chave].push(valor);
    } else {
      // Se não for um array, cria um novo array com o valor
      objeto[chave] = [].concat(objeto[chave], valor);
    }
  } else {
    // Se a chave não existir, cria a chave com um array contendo o valor
    objeto[chave] = [].concat(valor);
  }
}

function removeObjectKeyValue(object, key) {
  if (key in object) {
    try {
      delete object[key];
    } catch (error) {
      console.error("Error occurred while deleting key:", error);
    }
  }

  return false;
}

function doesRoomExist(roomId) {
  const rooms = io.sockets.adapter.rooms;
  return rooms.has(roomId);
}

function hasOffilineMessages(roomId) {
  return roomId in offlineMessages;
}
