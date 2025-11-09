const path = require('path');
const express = require('express');
const http = require('http');
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.join(__dirname, "../client")));

let drawingHistory = [];

io.on("connection", (socket) => {
    console.log("New user connected:", socket.id);
    socket.emit("load-history", drawingHistory);
    socket.on("draw", (data) => {
        drawingHistory.push(data);
        socket.broadcast.emit("draw", data);
    });
    socket.on("clear", () => {
        drawingHistory = [];
        io.emit("clear");
    });

    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
    });
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`server running at http://localhost:${PORT}`);
});
