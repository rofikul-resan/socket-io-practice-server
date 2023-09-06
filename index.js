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

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});

io.on("connection", (socket) => {
  console.log("A user connected");

  // Example: Handle 'message' event from the client
  socket.on("message", (data) => {
    console.log("Received message from client:", data);

    // Broadcast the message to all connected clients
    io.emit("message", data);
  });

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

app.get("/", (req, res) => {
  res.send("<h1> socket server is  running </h1>");
});

server.listen(port, () => {
  console.log(`server os run in ${port}`);
});
