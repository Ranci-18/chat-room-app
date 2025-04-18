import { io } from "socket.io-client";

const socket = io("http://192.168.119.182:3005");

export default socket;