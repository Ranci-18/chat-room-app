import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: { origin: "*" },
});

io.on("connection", (socket) => {
    console.log("a user connected:", socket.id);

    socket.on("chat message", (msg) => {
        io.emit("chat message", msg); // braodcast message to all clients
    });

    socket.on("disconnect", () => {
        console.log("user disconnected:", socket.id);
    });
});

app.get("/", (req, res) => {
    res.send("Chat server is running");
});

const PORT = 3005;
server.listen(PORT, () => {
    console.log(`server running at http://localhost:${PORT}`);
})