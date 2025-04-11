const { Server } = require("socket.io");

let players = 0;
let room = "room" + Math.floor(players / 2); // adding romes to group players

function setupSocket(server) {
  const io = new Server(server, {
    path: "/socket.io",
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  const pongNamespace = io.of("/pong"); // namespace

  pongNamespace.on("connection", (socket) => {
    console.log("A user connected to /pong:", socket.id);

    socket.on("ready", () => {
      socket.join(room);
      console.log("Player is ready:", socket.id);
      players++;

      if (players % 2 === 0) {
        console.log("All users are ready");
        pongNamespace.in(room).emit("startGame", socket.id);
      }
    });

    socket.on("paddleMove", (data) => {
      socket.to(room).emit("paddleMove", data);
    });

    socket.on("ballMove", (data) => {
      socket.to(room).in("room").emit("ballMove", data);
    });

    socket.on("disconnect", () => {
      console.log("A user disconnected from /pong:", socket.id);
      socket.leave(room);
      players--;
    });
  });
}

module.exports = setupSocket;
