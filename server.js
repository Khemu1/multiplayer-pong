// server.js
const http = require("node:http");
const api = require("./api");
const setupSocket = require("./socket");

const PORT = 3000;
const HOST = "172.21.243.88";

const server = http.createServer(api);

setupSocket(server);

server.listen(PORT, HOST, () => {
  console.log(`Server is running at http://${HOST}:${PORT}`);
});
