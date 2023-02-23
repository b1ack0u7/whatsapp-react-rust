import io, { Socket } from "socket.io-client";
import React from 'react';
import { ISocket } from '../interfaces/interfaces';

const initializeSocket = (setSocket?: React.Dispatch<React.SetStateAction<Socket | undefined>>) => {
  const backurl = import.meta.env.VITE_ENDPOINT;
  const socket = io(backurl);
  if (setSocket) setSocket(socket);
}

const joinRoom = (socket: Socket, roomId: string) => {
  if (!socket) throw new Error('Socket not initialized');
  socket.emit('joinRoom', roomId);
}

const sendMessage = (socket: Socket, data: ISocket) => {
  if (!socket) throw new Error('Socket not initialized');
  socket.emit('sendMessage', data);
}

export {
  initializeSocket,
  joinRoom,
  sendMessage,
}