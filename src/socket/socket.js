import { io } from "socket.io-client";
export const socket = io("https://react-task-backend-8y9w.onrender.com",{
      transports: ["websocket", "polling"],
    });
