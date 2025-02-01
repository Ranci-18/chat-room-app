import socketio from 'socket.io';

let io;
let guestNumber = 1;
let nickNames = {};
let namesUsed = [];
let currentRoom = {};