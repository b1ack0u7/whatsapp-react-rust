import io, { Socket } from "socket.io-client";
import React from 'react';
let socket:Socket | undefined;

const initializeSocket = (setIsLoading?:React.Dispatch<React.SetStateAction<boolean>>) => {
  socket = io("http://localhost:4002");
  if (setIsLoading) setIsLoading(false);
}

const joinRoom = (roomId:string) => {
  if (!socket) throw new Error('Socket not initialized');
  socket.emit('joinRoom', roomId);
}

export {
  initializeSocket,
  joinRoom,
}