const PORT = process.env.PORT || 5000;
const io = require("socket.io")(PORT, {
  cors: { origin: "*" },
});

let timeout = undefined;

io.on("connection", (socket) => {
  const username = socket.handshake.query.username;
  socket.join(username);
  console.log(`${username} is connected`);

  socket.on("send-message", ({ conversationId, text, recipients }) => {
    const newRecipients = recipients.filter(
      (recipient) => recipient !== username
    );
    newRecipients.forEach((recipient) => {
      socket.broadcast.to(recipient).emit("receive-message", {
        conversationId,
        text,
        username,
        recipients,
      });
    });
  });

  socket.on("typing", ({ conversationId, recipients }) => {
    const newRecipients = recipients.filter(
      (recipient) => recipient !== username
    );

    let isTyping = true;

    if (timeout) {
      clearTimeout(timeout);
    }
    console.log(isTyping);

    newRecipients.forEach((recipient) => {
      socket.broadcast.to(recipient).emit("receive-is-typing", {
        conversationId,
        username,
      });
    });

    timeout = setTimeout(() => {
      isTyping = false;
      newRecipients.forEach((recipient) => {
        socket.broadcast.to(recipient).emit("receive-is-not-typing", {
          conversationId,
          username,
        });
      });
      console.log(isTyping);
    }, 3000);
  });
});
