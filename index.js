const express = require("express");
const cors = require("cors");
const http = require("http");
const port = process.env.PORT || 5000;
const app = express();
const { Server } = require("socket.io");

//middleware
app.use(cors());
app.use(express.json());
const server = http.createServer(app);
const io = new Server(server);

io.on("message", () => {
  console.log("new user");
});

app.get("/", (req, res) => {
  res.send("<h1> socket server is  running </h1>");
});

server.listen(port);
