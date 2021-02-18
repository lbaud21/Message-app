//deployement
const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);

//dev
/*const io = require("socket.io")(PORT, {
  cors: { origin: "*" },
});*/

const PORT = process.env.PORT || 5000;

//deployement
app.use(express.static(__dirname + "/../build"));
//
console.log(__dirname);
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

    if (timeout) {
      clearTimeout(timeout);
    }

    newRecipients.forEach((recipient) => {
      socket.broadcast.to(recipient).emit("receive-is-typing", {
        conversationId,
        username,
      });
    });

    timeout = setTimeout(() => {
      newRecipients.forEach((recipient) => {
        socket.broadcast.to(recipient).emit("receive-is-not-typing", {
          conversationId,
          username,
        });
      });
    }, 3000);
  });
});

server.listen(PORT, () => {
  console.log("Connected to port: " + PORT);
});
