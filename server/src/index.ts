import express from "express";
import http from "http";
import { Server } from "socket.io";
import os from "os";

function getLocalIP() {
    const interfaces = os.networkInterfaces();
    for (const name of Object.keys(interfaces)) {
        for (const iface of interfaces[name]!) {
            if (iface.family === "IPv4" && !iface.internal) return iface.address;
        }
    }
    return "localhost";
}

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
server.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running at http://${getLocalIP()}:${PORT}`);
});