import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL,
    allowedHeaders: ["Content-Type", "Access-Control-Allow-Origin"],
  },
  transports: ["websocket"],
});

let onlineUsers: any[] = [];

export const getSocketId = (userId: string) => {
  return onlineUsers
    .filter((user) => user.userId === userId)
    .map((user) => user.socketId)[0];
};

io.on("connection", (socket) => {
  console.log("A user connected", socket.id);
  const userId = socket.handshake.query.userId;
  if (
    userId &&
    !onlineUsers.some((onlineUser) => onlineUser.userId === userId)
  ) {
    onlineUsers.push({
      userId: userId,
      socketId: socket.id,
    });
  }
  io.emit(
    "getOnlineUsers",
    onlineUsers.map((onlineUser) => onlineUser.userId)
  );
  socket.on("disconnect", () => {
    console.log("A user disconnected", socket.id);
    onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id);
    io.emit(
      "getOnlineUsers",
      onlineUsers.map((onlineUser) => onlineUser.userId)
    );
  });
});

export { io, app, server };
