const socket = require("socket.io");
const crypto = require("crypto");

const getSecretRoomId = (userId, targetUserId) => {
  return crypto
    .createHash("sha256")
    .update([userId, targetUserId].sort().join("$"))
    .digest("hex");
};

const initializeSocket = (server) => {
  const io = socket(server, {
    cors: {
      origin: "http://localhost:5173",
    },
  });

  io.on("connection", (socket) => {
    socket.on("joinChat", ({ firstName, userId, targetUserId }) => {
      const roomId = getSecretRoomId(userId, targetUserId);

      console.log(firstName + " Joined room : " + roomId);

      socket.join(roomId);
    });

    socket.on(
      "sendMessage",
      async ({ firstName, userId, targetUserId, text }) => {
        try {
          const roomId = getSecretRoomId(userId, targetUserId);

          console.log(firstName + " " + text);

          //logic to save message in db can be added here
          let chat = chat.findOne({
            participants: { $all: [userId, targetUserId] },
          });

          if (!chat) {
            const chat = new chat({
              participants: [userId, targetUserId],
              messages: [],
            });

            chat.messages.push({
              senderId: userId,
              text,
            });

            await chat.save();

            io.to(roomId).emit("messageReceived", { firstName, text });
          }
        } catch (err) {
          console.error("Error saving message to DB:", err);
        }
      }
    );

    socket.on("disconnect", () => {});
  });
};

module.exports = initializeSocket;
