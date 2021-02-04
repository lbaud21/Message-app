const io = require("socket.io")(5000, {
  cors: { origin: "*" },
});

io.on("connection", (socket) => {
  const username = socket.handshake.query.username;
  socket.join(username);
  console.log(`${username} is connected`);
  socket.on("send-message", ({ conversationId, text, recipients }) => {
    recipients.forEach((recipient) => {
      console.log(`recipient: ${recipient}`);
      console.log(`text: ${JSON.stringify(text)}`);
      socket.broadcast.to(recipient).emit("receive-message", {
        conversationId,
        text,
        username,
      });
    });
  });
});
