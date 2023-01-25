import io, { Socket } from "socket.io-client";
let socket:Socket | undefined;

const initializeSocket = () => {
  socket = io("http://localhost:4002");
}

const joinRoom = (roomId:string) => {
  if (!socket) throw new Error('Socket not initialized');
  socket.emit('joinRoom', roomId);
}

export {
  initializeSocket,
  joinRoom,
}